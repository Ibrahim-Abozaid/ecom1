import { RouterLink } from '@angular/router';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  allCateogries: ICategory[] = [];
  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.allCateogries = res.data;
      },
    });
  }

  // getSpecicficCategoryData(id: string) {
  //   this.categoriesService.getSpecificCategory(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //   });
  // }
}
