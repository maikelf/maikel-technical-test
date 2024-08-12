import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-route',
  standalone: true,
  imports: [],
  templateUrl: './button-route.component.html',
  styleUrl: './button-route.component.css'
})
export class ButtonRouteComponent {
  @Input() path: string = '/'
  @Input() label: string = '';
  
  constructor(private route: Router) {}

  goTo(): void {
    this.route.navigate([this.path]);
  }
}