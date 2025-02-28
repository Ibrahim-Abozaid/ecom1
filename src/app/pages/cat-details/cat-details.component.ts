import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cat-details',
  imports: [],
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.scss',
})
export class CatDetailsComponent implements OnInit {
  catId!: any;
  catDetails: ICategory | null = null;
  private categoriesService = inject(CategoriesService);
  private activatedRoute = inject(ActivatedRoute);

  // getCatById(id: string) {
  //   this.categoriesService.getSpecificCategory(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.catList = res.data;
  //     },
  //   });
  // }

  // ngOnInit(): void {
  //   this.catId = this.activatedRoute.snapshot.params['catId'];
  //   this.getCatById(this.catId);
  // }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.catId = res.get('id');

        this.categoriesService.getSpecificCategory(this.catId).subscribe({
          next: (res) => {
            this.catDetails = res.data;
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
