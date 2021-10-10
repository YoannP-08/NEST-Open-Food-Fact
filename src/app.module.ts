import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { AppController } from 'src/app.controller';
import { ProductsController } from 'src/products/products.controller';

import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

import { AppService } from 'src/app.service';
import { ProductsService } from 'src/products/products.service';


@Module({
  imports: [AuthModule, UsersModule, HttpModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
