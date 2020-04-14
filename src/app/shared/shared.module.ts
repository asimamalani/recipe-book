import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [AlertComponent, ErrorPageComponent, LoadingSpinnerComponent, DropdownDirective, PlaceholderDirective],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    ErrorPageComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
    CommonModule,
  ],
  entryComponents: [AlertComponent],
})
export class SharedModule {}
