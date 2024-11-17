import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users';
import { Repository } from 'typeorm';

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
    




}
