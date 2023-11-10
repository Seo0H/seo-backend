import { Module } from '@nestjs/common';
import { OpenGraphController } from 'src/open-graph/open-graph.controller';
import { OpenGraphService } from 'src/open-graph/open-graph.service';

@Module({
  imports: [],
  controllers: [OpenGraphController],
  providers: [OpenGraphService],
})
export class OpenGraphModule {}
