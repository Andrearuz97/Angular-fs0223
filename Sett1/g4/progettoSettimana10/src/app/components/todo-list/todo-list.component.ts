import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../service/todos.service';
import { Todo } from '../../model/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todosService.getTodos().then(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: 'New Task',
      completed: false
    };

    this.todosService.addTodo(newTodo).then(todos => {
      this.todos = todos;
    });
  }

  editTodo(todo: Todo): void {
    this.todosService.editTodo(todo).then(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todoId: number): void {
    this.todosService.deleteTodo(todoId).then(todos => {
      this.todos = todos;
    });
  }
}

