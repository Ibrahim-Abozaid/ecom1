import { Component, inject, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // @Input() isLogin: boolean = true;
  private readonly authService = inject(AuthService);
  private readonly myTranslateService = inject(MyTranslateService);
  public readonly translateService = inject(TranslateService);
  isLogin = input<boolean>(true);

  logOut(): void {
    this.authService.logoutUser();
  }

  change(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
  }
}
