import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService, User } from '../../../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  searchControl: FormControl;
  selectedUsersControl: FormControl;
  contacts: User[];
  contacts$: Observable<User[]>;
  debounce = 400;
  subs = new Subscription();
  deletedContactId: number;
  query = '';
  onlySelected = false;

  truckUser = (index: number, item: any) => item?.id;

  constructor(private cd: ChangeDetectorRef,
              private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.contacts$ = this.apiService.getContacts();

    const sub = this.contacts$
      .subscribe((contacts: User[]) => {
        this.contacts = contacts;
        this.cd.markForCheck();
      });

    this.subs.add(sub);

    this.searchControl = new FormControl('');
    this.selectedUsersControl = new FormControl('');
    this.handleSearchChange();
    this.handleSelectedOnlyChange();

    this.loadContacts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Handle Selected Only Change
   */
  handleSelectedOnlyChange(): void {
    const sub = this.selectedUsersControl.valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe((status: boolean) => {
        this.onlySelected = status;
        this.loadContacts();
      });

    this.subs.add(sub);
  }

  /**
   * Handle Search Change
   */
  handleSearchChange(): void {
    const sub = this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged()
      )
      .subscribe((query: string) => {
        this.query = query;
        this.loadContacts();
      });
    this.subs.add(sub);
  }

  /**
   * Load Contacts
   */
  loadContacts(): void {
    this.apiService.loadContacts({ query: this.query, onlySelected: this.onlySelected });
    this.cd.markForCheck();
  }

  /**
   * Edit contact
   * @param id number
   */
  goToForm(id?: number): void {
    this.router.navigate(['/form', id ? id : '']);
  }

  /**
   * Show Delete Modal
   * @param id number
   */
  showDeleteModal(id: number): void {
    this.deletedContactId = id;
  }

  /**
   * Delete contact
   */
  delete(): void {
    this.apiService.deleteContact(this.deletedContactId);
    this.loadContacts();
  }
}
