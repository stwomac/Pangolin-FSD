import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './type';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {
constructor(@InjectRepository(Type) private repo: Repository<Type>) {}

//get all
async getAllTypes(): Promise<Type[]> {
    return await this.repo.find({
        relations: {
            reports: true,       // Include the related Reports
            contextTypes: true,  // Include the related ContextTypes
        },
    });
}

//get by ID
async getTypeById(idToFind: number): Promise<Type> {
    return await this.repo.findOneOrFail({
        where: {
            type_id: idToFind
        },
        relations: {
            reports: true,
            contextTypes: true
        }
    }).catch(() => {
        throw new HttpException(`Type with type_id ${idToFind} does not exist!`, HttpStatus.NOT_FOUND)
    })
}
}
