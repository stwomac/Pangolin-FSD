import { InjectRepository } from '@nestjs/typeorm'
import { ContextType } from './context-type'
import { Repository } from 'typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class ContextTypeService {
  constructor(
    @InjectRepository(ContextType) private repo: Repository<ContextType>,
  ) {}

  async getAll(): Promise<ContextType[]> {
    return await this.repo.find()
  }

  async get(contextTypeId: number): Promise<ContextType> {
    const contextType = await this.repo.findOne({ where: { contextTypeId } })
    if (contextType == null)
      throw new HttpException(
        `No context type with id ${contextTypeId} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return contextType
  }
}
