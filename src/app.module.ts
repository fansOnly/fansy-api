import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { DemoModule } from './modules/demo/demo.module';
import BackendModules from './modules/backend'
import FrontendModules from './modules/frontend'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // not use in production!!!
      timezone: '+08:00',
      // logging: ["query", "error"],
    }),
    // 流量控制
    ThrottlerModule.forRoot([{
      ttl: 60000, // ms
      limit: 500,
    }]),
    DemoModule,
    ...BackendModules,
    ...FrontendModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
