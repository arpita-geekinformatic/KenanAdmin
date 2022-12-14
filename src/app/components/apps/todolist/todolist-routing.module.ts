import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoList01Component } from './todo-list01/todo-list01.component';
import { TodoList02Component } from './todo-list02/todo-list02.component';
import { TodoList03Component } from './todo-list03/todo-list03.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'todolist01',
        component: TodoList01Component
      },
      {
        path: 'todolist02',
        component: TodoList02Component
      },
      {
        path: 'todolist03',
        component: TodoList03Component
      }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule { }