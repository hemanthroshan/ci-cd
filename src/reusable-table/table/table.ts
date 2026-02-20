import { Component, input } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-table',
  imports: [ScrollingModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  columns = input<{ field: string; header: string }[]>([]);
  data = input<any[]>([]);
  trackByKey = input<string>('id');
  resolveField(obj: any, path: string) {
    return path.split('.').reduce((o, key) => o?.[key], obj);
  }
}
