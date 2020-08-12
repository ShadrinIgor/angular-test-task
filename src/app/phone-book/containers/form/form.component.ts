import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, User } from '../../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  isNew: boolean;
  form: FormGroup;
  user: User;
  error: string;
  message: string;
  loaded = false;
  subs = new Subscription();

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getContact();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Get contact
   * @return User | null
   */
  getContact(): void {
    const id = +this.route.snapshot.params?.id;
    const sub = this.apiService.getContact(id)
      .subscribe((user: User) => {
        this.isNew = !!(user && user.id);

        this.initForm(user);
        this.loaded = true;
        this.cd.markForCheck();
      });

    this.subs.add(sub);
  }

  /**
   * Init Form
   * @param user User
   */
  initForm(user): void {
    this.form = new FormGroup({
      fio: new FormControl(user?.fio, [Validators.required]),
      phone: new FormControl(user?.phone, [Validators.required, Validators.pattern(/^([+0-9])*$/)]),
      addDate: new FormControl(user?.addDate),
      comment: new FormControl(user?.comment),
      selected: new FormControl(user?.selected)
    });
  }

  /**
   * Submit form
   */
  submit(): void {
    if (this.form.valid) {

      if (this.isNew) {
        const date = new Date();
        this.form.get('addDate').setValue(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`);
      }
      this.apiService.upsetContact(this.form.value);
      this.message = this.getSuccessMessage(this.user?.id);

    } else {
      this.error = 'Проверьте правильность заполнения полей';
    }
  }

  /**
   * Navigate back to list
   */
  back(): void {
    this.router.navigate(['/']);
  }

  /**
   * Get Success Message
   * @param id number
   */
  getSuccessMessage(id: number): string {
    return `Контакт успешно ${!id ? 'добавлен' : 'обновлен'}`;
  }
}
