import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TodoStatusEnum } from "../enum/todo-status.enum";
import { Todo } from "../models/Todo";
import { todoService } from "../services/todo.service";

@Component({
  selector: "app-list-todos",
  templateUrl: "./list-todos.component.html",
  styleUrls: ["./list-todos.component.scss"],
})
export class ListTodosComponent implements OnInit {
  @Input() todos: Todo[];
  allTodos: Todo[] = [];
  default: boolean = true;//by default "all" tab is selected
  @Output() DeletedItemInfo: EventEmitter<any> = new EventEmitter();

  constructor(private todoService: todoService) {}
  ngOnChanges(): void {
    this.allTodos = this.todos;
  }
  ngOnInit(): void {}
  selectTodos(status: String) {
    this.default=false
    if (status == "active") {
      this.todos = this.allTodos.filter(
        (t) => t.status === TodoStatusEnum.actif
      );
    } else if (status == "completed") {
      console.log("eee", this.allTodos);

      this.todos = this.allTodos.filter(
        (t) => t.status === TodoStatusEnum.done
      );
    } else this.todos = this.allTodos;
  }
  deleteItemInfoList($event) {
    this.DeletedItemInfo.emit($event);
  }
}
