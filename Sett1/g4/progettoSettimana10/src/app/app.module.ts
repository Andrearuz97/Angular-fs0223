import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoListComponent } from '../app/components/todo-list/todo-list.component';
import { CompletedListComponent } from '../app/components/completed-list/completed-list.component';

const routes: Routes = [
  { path: 'todo', component: TodoListComponent },
  { path: 'completed', component: CompletedListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CompletedListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) // Definizione delle rotte direttamente nell'importazione di RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
