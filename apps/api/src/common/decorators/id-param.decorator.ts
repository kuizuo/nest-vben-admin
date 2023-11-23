import { Param, ParseIntPipe } from '@nestjs/common'

export function IdParam() {
  return Param('id', new ParseIntPipe())
}
