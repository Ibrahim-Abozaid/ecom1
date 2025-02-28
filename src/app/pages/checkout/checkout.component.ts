import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  checkOutForm!: FormGroup;
  cartId: string = '';
  ngOnInit(): void {
    this.initFrom();
    this.getCardId();
  }

  initFrom() {
    // this.checkOutForm = new FormGroup({
    //   detail:new FormControl(null , Validators.required),
    //   phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    //   city:new FormControl(null,Validators.required)
    // })

    this.checkOutForm = this.formBuilder.group({
      details: [null, Validators.required],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: [null, Validators.required],
    });
  }

  getCardId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!;
      },
    });
  }

  submitForm(): void {
    this.ordersService
      .checkOutPayMent(this.cartId, this.checkOutForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            open(res.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
