import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Method } from './method';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MethodService {
    constructor(@InjectRepository(Method) private repo: Repository<Method>) {}

    //get all context type
    async getAllMethods(): Promise<Method[]> {
        return await this.repo.find({
            relations: {
                reports: true, // Include related reports
            },
        });
    }
    

     // get by ID
     async getMethodById(idToFind: number): Promise<Method> {
        return await this.repo.findOneOrFail({
            where: {
                method_id: idToFind
            },
            relations: {
                reports: true, // Include related reports
            }
        }).catch(() => {
            throw new HttpException(`Method with context_type_id ${idToFind} does not exist!`, HttpStatus.NOT_FOUND)
        })
    }

}
