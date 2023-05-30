import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}
  gotoInactivePosts() {
    this.router.navigate(['/post-non-attivi']);
}
gotoActivePosts() {
    this.router.navigate(['/post-attivi']);
}

}
