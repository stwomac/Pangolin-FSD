import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult } from 'typeorm'
import { Context } from './context'

@Injectable()
export class ContextService {
  constructor(@InjectRepository(Context) private repo: Repository<Context>) {}

  async getAllContext(): Promise<Context[]> {
    return await this.repo.find({
      relations: {
        contextType: true,
        report: true,
      },
    })
  }

  async getContextById(idToFind: number): Promise<Context> {
    return await this.repo
      .findOneOrFail({
        where: {
          contextId: idToFind,
        },
        relations: {
          contextType: true,
          report: true,
        },
      })
      .catch(() => {
        throw new HttpException(
          `Context with Id ${idToFind} does not exist`,
          HttpStatus.NOT_FOUND,
        )
      })
  }

  async createContext(newContext: Context): Promise<Context> {
    return await this.repo.save(newContext)
  }

  async updateContext(routeId: number, contextToUpdate: Context) {
    if (routeId != contextToUpdate.contextId) {
      throw new HttpException(
        `Route ID and Body ID do not match`,
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.repo
      .exists({
        where: {
          contextId: contextToUpdate.contextId,
        },
      })
      .then((exists) => {
        if (!exists) {
          throw new HttpException(
            `Context with ID ${contextToUpdate.contextId} does not exists!`,
            HttpStatus.NOT_FOUND,
          )
        }
      })

    return await this.repo.save(contextToUpdate)
  }

  async deleteContext(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }
}
