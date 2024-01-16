import { ApiProperty } from '@nestjs/swagger';

export class OpenGraphDto {
  @ApiProperty({ description: 'open api 정보를 얻고자 하는 url' })
  readonly url: string;
}
