import { Component, signal, computed, effect } from '@angular/core';
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
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'age', header: 'Age' },
    { field: 'email', header: 'Email' },
    { field: 'hair.color', header: 'Hair Color' },
    { field: 'address.city', header: 'City' },
    { field: 'company.name', header: 'Company Name' },
  ];
  data = fakeData.users;
  searchTerm = signal('');
  pageSize = signal(5);
  currentPage = signal(1);

  constructor() {
    effect(() => console.log(this.filteredData()));
  }

  resolveField(obj: any, path: string) {
    return path.split('.').reduce((o, key) => o?.[key], obj);
  }
  filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.data;
    return this.data.filter((row) =>
      this.columns.some((col) => {
        const value = this.resolveField(row, col.field);
        return String(value ?? '')
          .toLowerCase()
          .includes(term);
      }),
    );
  });

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredData().slice(start, end);
  });

  totalPages = computed(() => Math.ceil(this.filteredData().length / this.pageSize()));

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }
}
