import { Component, signal } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import * as fakeData from '../../public/dummy.json';

interface Item {
  id: number;
  msg: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project');
  dummyData = fakeData;
  wish = signal<boolean>(false);
  msg = signal<string>('Welcome to project!');
  randomId = signal<number>(-1);
  toChild = signal<string>('Hemanth');
  items: Item[] = [
    {
      id:1,
      msg: 'Good Morning'
    },
    {
      id:2,
      msg: 'Good Afternoon'
    },
    {
      id:3,
      msg: 'Good Evening'
    },
    {
      id:4,
      msg: 'Good Night'
    }
  ]


  getRandomMessage(): void {  
    const randomIndex = Math.floor(Math.random() * this.items.length);
    this.msg.set(this.items[randomIndex].msg);
    this.randomId.set(randomIndex)
  }

  onOutputName(value:any):void{
    this.toChild.set(value)
  }
}
