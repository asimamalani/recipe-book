import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';

const routes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [FormsModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class AuthModule {}
