import { Injectable } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toast: Toaster) {}

  success(message: string) {
    this.toast.open({
      type: 'light',
      duration: 5000,
      position: 'top-right',
      text: 'Next Level',
      caption: message
    });
  }
}
