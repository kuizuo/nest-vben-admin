import { ApiProperty } from '@nestjs/swagger';

// interface IPageMetaDtoParameters {
//   pageOptionsDto: PageOptionsDto;
//   itemCount: number;
// }

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly totalItems?: number;

  @ApiProperty()
  readonly itemsPerPage: number;

  @ApiProperty()
  readonly totalPages?: number;

  @ApiProperty()
  readonly currentPage: number;

  // constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters) {
  //   this.page = pageOptionsDto.page;
  //   this.pageSize = pageOptionsDto.take;
  //   this.itemCount = itemCount;
  //   this.totalItems = itemCount;
  // }
}
