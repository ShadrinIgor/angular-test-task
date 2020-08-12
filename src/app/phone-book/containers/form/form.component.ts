import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneBookService, User } from '../../../services/phone-book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  isNew: boolean;
  form: FormGroup;
  user: User | null;
  error: string;
  message: string;

  constructor(private phoneBookService: PhoneBookService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.getContact();
    this.isNew = false;
    this.form = new FormGroup({
      fio: new FormControl(this.user?.fio, [Validators.required]),
      phone: new FormControl(this.user?.phone, [Validators.required, Validators.pattern(/^([+0-9])*$/)]),
      addDate: new FormControl(this.user?.addDate),
      comment: new FormControl(this.user?.comment),
      selected: new FormControl(this.user?.selected)
    });
  }

  /**
   * Get contact
   * @return User | null
   */
  getContact() {
    const id = +this.route.snapshot.params?.id;
    if (id) {
      return this.phoneBookService.getContact(id);
    }

    return null;
  }

  /**
   * Submit form
   */
  submit() {
    if (this.form.valid) {

      if (!this.user || !this.user?.id) {
        const date  = new Date();
        this.form.get('addDate').setValue(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`);
      }
      if (this.phoneBookService.updateContact(this.form.value)) {
        this.message = this.getSuccessMessage(this.user?.id);
      }

    } else {
      this.error = 'Проверьте правильность заполнения полей';
    }
  }

  /**
   * Navigate back to list
   */
  back() {
    this.router.navigate(['/']);
  }

  /**
   * Get Success Message
   * @param id number
   */
  getSuccessMessage(id: number) {
    return `Контакт успешно ${!id ? 'добавлен' : 'обновлен'}`;
  }
}
