import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), 
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: 3600 },
        })
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
