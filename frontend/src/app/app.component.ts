import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Student } from './model/student/student';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @ViewChild('modalNewStudent') modal!: ElementRef;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {

    this.http.get<any>('http://localhost:3000/api/students').subscribe(
      response => {
        this.studentList = response;
      },
      error => {
        console.error('Erro ao buscar dados:', error);
      }
    );

    const localData = localStorage.getItem('angularCrud');
    if (localData !== null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModal() {
    const modal = document.getElementById('modalNewStudent');
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }
  
  closeModal() {
    this.studentObj = new Student();
    if (this.modal !== null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  saveStudent() {
    const isLocalPresent = localStorage.getItem('angularCrud');

    if (isLocalPresent !== null) {
      const oldArr = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArr.length + 1;
      oldArr.push(this.studentObj);
      this.studentList = oldArr;
      localStorage.setItem('angularCrud', JSON.stringify(oldArr));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angularCrud', JSON.stringify(newArr));
    }
    // this.closeModal();

    this.closeModal();
  }

  editStudent(item: Student) {
    this.studentObj = item;
    this.openModal();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(data => data.id === this.studentObj.id);
    if (currentRecord !== undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.phoneNo = this.studentObj.phoneNo;
      currentRecord.email = this.studentObj.email;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.address = this.studentObj.address;
    };
    localStorage.setItem('angularCrud', JSON.stringify(this.studentList));
    this.closeModal();
  }

  deleteStudent(item: Student) {
    const isDelete = confirm('Are you sure you want to delete');
    if (isDelete) {
      const currentRecord = this.studentList.findIndex(data => data.id === this.studentObj.id);
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem('angularCrud', JSON.stringify(this.studentList));
      this.closeModal();
    }
  }
}