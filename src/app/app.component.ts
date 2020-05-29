import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Todo } from "src/models/todo.model";

@Component({
  //define a metadata that will help the class AppComponent below
  selector: "app-root", //it is a HTML tag
  templateUrl: "./app.component.html", // can be replaced to -> template:  <p>meu templete here</p> // define in the same page // templateUrl define in the other file
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public mode = "list";
  public todos: Todo[] = []; // null -> []
  //public todos: Todo[]; // undefined
  public title: String = "My tasks";
  public form: FormGroup;
  public validatorSaveButton = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.required,
        ]),
      ],
    });

    this.load();
  }

  add() {
    if (this.form.valid) {
      const title = this.form.controls["title"].value;
      const id = this.todos.length + 1;
      this.todos.push(new Todo(id, title, false));

      this.save();
      this.clear();
    } else {
      this.validatorSaveButton = true;

      setTimeout(() => {
        this.validatorSaveButton = false;
      }, 1000);
    }
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }

    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUnDone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem("todos", data);
    this.mode = "list";
  }

  load() {
    const data = localStorage.getItem("todos");
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
