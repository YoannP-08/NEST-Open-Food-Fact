import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ProductsService } from './products.service';
import { SearchProductDto } from './dto/search-products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @ApiOperation({ summary: 'Search a product by its bar code on Open Food Fact API' })
    @ApiCreatedResponse({ description: 'Retrieved product data if bar code is valid. If not, return an empty products []' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedException})
    @ApiBearerAuth('Token')
    @UseGuards(JwtAuthGuard)
    @Post('search')
    async searchByBarCode(@Body() search: SearchProductDto): Promise<{}> {
        return await this.productsService.getProductByBarCode(search);
    }
}
