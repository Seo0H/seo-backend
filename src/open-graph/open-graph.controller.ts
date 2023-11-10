import { Body, Controller, Post } from '@nestjs/common';
import { OpenGraphDto } from 'src/open-graph/dto/OpenGraph.dto';
import { OpenGraphService } from 'src/open-graph/open-graph.service';

@Controller('open-graph')
export class OpenGraphController {
  constructor(private readonly openGraphService: OpenGraphService) {}

  @Post()
  async getOG(@Body() urlObject: OpenGraphDto) {
    return await this.openGraphService.getOG(urlObject);
  }
}
