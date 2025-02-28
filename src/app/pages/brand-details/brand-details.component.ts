import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brand-details',
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss',
})
export class BrandDetailsComponent {
  brandId: any;
  brandDetails: any;
  private activatedRoute = inject(ActivatedRoute);
  private brandsService = inject(BrandsService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.brandId = res.get('id');

        this.brandsService.getSpecificBrand(this.brandId).subscribe({
          next: (res) => {
            this.brandDetails = res.data;
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
}
