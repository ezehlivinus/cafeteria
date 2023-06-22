import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function PaginationQueryParams(): MethodDecorator {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      description: 'the current page to fetch data for',
      required: false
    }),
    ApiQuery({
      name: 'limit',
      description: 'the count of data to fetch (defaults to 10)',
      required: false
    }),
    ApiQuery({
      name: 'search',
      description: 'the search query',
      required: false
    })
  );
}
