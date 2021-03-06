import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    email: string;
    
    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isAdmin: boolean;

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);