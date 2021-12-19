import { Injectable } from '@angular/core';
import { Toaster, ToastType } from 'ngx-toast-notifications';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toast: Toaster) {}

  success(message: string, color: ToastType = 'light') {
    this.toast.open({
      type: color,
      duration: 4000,
      position: 'top-right',
      text: 'Next Level',
      caption: message
    });
  }
}
