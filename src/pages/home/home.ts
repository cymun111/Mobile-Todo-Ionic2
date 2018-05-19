import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private listTodos: any;
  private todo : FormGroup;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder, public alertCtrl: AlertController) {

    this.todo = this.formBuilder.group({
      todoItem: ['', Validators.required],
      status: [''],
    });

  }
    CreateTodo(){
      this.database.CreateTodo(this.todo.value.todoItem, this.todo.value.status).then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      })
    }

    GetAllTodos(){
      this.database.GetAllTodos().then((data) => {
        console.log(data);
        this.listTodos = data;
      }, (error) => {
        console.log(error)
      })
    }

    GetPending(){
      this.database.GetPending().then((data) => {
        console.log(data);
        this.listTodos = data;
      }, (error) => {
        console.log(error)
      })
    }

    GetComplete(){
      this.database.GetComplete().then((data) => {
        console.log(data);
        this.listTodos = data;
      }, (error) => {
        console.log(error)
      })
    }

    GetPastDue(){
      this.database.GetPastDue().then((data) => {
        console.log(data);
        this.listTodos = data;
      }, (error) => {
        console.log(error)
      })
    }

    DeleteTodo(idTodo){
      this.database.DeleteTodo(idTodo)
      console.log(idTodo);
    }

    UpdateTodo(idTodo, data){
      this.database.UpdateTodo(idTodo, data);
      console.log(idTodo);
    }

    showPrompt(idTodo) {
      let prompt = this.alertCtrl.create({
        title: 'Edit Your Todo',
        inputs: [
          {
            name: 'todoItem',
            placeholder: 'Todo Item',
          },
          {
            name: 'status',
            placeholder: 'Status'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log("Canceled");
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log(data);
              this.database.UpdateTodo(idTodo, data);
            }
          }
        ]
      });
      prompt.present();
    }
}
