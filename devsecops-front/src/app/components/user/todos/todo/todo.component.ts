import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Todo } from "../models/Todo";

import { todoService } from "../services/todo.service";
@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  constructor(public todoService: todoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  onSubmit(addTodo: NgForm) {
    this.todoService.addTodo(addTodo.value).subscribe(
      (data) => {
        this.getTodos();
      },
      (err) => {}
    );
    addTodo.reset();
    var myHTML = "<div><h1>Jimbo.</h1>\n<p>That's what she said</p></div>";

    var strippedHtml = myHTML.replace(/<[^>]+>/g, "");

    // Jimbo.
    // That's what she said
    console.log(strippedHtml);
  }

  getTodos() {
    this.todoService.getTodos().subscribe(
      (todos) => {
        this.todos = todos;
      },
      (erreur) => {
        this.todos = this.todoService.getFakeTodos();
      }
    );
  }

  deleteItem($event) {
    this.todoService.deleteTodo($event).subscribe(
      (data) => {
        this.getTodos();
      },
      (err) => {}
    );
  }
}
