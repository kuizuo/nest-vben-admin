import { Global, Module } from '@nestjs/common';

import { EntityExistConstraint } from './entity-exist.constraint';
import { UniqueConstraint } from './unique.constraint';

const providers = [EntityExistConstraint, UniqueConstraint];

@Global()
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class ConstraintModule {}
