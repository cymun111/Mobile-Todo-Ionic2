import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;


  constructor(
    public http: Http,
    public storage: SQLite
  ) {
    if(!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({name: "data.db", location:"default"}).then((db:SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todoItem TEXT, status TEXT)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }
  CreateTodo(todoItem: string, status:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO todos (todoItem, status) VALUES (?, ?)";
      this.db.executeSql(sql, [todoItem, status]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetAllTodos(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM todos", []).then((data) => {
        let arrayTodos = [];
        if (data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            arrayTodos.push({
              id: data.rows.item(i).id,
              todoItem: data.rows.item(i).todoItem,
              status: data.rows.item(i).status,
            });
            
          }
        }
        resolve(arrayTodos);
      }, (error) => {
        reject(error);
      })
    })
  }

  GetPending(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM todos WHERE status= 'Pending'", []).then((data) => {
        let arrayPending = [];
        if (data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            arrayPending.push({
              id: data.rows.item(i).id,
              todoItem: data.rows.item(i).todoItem,
              status: data.rows.item(i).status,
            });
            
          }
        }
        resolve(arrayPending);
      }, (error) => {
        reject(error);
      })
    })
  }

  GetComplete(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM todos WHERE status= 'Completed'", []).then((data) => {
        let arrayPending = [];
        if (data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            arrayPending.push({
              id: data.rows.item(i).id,
              todoItem: data.rows.item(i).todoItem,
              status: data.rows.item(i).status,
            });
            
          }
        }
        resolve(arrayPending);
      }, (error) => {
        reject(error);
      })
    })
  }

  GetPastDue(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM todos WHERE status= 'Past Due'", []).then((data) => {
        let arrayPending = [];
        if (data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            arrayPending.push({
              id: data.rows.item(i).id,
              todoItem: data.rows.item(i).todoItem,
              status: data.rows.item(i).status,
            });
            
          }
        }
        resolve(arrayPending);
      }, (error) => {
        reject(error);
      })
    })
  }

  DeleteTodo(idTodo){
    return new Promise ((resolve, reject) => {
      console.log(idTodo);
      this.db.executeSql("DELETE FROM todos WHERE id='" + idTodo + "'", [])
      .then((results) => {
      }, (err) => {
          console.error(err);
      });
    })
  }

  UpdateTodo(idTodo, data){
    return new Promise ((resolve, reject) => {
      console.log(idTodo);
      this.db.executeSql("UPDATE todos SET todoItem = '" + data.todoItem + "', status = '" + data.status + "' WHERE id= '" + idTodo + "'",[])
      .then((results) => {
      },(err) => {
        console.log(err);
      })
    })
  }

}
