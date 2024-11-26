import { InjectRepository } from '@nestjs/typeorm'
import { ContextType } from './context_type'
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
}
