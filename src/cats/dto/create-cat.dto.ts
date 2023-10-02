import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

/** En esta clase lo que hacemos es darle decoradores a las variables con tipado de cada variable, para controlar los valores que 
 * serán seteados por el usuario
 */
export class CreateCatDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsOptional()
  breed: string;
}
