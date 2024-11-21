import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users';
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private repo: Repository<Users>, private jwtService: JwtService){};

    async getAllUsers(): Promise<Users[]> {
        return await this.repo.find({
            //commenting this out until we have some reports in the database, it leads to errors.
            // relations: {
            //     reports: true
            // }
        });
    };

    async getUserById(idToFind: number): Promise<Users>{
        return await this.repo.findOneOrFail({
            where: {
                user_id: idToFind
            }
            // relations: {
            //     reports: true
            // }
        }).catch(()=>{
            throw new HttpException(`User with Id ${idToFind} does not exist`, HttpStatus.NOT_FOUND)
        })

    }

    async getUserByEmail(email: string): Promise<Users>{
        return await this.repo.findOneOrFail({
            where: {
                email: email
            }
        }).catch(()=>{
            throw new EntityNotFoundError(Users,'did not find user');
        })

    }
    
    async createUser(newUser: Users): Promise<Users> {
        await this.repo.exists({
            where:{
                user_id: newUser.user_id
            }
        }).then(exists=>{
            if(exists){
                throw new HttpException(`User with ID ${newUser.user_id} already exists!`, HttpStatus.BAD_REQUEST)
            }
        })

        return await this.repo.save(newUser);
    }

    async updateUser(routeId: number, userToUpdate: Users) {
        if (routeId != userToUpdate.user_id){
            throw new HttpException(`Route ID and Body ID do not match`, HttpStatus.BAD_REQUEST)
        }

        await this.repo.exists({
            where:{
                user_id: userToUpdate.user_id
            }
        }).then(exists=>{
            if (!exists){
                throw new HttpException(`User with ID ${userToUpdate.user_id} does not exists!`, HttpStatus.NOT_FOUND)
            }
        })

        return await this.repo.save(userToUpdate);
    }

    async deleteUser(id: number): Promise<DeleteResult>{
        return await this.repo.delete(id);
    }

    async validateUser(userToLogin: Users): Promise<{ access_token: string }> {
        
        try {
          const user = await this.repo.findOneOrFail({
            where: { user_id: userToLogin.user_id },
          });
          if (userToLogin.pass_hash === user.pass_hash) {
            const payload = { sub: user.user_id, email: user.email };
            const token = await this.jwtService.signAsync(payload); // JWT generation
            return { access_token: token }; // Explicitly return the token
          }
        } catch (error) {
          throw new HttpException(`Invalid!`, HttpStatus.BAD_REQUEST);
        }
    }
      
      
}
