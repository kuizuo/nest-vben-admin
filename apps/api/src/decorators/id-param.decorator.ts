import { Param, ParseIntPipe } from '@nestjs/common';

export const IdParam = () => {
  return Param('id', new ParseIntPipe());
};
