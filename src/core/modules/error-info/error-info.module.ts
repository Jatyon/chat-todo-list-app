import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInfoComponent } from '@core/modules/error-info/error-info.component';

@NgModule({
  declarations: [ErrorInfoComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ErrorInfoComponent],
})
export class ErrorInfoModule {}
