import { IsOptional, IsString } from 'class-validator';

export class ParamsDto {
  @IsOptional()
  @IsString()
  query: string;

  @IsOptional()
  sortBy: string;

  @IsOptional()
  sizes: string;

  @IsOptional()
  pizzaTypes: string;

  @IsOptional()
  ingredients: string;

  @IsOptional()
  priceFrom: string;

  @IsOptional()
  priceTo: string;
}
