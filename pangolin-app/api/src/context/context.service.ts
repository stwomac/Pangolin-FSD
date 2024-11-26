import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult } from 'typeorm'
import { Context } from './context'

@Injectable()
export class ContextService {
  constructor(@InjectRepository(Context) private repo: Repository<Context>) {}

  async get(contextId: number) {
    const context = await this.repo.findOne({
      where: { contextId },
      relations: { contextType: true, report: true },
    })
    if (context == null)
      throw new HttpException(
        `No context with id ${contextId} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return context
  }

  async getAll(): Promise<Context[]> {
    return await this.repo.find({
      relations: { contextType: true },
    })
  }

  async create(newContext: Context): Promise<Context> {
    const context = this.repo.create(newContext)
    return await this.repo.save(context)
  }

  async update(context: Context, updateData: Context) {
    const updatedContext = this.repo.merge(context, updateData)
    return await this.repo.save(updatedContext)
  }

  async delete(context: Context): Promise<Context> {
    return await this.repo.remove(context)
  }
}
