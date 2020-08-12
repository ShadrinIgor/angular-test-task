import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PhoneBookService, User } from '../../../services/phone-book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  searchControl: FormControl;
  selectedUsersControl: FormControl;
  users: User[] = [];
  debounce = 400;
  subs = new Subscription();
  deletedContactId: number;

  truckUser = (index: number, item: any) => item.id;

  constructor(private cd: ChangeDetectorRef,
              private router: Router,
              private phoneBookService: PhoneBookService) {
  }

  ngOnInit(): void {
    this.users = [...this.phoneBookService.getListContacts()];
    this.searchControl = new FormControl('');
    this.selectedUsersControl = new FormControl('');
    const sub = this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.filterUsers(query);
      });
    this.subs.add(sub);

    const sub2 = this.selectedUsersControl.valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(query => {
        console.log('query', query);
        // this.filterUsers(query);
      });

    this.subs.add(sub2);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  /**
   * Filter Users
   * @param query query
   */
  filterUsers(query: string) {
    const newList = this.phoneBookService.getListContacts()
      .filter(item => item.fio.indexOf(query) !== -1 || item.phone.indexOf(query) !== -1);

    this.users = [...newList];
    this.cd.markForCheck();
  }

  /**
   * Edit contact
   * @param id number
   */
  goToForm(id?: number) {
    this.router.navigate(['/form', id ? id : '']);
  }

  /**
   * Show Delete Modal
   * @param id number
   */
  showDeleteModal(id: number) {
    this.deletedContactId = id;
  }

  /**
   * Delete contact
   */
  delete() {
    console.log('delete', this.deletedContactId);
  }
}
