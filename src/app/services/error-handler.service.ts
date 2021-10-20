import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

  handleError(error: Error | HttpErrorResponse) {
    this.zone.run(() => {
      if (error instanceof HttpErrorResponse)
        this.snackBar.open("A Network Error Occured", " Dismiss ", { panelClass: ['red-snackbar'] });
      else
        this.snackBar.openFromComponent(SnackBarComponent, { data: { type: "error", error }, duration: 5000, panelClass: ['red-snackbar'] });
      console.error(error);
    })

  }

}
