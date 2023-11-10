import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10)
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      throw new BadRequestException('id validation failed')
    }
    return val
  }
}
