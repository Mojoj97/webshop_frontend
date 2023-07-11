import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

    getProductList(): Observable<Product[]> {//returns an observable --> map the JSON data from Spring Data REST to Product array

      return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
        map(response => response._embedded.products)
      );
    }
}

interface GetResponse{ //support interface --> unwraps the JSO from Spring Data REST _embedded entry
  _embedded: {
    products: Product[];
  }
}
