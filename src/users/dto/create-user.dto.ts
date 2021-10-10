import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    readonly isAdmin?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    readonly firstname?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    readonly lastname?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @MinLength(3, {
        message: 'Username is too short. It must be at least 3 characters.',
    })
    readonly username?: string;
}