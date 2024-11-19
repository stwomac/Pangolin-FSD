import { Injectable } from '@nestjs/common';

@Injectable()
export class ContextService {
    constructor(@InjectRepository(Context) private repo: Repository<Context>){};

    async getAllContext(): Promise<Context[]> {
        return await this.repo.find({
            //commenting this out until we have some reports in the database, it leads to errors.
            // relations: {
            //     reports: true
            // }
        });
    };

    async getContextById(idToFind: number): Promise<Context>{
        return await this.repo.findOneOrFail({
            where: {
                context_id: idToFind
            }
            // relations: {
            //     reports: true
            // }
        }).catch(()=>{
            throw new HttpException(`Context with Id ${idToFind} does not exist`, HttpStatus.NOT_FOUND)
        })

    }
    
    async createContext(newContext: Context): Promise<Context> {
        await this.repo.exists({
            where:{
                context_id: newContext.context_id
            }
        }).then(exists=>{
            if(exists){
                throw new HttpException(`Context with ID ${newContext.context_id} already exists!`, HttpStatus.BAD_REQUEST)
            }
        })

        return await this.repo.save(newContext);
    }

    async updateContext(routeId: number, contextToUpdate: Context) {
        if (routeId != contextToUpdate.context_id){
            throw new HttpException(`Route ID and Body ID do not match`, HttpStatus.BAD_REQUEST)
        }

        await this.repo.exists({
            where:{
                context_id: contextToUpdate.context_id
            }
        }).then(exists=>{
            if (!exists){
                throw new HttpException(`Context with ID ${contextToUpdate.context_id} does not exists!`, HttpStatus.NOT_FOUND)
            }
        })

        return await this.repo.save(contextToUpdate);
    }

    async deleteContext(id: number): Promise<DeleteResult>{
        return await this.repo.delete(id);
    }
}
