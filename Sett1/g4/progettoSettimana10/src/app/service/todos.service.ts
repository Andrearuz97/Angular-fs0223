import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos: Todo[] = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false }
  ];

  constructor() { }

  // Aggiungi un nuovo todo
  addTodo(todo: Todo): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.todos.push(todo);
        resolve(this.todos);
      }, 2000);
    });
  }

  // Modifica un todo esistente
  editTodo(todo: Todo): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = todo;
        }
        resolve(this.todos);
      }, 2000);
    });
  }

  // Elimina un todo
  deleteTodo(todoId: number): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.todos = this.todos.filter(t => t.id !== todoId);
        resolve(this.todos);
      }, 2000);
    });
  }

  // Ottieni tutti i todo
  getTodos(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.todos);
      }, 2000);
    });
  }

  // Ottieni i todo completati
  getCompletedTodos(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const completedTodos = this.todos.filter(t => t.completed);
        resolve(completedTodos);
      }, 2000);
    });
  }
}
