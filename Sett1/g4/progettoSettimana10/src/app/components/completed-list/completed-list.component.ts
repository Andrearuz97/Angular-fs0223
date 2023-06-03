import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../service/todos.service';
import { Todo } from '../../model/todo.interface';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',

})
export class CompletedListComponent implements OnInit {
  completedTodos: Todo[] = [];
  loadingCompleted: boolean = false;
  noCompletedTasks: boolean = false;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.loadingCompleted = true; // Imposta il caricamento in corso a true
    this.todosService.getCompletedTodos().then((todos: Todo[]) => {
      this.completedTodos = todos;
      this.loadingCompleted = false; // Reimposta il caricamento in corso a false dopo aver ottenuto i dati

      if (this.completedTodos.length === 0) {
        this.noCompletedTasks = true; // Imposta la variabile noCompletedTasks a true se non ci sono task completati
      }
    });
  }
}
