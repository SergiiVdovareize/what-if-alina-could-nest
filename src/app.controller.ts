import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getDocs(@Res() res) {
    res.sendFile('docs/index.html', { root: '.'});
  }
}
