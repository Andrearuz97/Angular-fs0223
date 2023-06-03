import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../service/todos.service';
import { Todo } from '../../model/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTask: string = '';
  loadingTodos: boolean = false;
  deletingTodoId: number | null = null;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.loadingTodos = true; // Imposta il caricamento in corso a true
    this.todosService.getTodos().then((todos: Todo[]) => {
      this.todos = todos;
      this.loadingTodos = false; // Reimposta il caricamento in corso a false dopo aver ottenuto i dati
    });
  }

  addTodo(): void {
    if (this.newTask) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTask,
        completed: false,
      };

      this.loadingTodos = true; // Imposta il caricamento in corso a true durante l'aggiunta del task

      this.todosService.addTodo(newTodo).then(() => {
        this.todos.push(newTodo);
        this.loadingTodos = false; // Reimposta il caricamento in corso a false dopo aver aggiunto il task
      });

      this.newTask = '';
    }
  }

  editTodo(todo: Todo): void {
    this.todosService.updateTodo(todo);
  }

  deleteTodoWithLoading(todoId: number): void {
    this.deletingTodoId = todoId; // Imposta l'ID del task in fase di cancellazione
    this.todosService.deleteTodo(todoId).then(() => {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
      this.deletingTodoId = null; // Reimposta la variabile deletingTodoId a null dopo aver cancellato il task
    });
  }
}

