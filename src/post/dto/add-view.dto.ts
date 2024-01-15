import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateViewDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
