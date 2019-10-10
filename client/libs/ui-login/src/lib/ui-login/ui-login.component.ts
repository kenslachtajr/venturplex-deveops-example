import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'venturplex-ui-login',
  templateUrl: './ui-login.component.html',
  styleUrls: ['./ui-login.component.scss']
})
export class UiLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTodos() {
    this.router.navigate(['/todos']);
  }

}
