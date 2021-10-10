import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    firstname?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    lastname?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @MinLength(3, {
        message: 'Username is too short. It must be at least 3 characters.',
    })
    username?: string;
}