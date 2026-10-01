import { Component } from '@angular/core';
import { UserSearchComponent } from './user-search/user-search.component';

@Component({
  imports: [UserSearchComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
