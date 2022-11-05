import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResOp } from '@/common/class/res.class';

const baseTypeNames = ['String', 'Number', 'Boolean'];

/**
 * @description: 生成返回结果装饰器
 */
export const ApiResult = <TModel extends Type<any>>({
  type,
  isPage,
}: {
  type?: TModel | TModel[];
  isPage?: boolean;
}) => {
  let prop = null;
  if (Array.isArray(type)) {
    if (isPage) {
      prop = {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: { $ref: getSchemaPath(type[0]) },
          },
          total: {
            type: 'number',
            default: 0,
          },
        },
      };
    } else {
      prop = {
        type: 'array',
        items: { $ref: getSchemaPath(type[0]) },
      };
    }
  } else if (type) {
    if (type && baseTypeNames.includes(type.name)) {
      prop = { type: type.name.toLocaleLowerCase() };
    } else {
      prop = { $ref: getSchemaPath(type) };
    }
  } else {
    prop = { type: 'null', default: null };
  }

  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResOp) },
          {
            properties: {
              data: prop,
            },
          },
        ],
      },
    }),
  );
};
