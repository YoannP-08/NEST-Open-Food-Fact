import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {
    constructor(private readonly httpService: HttpService) {}

    /**
     * Fetch a product data searching by its barcode on Open-food-facts API.
     * Note: https://fr.openfoodfacts.org/data
     *       https://openfoodfacts.github.io/api-documentation/#jump-1GeneralInformation-Getallfoodproducts
     * 
     * @param {Product} search include barCode (mandatory) and fields (optional, e.g: product_name)
     * @returns {Observable<AxiosResponse<any>>} a product data if barCode match OFF API
     */
    getProductByBarCode(search: Product): Observable<AxiosResponse<any>> {
        const { barCode: barCodeToSearch, fields } = search

        // Enable optional parameters
        let searchOptions = ''
        if (fields) {
            searchOptions = '&fields=' + fields.join()
        }

        return this.httpService.get(
            `http://world.openfoodfacts.org/api/v2/search?code=${barCodeToSearch}${searchOptions}`
            ).pipe(map(response => response.data));
    }
}
