import { Component, inject, NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { WishService } from '../../core/services/wish/wish.service';

@Component({
  selector: 'app-products',
  imports: [FormsModule, RouterLink, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishService = inject(WishService);
  searchedInput: string = '';
  addedToWish: boolean = false;

  products: Iproduct[] = [];
  categories: ICategory[] = [];

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        // console.log(this.products);
      },
      // error: (err) => {
      //   console.log(err);
      // },
    });
  }

  // getCategoriesData(): void {
  //   this.categoriesService.getAllCategories().subscribe({
  //     next: (res) => {
  //       this.categories = res.data;

  //       // console.log(this.categories);
  //     },
  //     // error: (err) => {
  //     //   console.log(err);
  //     // },
  //   });
  // }

  ngOnInit(): void {
    this.getProductsData();
    // this.getCategoriesData();
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      // error: (err) => {
      //   console.log(err);
      // },
    });
  }

  addToWish(id: string) {
    this.wishService.addProductToWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.addedToWish = true;
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
    });
  }
}
