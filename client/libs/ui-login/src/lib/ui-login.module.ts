import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLoginComponent } from './ui-login/ui-login.component';
import { MaterialModule } from '@venturplex/material'

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [UiLoginComponent],
  exports: [
    UiLoginComponent
  ]
})
export class UiLoginModule {}
