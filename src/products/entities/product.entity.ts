import { ApiProperty } from "@nestjs/swagger";

export class Product {
    @ApiProperty()
    barCode: string;

    @ApiProperty()
    fields: string[];
}