import { InjectRepository } from '@nestjs/typeorm'
import { ContextType } from './context_type'
import { Repository } from 'typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class ContextTypeService {
  constructor(
    @InjectRepository(ContextType) private repo: Repository<ContextType>,
  ) {}

  //get all context type
  async getAllContextTypes(): Promise<ContextType[]> {
    return await this.repo.find({
      relations: {
        contexts: true, // Include the related contexts
      },
    })
  }

  // get by ID
  async getContextTypeById(idToFind: number): Promise<ContextType> {
    return await this.repo
      .findOneOrFail({
        where: {
          contextTypeId: idToFind,
        },
        relations: {
          contexts: true, // Include the related contexts
        },
      })
      .catch(() => {
        throw new HttpException(
          `ContextType with context_type_id ${idToFind} does not exist!`,
          HttpStatus.NOT_FOUND,
        )
      })
  }
}
