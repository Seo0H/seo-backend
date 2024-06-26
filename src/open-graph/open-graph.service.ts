import { Injectable } from '@nestjs/common';

import ogs from 'open-graph-scraper';
import { OpenGraphDto } from 'src/open-graph/dto/OpenGraph.dto';

@Injectable()
export class OpenGraphService {
  async getOG({ url }: OpenGraphDto) {
    if (url.includes('notion')) {
      return await ogs({
        url,
        fetchOptions: { headers: { 'user-agent': 'bot' } },
      });
    } else {
      return await ogs({
        url,
      });
    }
  }
}
