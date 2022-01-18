import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
var path = require("path")

import { NestExpressApplication } from '@nestjs/platform-express';
// api文档插件
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

 // 处理跨域
 app.enableCors();

 // 静态文件托管
//  app.useStaticAssets('uploads', { prefix: '/uploads' });
 // 使用serve-static
    // '/public' 是路由名称，即你访问的路径为：host/public
    // serveStatic 为 serve-static 导入的中间件，其中'../public' 为本项目相对于src目录的绝对地址
    app.use('/public', serveStatic(path.join(__dirname, '../public'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif'],
     }));
     //....
     await app.startAllMicroservicesAsync();
// DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
  const options = new DocumentBuilder()
    .setTitle('api')
    .setDescription('使用nest书写的常用性接口') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .addTag('用户,安全') // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
    // .setBasePath('http://localhost:5000')
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options);
   // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/api', app, document);
   await app.listen(818);
}
bootstrap();
