import { Global, Module } from '@nestjs/common';
import { EntityExistConstraint } from './entity-exist.constraint';

const providers = [EntityExistConstraint];

@Global()
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class ConstraintModule {}
