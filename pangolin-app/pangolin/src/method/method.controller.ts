import { Controller } from '@nestjs/common';
import { MethodService } from './method.service';

@Controller('method')
export class MethodController {
  constructor(private readonly methodService: MethodService) {}
}
