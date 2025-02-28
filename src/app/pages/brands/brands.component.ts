import { Component } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { BrandsService } from '../../core/services/brands/brands.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  constructor(private brandService: BrandsService) {}

  brands: ICategory[] = [];

  ngOnInit(): void {
    this.getBrandsData();
  }

  getBrandsData(): void {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res.data;
    });
  }
}
