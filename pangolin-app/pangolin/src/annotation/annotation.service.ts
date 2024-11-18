import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Annotation } from './annotation';
import { Repository } from 'typeorm';

@Injectable()
export class AnnotationService {
    constructor(@InjectRepository(Annotation) private repo: Repository<Annotation>){}

}
