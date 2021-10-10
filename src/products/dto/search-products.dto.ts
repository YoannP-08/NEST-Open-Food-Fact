import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SearchProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly barCode: string;

    @ApiProperty({ required: false})
    @IsString({ each: true})
    @IsNotEmpty()
    @IsOptional()
    readonly fields: string[];
}