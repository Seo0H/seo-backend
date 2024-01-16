import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IncrementViewDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '유저가 조회한 post의 uuid' })
  readonly postId: string;
}
