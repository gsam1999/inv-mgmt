import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

  handleError(error: Error | HttpErrorResponse) {
    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        if (!error.status)
          this.snackBar.open("Cannot Connect to Server", " Dismiss ", { panelClass: ['red-snackbar'] });
        if (error.status && error.message)
          this.snackBar.open(error.message.slice(0, 150), " Dismiss ", { panelClass: ['red-snackbar'] });
      }
      else
        this.snackBar.open("An Unexpected Error Occured", "Dismiss", { panelClass: ['red-snackbar'] });
      console.error(error);
    })
  }
}
