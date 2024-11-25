import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult } from 'typeorm'
import { Context } from './context'

@Injectable()
export class ContextService {
  constructor(@InjectRepository(Context) private repo: Repository<Context>) {}

  async get(contextId: number) {
    const user = await this.repo.findOne({
      where: { contextId },
      relations: { contextType: true, report: true },
    })
    if (user == null)
      throw new HttpException(
        `No user with id ${contextId} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return user
  }

  async getAll(): Promise<Context[]> {
    return await this.repo.find({
      relations: { contextType: true },
    })
  }

  async create(context: Context): Promise<Context> {
    const newUser = this.repo.create(context)
    return await this.repo.save(newUser)
  }

  async update(context: Context, updateData: Context) {
    const updatedUser = this.repo.merge(context, updateData)
    return await this.repo.save(updatedUser)
  }

  async delete(context: Context): Promise<Context> {
    return await this.repo.remove(context)
  }
}
