import { Injectable } from '@angular/core';

export interface User {
  id?: number;
  fio: string;
  phone: string;
  addDate: string;
  selected?: boolean;
  comment?: string;
}

@Injectable()
export class PhoneBookService {
  private allUsers: User[] = [
    { id: 1, fio: 'Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет', selected: true },
    { id: 2, fio: '1 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 3, fio: '2 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 4, fio: '3Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 5, fio: '4 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 6, fio: '5 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет', selected: true },
    { id: 7, fio: '6 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 8, fio: '7 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 9, fio: '8 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет' },
    { id: 10, fio: '9 Александр Сергеевич Пушкин', phone: '+1234567889', addDate: '2020-01-03', comment: 'Хорошо пишет', selected: true }
  ];

  /**
   * Get List of Contacts
   * @return User[]
   */
  getListContacts() {
    return this.allUsers;
  }

  /**
   * Get one Contact
   * @return User
   */
  getContact(id: number) {
    return this.allUsers.find(item => item.id === id);
  }

  /**
   * Delete contact
   * @return User
   */
  deleteContact(id: number) {
    return true;
  }

  /**
   * Update contact
   * @return User
   */
  updateContact(user: User) {
    console.log('updateContact');
    if (!user.id) {
      this.allUsers.push(user);
    } else {
      this.allUsers = this.allUsers.map(item => item.id === user.id ? user : item);
    }
    return true;
  }
}
