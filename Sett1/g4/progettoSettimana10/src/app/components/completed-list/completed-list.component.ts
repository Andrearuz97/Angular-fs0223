import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../service/todos.service';
import { Todo } from '../../model/todo.interface';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',

})
export class CompletedListComponent implements OnInit {
  completedTodos: Todo[] = [];

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.todosService.getCompletedTodos().then(todos => {
      this.completedTodos = todos;
    });
  }
}
