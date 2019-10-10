import { Component } from '@angular/core';

@Component({
  selector: 'venturplex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'venturplex-go-devops-example';
  links = [
    { path: '/login', icon: 'loyalty', label: 'Login' },
    { path: '/users', icon: 'person', label: 'Users' }
  ]
}

