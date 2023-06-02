import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../service/todos.service';
import { Todo } from '../../model/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTask!: string;

  constructor(private todosService: TodosService) {
    this.todosService.getTodos().then((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTask) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTask,
        completed: false
      };
      this.todosService.addTodo(newTodo).then(() => {
        this.todos.push(newTodo);
      });
      this.newTask = '';
    }
  }


  editTodo(todo: Todo): void {
    this.todosService.updateTodo(todo);
  }

  deleteTodo(todoId: number): void {
    this.todosService.deleteTodo(todoId).then(() => {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
    });
  }
}

