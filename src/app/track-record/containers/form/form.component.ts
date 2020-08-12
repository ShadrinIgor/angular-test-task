import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  get blocks() {
    return this.form.get('blocks') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      blocks: this.formBuilder.array([this.createBlock()])
    });
  }

  /**
   * Create Block
   * @return FormGroup
   */
  createBlock(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      purchaseDate: new FormControl('', [Validators.required]),
      purchasePrice: new FormControl('', [Validators.required]),
      rehabBudget: new FormControl('', [Validators.required]),
      saleDate: new FormControl('', [Validators.required]),
      salePrice: new FormControl('', [Validators.required])
    });
  }

  /**
   * Submit form
   */
  submit() {
    console.log(this.form.value);
  }

  /**
   * Add New Block
   */
  addNewBlock() {
    this.blocks.push(this.createBlock());
  }
}
