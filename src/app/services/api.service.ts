import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

export interface LoadContactsParams {
  query?: string;
  onlySelected?: boolean;
}

export interface User {
  fio: string;
  phone: string;
  addDate: string;
  id?: number;
  comment?: string;
  selected?: boolean;
}

@Injectable()
export class ApiService {
  private allContacts: User[] = [
    { id: 1, fio: 'Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет', selected: true },
    { id: 2, fio: '1 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 3, fio: '2 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 4, fio: '3 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 5, fio: '4 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 6, fio: '5 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет', selected: true },
    { id: 7, fio: '6 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 8, fio: '7 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 9, fio: '8 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 10, fio: '9 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет', selected: true }
  ];

  private listContacts$ = new Subject<User[]>();

  /**
   * Get List of Contacts
   * @return Observable<User[]>
   */
  getContacts(): Observable<User[]> {
    this.listContacts$.next([...this.allContacts]);
    return this.listContacts$.asObservable();
  }

  /**
   * Load List of Contacts
   * @return User[]
   */
  loadContacts(params?: LoadContactsParams): void {
    let newContacts = [...this.allContacts];
    if (params) {
      if (params.query) {
        newContacts = newContacts.filter(item => item.fio.indexOf(params.query) !== -1 || item.phone.indexOf(params.query) !== -1);
      }

      if (params.onlySelected) {
        newContacts = newContacts.filter(item => item.selected);
      }
    }

    this.listContacts$.next(newContacts);
  }

  /**
   * Get one Contact
   * @return User
   */
  getContact(id: number): Observable<User> {
    return of(this.allContacts.find(item => item.id === id));
  }

  /**
   * Delete contact
   * @return User[]
   */
  deleteContact(id: number): void {
    this.allContacts = this.allContacts.filter(item => item.id !== id);
  }

  /**
   * Update contact
   * @return User
   */
  upsetContact(user: User): void {
    if (!user.id) {
      user.id = this.allContacts.length ++;
      this.allContacts.push(user);
    } else {
      this.allContacts = this.allContacts.map(item => item.id === user.id ? user : item);
    }
    this.listContacts$.next( this.allContacts);
  }
}
