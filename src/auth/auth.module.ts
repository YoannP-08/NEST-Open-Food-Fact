import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule, 
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: 3600 },
        }),
    ], 
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
