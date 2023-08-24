import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  constructor(private toastr: ToastrService) {}

  customSuccessToast = (msg: string) => {
    this.toastr.success(msg, '', {
      timeOut: 1000,
    });
  };

  customErrorToast = (err: string) => {
    this.toastr.error(err, '', {
      timeOut: 1000,
    });
  };

 
}
