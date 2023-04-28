import { Component } from '@angular/core';

@Component({
  selector: 'app-menuppal',
  templateUrl: './menuppal.component.html',
  styleUrls: ['./menuppal.component.css']
})
export class MenuppalComponent {

  constructor() { }
   isSubmenuExpanded = false;
  
   toggleSubmenu() {
      this.isSubmenuExpanded = !this.isSubmenuExpanded;
  } 
  
}







