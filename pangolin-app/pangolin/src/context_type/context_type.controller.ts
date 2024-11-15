import { Controller } from '@nestjs/common';
import { ContextTypeService } from './context_type.service';

@Controller('context-type')
export class ContextTypeController {
  constructor(private readonly contextTypeService: ContextTypeService) {}
}
