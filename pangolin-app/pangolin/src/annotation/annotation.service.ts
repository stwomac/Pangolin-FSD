import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Annotation } from './annotation';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AnnotationService {
    constructor(@InjectRepository(Annotation) private repo: Repository<Annotation>){}

    async getAllAnnotationsByReportId(reportId: number): Promise<Annotation[]> {
        return await this.repo.find({
            where: { report: { report_id: reportId } },
            relations: ['report']
        });
    }

    //create a new annotation
    async createAnnotation(newAnnotation: Annotation): Promise<Annotation> {
        await this.repo.exists({
            where: {
                annotation_id: newAnnotation.annotation_id
            }
        }).then(exists => {
            if(exists)
                throw new HttpException(`Report with ID ${newAnnotation.annotation_id} already exists!`, HttpStatus.BAD_REQUEST)
        })

        return await this.repo.save(newAnnotation)
    }

    // update one
    async updateAnnotation(routeId: number, annotationToUpdate: Annotation) {
        // checking if the route ID and the one in the body match
        if (routeId != annotationToUpdate.annotation_id) {
            throw new HttpException(`Route ID and Body ID do not match!`, HttpStatus.BAD_REQUEST);
        }

        // checking that the Report we want to update exists in the database already
        // if it doesn't we'd create a new one, which we don't want
        await this.repo.exists({
            where: {
                annotation_id: annotationToUpdate.annotation_id
            }
        }).then(exists => {
            if (!exists)
                throw new HttpException(`Annotation with ID ${annotationToUpdate.annotation_id} does not exist!`, HttpStatus.NOT_FOUND);
        })

        return await this.repo.save(annotationToUpdate);
    }

    async deleteAnnotation(annotation_id: number): Promise<DeleteResult> {
        return await this.repo.delete(annotation_id);
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
