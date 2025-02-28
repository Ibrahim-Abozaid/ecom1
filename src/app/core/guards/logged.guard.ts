import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let pLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('token') !== null) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
