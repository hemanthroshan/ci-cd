import { JsonPipe } from '@angular/common';
import { Component ,signal,Input, EventEmitter, Output} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule,ReactiveFormsModule,JsonPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() title:string = 'World!';
  @Output() outputName = new EventEmitter<string>();
  toParent = signal<string>('');
  direction = signal<string>('to');
  myForm = new FormGroup({
    userName: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    age: new FormControl('',[Validators.min(5),Validators.max(50)]),
    location: new FormControl('')
  })
  sendName():void{
    if(this.title==='World!'){
      this.toParent.set('Hemanth');
      this.direction.set('from');
    } else{
      this.toParent.set('World!');
      this.direction.set('to');
    }
    this.outputName.emit(this.toParent());
  }

  formSubmit():void{
    this.myForm.valid ? alert("Form Submitted Successfully!") : alert("Please fill the form correctly.");
  }
}
