import { Component } from '@angular/core';
import { Table } from '../reusable-table/table/table';
import * as fakeData from '../../public/dummy.json';

@Component({
  selector: 'app-home',
  imports: [Table],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  columns = [
    {field:'id',header: 'ID'},
    {field:'firstName',header:'First Name'},
    {field:'lastName',header:'Last Name'},
    {field:'age',header:'Age'},
    {field:'email',header:'Email'},
    {field:'hair.color',header:'Hair Color'},
    {field:'address.city',header:'City'},
    {field:'company.name',header:'Company Name'}
  ];
  data = fakeData.users;
}
