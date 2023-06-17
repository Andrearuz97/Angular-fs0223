import { Component, OnInit } from '@angular/core';
import { Utenti } from 'src/app/model/utenti.interface';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {
    users: Utenti[] | undefined;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    setTimeout(() => {
    this.userService.getUsers().subscribe((_user: Utenti[]) => {
        this.users = _user;
  })
  }, 1000)
}
}
