import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';

const routes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [FormsModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class AuthModule {}
