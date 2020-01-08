import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [ErrorComponent, SuccessComponent],
  imports: [CommonModule],
  exports: [ErrorComponent, SuccessComponent]
})
export class MessageModule {}
