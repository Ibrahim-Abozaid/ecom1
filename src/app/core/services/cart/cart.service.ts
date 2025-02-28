import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId: id,
    });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }

  updateProdutQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: newCount,
      }
    );
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`
    );
  }
}
