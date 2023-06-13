import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    config.verticalPosition = "bottom";
    config.horizontalPosition = "end";
    this.snackBar.open(message, action, config);
  }
}
