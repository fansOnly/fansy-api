import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    })
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
