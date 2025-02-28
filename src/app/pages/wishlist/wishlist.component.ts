import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishService } from '../../core/services/wish/wish.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

interface Daum {
  sold: number;
  images: string[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  priceAfterDiscount?: number;
}

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  constructor(
    private wishService: WishService,
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  wishData: Daum[] = [];

  showWishList() {
    this.wishService.getWishList().subscribe({
      next: (res) => {
        console.log(res);

        this.wishData = res?.data ?? [];
      },
    });
  }

  addProductToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        let message = 'Product added successfully!';
        console.log(res);

        if (res && typeof res === 'object' && 'message' in res) {
          message = res.message;
        }

        this.toastrService.success(message, 'Success', {
          toastClass: 'ngx-toastr custom-toast',
        });

        console.log(res);
      },
    });
  }

  deleteProductFormWish(id: string) {
    this.wishService.deleteFromWish(id).subscribe({
      next: (res) => {
        let message = 'Product deleted successfully!';
        console.log(res);

        if (res && typeof res === 'object' && 'message' in res) {
          message = res.message;
        }

        console.log(res);
        this.showWishList();
      },
    });
  }

  ngOnInit(): void {
    this.showWishList();
  }
}
