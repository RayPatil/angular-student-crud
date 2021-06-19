import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  Student: Student[];

  constructor(private studentService: StudentService){}

  ngOnInit(){
    this.studentService.getStudentList().subscribe(res =>{
      this.Student = res.map( e => {
        return{
          id : e.payload.doc.id,
          ...e.payload.doc.data() as{}
        } as Student;
      })
    });
  }

  removeStudent (Student){
    if(confirm("Are you sure to delete "+ Student.name)){
      this.studentService.deleteStudent(Student);
    }
  }

}
