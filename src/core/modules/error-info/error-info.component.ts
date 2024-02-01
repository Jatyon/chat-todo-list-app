import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-info',
  templateUrl: './error-info.component.html',
  styleUrls: ['./error-info.component.scss'],
})
export class ErrorInfoComponent {
  errorInfo: string = '';
  isError: boolean = false;

  showErrorNotice(error: string) {
    this.errorInfo = error;
    this.isError = true;
  }
  
  hidErrorNotice() {
    this.errorInfo = '';
    this.isError = false;
  }
}
