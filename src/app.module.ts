import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { OpenGraphModule } from 'src/open-graph/open-graph.module';

@Module({
  imports: [
    OpenGraphModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
