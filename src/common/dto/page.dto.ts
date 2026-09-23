import { Type } from 'class-transformer';
import { IsInt, ValidateIf, Max, Min } from 'class-validator';
export class PageDto {
  @ValidateIf((_object, value) => value !== undefined)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;
  @ValidateIf((_object, value) => value !== undefined)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;
}
export function pagination(query: PageDto) {
  return { skip: (query.page - 1) * query.limit, take: query.limit };
}
