import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Annotation } from './annotation'
import { Repository } from 'typeorm'
import { Report } from '../report/report'
import { CreateAnnotationDto } from './dto/create-annotation.dto'
import { UpdateAnnotationDto } from './dto/update-annotation.dto'

@Injectable()
export class AnnotationService {
  constructor(
    @InjectRepository(Annotation) private repo: Repository<Annotation>,
  ) {}

  async get(annotationId: number) {
    const annotation = await this.repo.findOne({
      where: {},
    })
    if (annotation == null)
      throw new HttpException(
        `No annotation with id ${annotationId} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return annotation
  }

  async getAllForReport(report: Report): Promise<Annotation[]> {
    return await this.repo.find({
      where: { report: report },
    })
  }

  //create a new annotation
  async createAnnotation(annotation: CreateAnnotationDto): Promise<Annotation> {
    const newAnnotation = this.repo.create(annotation)
    return await this.repo.save(newAnnotation)
  }

  async update(annotationId: number, updateData: UpdateAnnotationDto) {
    const annotation = await this.get(annotationId)
    const updatedAnnotation = this.repo.merge(annotation, updateData)
    return await this.repo.save(updatedAnnotation)
  }

  async delete(annotation: Annotation): Promise<Annotation> {
    return await this.repo.remove(annotation)
  }
}
