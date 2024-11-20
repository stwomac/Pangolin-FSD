import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Annotation } from './annotation';
import { Repository } from 'typeorm';

@Injectable()
export class AnnotationService {
    constructor(@InjectRepository(Annotation) private repo: Repository<Annotation>){}

    async getAllAnnotationsByReportId(reportId: number): Promise<Annotation[]> {
        return await this.repo.find({
            where: { report: { id: reportId } },
            relations: ['report']
        });
    }

    async createAnnotation(content: string, reportId: number): Promise<Annotation> {
        const annotation = this.repo.create({ content, report: { id: reportId } });
        return await this.repo.save(annotation);
    }

    async updateAnnotation(id: number, content: string): Promise<Annotation> {
        await this.repo.update(id, { content });
        return await this.repo.findOne(id);
    }

    async deleteAnnotation(id: number): Promise<void> {
        await this.repo.delete(id);
    }
    
    // //get All annotations for a certain report
    // async getAllAnnotationsByReportId(idToFind: number): Promise<Annotation[]>{
    //     return await this.repo.find({
    //         relations: {
    //             reports
    //         }
    //     })
    // }
}
