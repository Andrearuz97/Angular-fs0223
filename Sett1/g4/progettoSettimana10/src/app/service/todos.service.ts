import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos: Todo[] = [];
  private completedTodos: Todo[] = [];
  private loading: boolean = false;

  constructor() {}

  addTodo(_todo: Todo): Promise<void> {
    this.loading = true;
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.todos.push();
        this.loading = false;
        resolve();
      }, 1000);
    });
  }

  updateTodo(todo: Todo): Promise<void> {
    this.loading = true;
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = todo;
        }
        if (todo.completed) {
          this.addToCompletedList(todo);
        } else {
          this.removeFromCompletedList(todo);
        }
        this.loading = false;
        resolve();
      }, 1000);
    });
  }

  deleteTodo(todoId: number): Promise<void> {
    this.loading = true;
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.todos = this.todos.filter(t => t.id !== todoId);
        this.removeFromCompletedListById(todoId);
        this.loading = false;
        resolve();
      }, 1000);
    });
  }

  getTodos(): Promise<Todo[]> {
    return new Promise<Todo[]>((resolve) => {
      setTimeout(() => {
        resolve(this.todos);
      }, 1000);
    });
  }


  getCompletedTodos(): Promise<Todo[]> {
    return new Promise<Todo[]>((resolve) => {
      setTimeout(() => {
        resolve(this.completedTodos);
      }, 1000);
    });
  }

  private addToCompletedList(todo: Todo): void {
    const existingTodo = this.completedTodos.find(t => t.id === todo.id);
    if (!existingTodo) {
      this.completedTodos.push(todo);
    }
  }

  private removeFromCompletedList(todo: Todo): void {
    this.completedTodos = this.completedTodos.filter(t => t.id !== todo.id);
  }

  private removeFromCompletedListById(todoId: number): void {
    this.completedTodos = this.completedTodos.filter(t => t.id !== todoId);
  }
}
