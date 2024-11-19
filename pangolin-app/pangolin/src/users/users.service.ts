import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private repo: Repository<Users>){};

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
}
