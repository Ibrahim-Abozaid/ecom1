import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgotPassword',
        loadComponent: () =>
          import('./pages/forgotpassword/forgotpassword.component').then(
            (m) => m.ForgotpasswordComponent
          ),
        title: 'forgotPawword',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
        canActivate: [authGuard],
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        title: 'Checkout',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'wishlist',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'details',
      },
      {
        path: 'brandDetail/:id',
        loadComponent: () =>
          import('./pages/brand-details/brand-details.component').then(
            (m) => m.BrandDetailsComponent
          ),
        title: 'Brand-Details',
      },
      {
        path: 'cat-details/:id',
        loadComponent: () =>
          import('./pages/cat-details/cat-details.component').then(
            (m) => m.CatDetailsComponent
          ),
        title: 'Cateogry details',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'allorders',
      },
      { path: '**', component: NotfoundComponent },
    ],
  },
];
