import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishService } from '../../core/services/wish/wish.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, SearchPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishService = inject(WishService);
  addedToWish: boolean = false;
  searchedInput: string = '';

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rtl: true,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

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

  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;

        // console.log(this.categories);
      },
      // error: (err) => {
      //   console.log(err);
      // },
    });
  }

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
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
