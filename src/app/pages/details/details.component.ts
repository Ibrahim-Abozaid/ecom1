import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  productId: any;
  // productDetails: Iproduct = {} as Iproduct;
  productDetails: Iproduct | null = null;
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private _CartService = inject(CartService);
  private _ToastrService = inject(ToastrService);
  cartService: any;
  toastrService: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');

        this.productsService.getSpecificProduct(this.productId).subscribe({
          next: (res) => {
            this.productDetails = res.data;
            console.log(res.data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this._ToastrService.success(res.message, 'FreshCart');
        }
      },
    });
  }
}
