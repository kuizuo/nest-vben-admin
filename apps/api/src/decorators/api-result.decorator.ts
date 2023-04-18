import { ResOp } from '@/common/model/response.model';
import { Type, applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

const baseTypeNames = ['String', 'Number', 'Boolean'];

/**
 * @description: 生成返回结果装饰器
 */
export const ApiResult = <TModel extends Type<any>>({
  type,
  isPage,
  status,
}: {
  type?: TModel | TModel[];
  isPage?: boolean;
  status?: HttpStatus;
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
          meta: {
            type: 'object',
            properties: {
              itemCount: { type: 'number', default: 0 },
              totalItems: { type: 'number', default: 0 },
              itemsPerPage: { type: 'number', default: 0 },
              totalPages: { type: 'number', default: 0 },
              currentPage: { type: 'number', default: 0 },
            },
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

  const model = Array.isArray(type) ? type[0] : type;

  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status,
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
