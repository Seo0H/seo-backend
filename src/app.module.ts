import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { OpenGraphModule } from 'src/open-graph/open-graph.module';

@Module({
  imports: [OpenGraphModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
