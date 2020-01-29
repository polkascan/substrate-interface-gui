import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Polkascan Substrate Interface';

  public showNavigation = false;

  toggleNavigation() {
    this.showNavigation = !this.showNavigation;
  }
}
