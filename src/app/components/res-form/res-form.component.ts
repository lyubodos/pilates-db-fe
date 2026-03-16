import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {CommonModule, DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MAT_DATE_LOCALE} from "@angular/material/core";


@Component({
  selector: 'app-res-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatInputModule,
    MatRadioButton,
    MatRadioGroup,
    MatDatepicker,
    MatError,
    MatHint,
    MatButton,
    MatLabel,
  ],
  providers: [DatePipe,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './res-form.component.html',
  styleUrl: './res-form.component.scss'
})
export class ResFormComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({});
  public date = new Date();
  public availableTimes: string[] = [];
  public isLoading: boolean = false;
  public showModal = false;
  public showCookiesModal = false;
  public modalSuccess = false;
  public minDate: Date = new Date();
  public cookiesAccepted = false;


  constructor(private fb: UntypedFormBuilder,
              private datePipe: DatePipe) {
  }


  public ngOnInit() {
    const today = new Date();
    this.minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    this.userForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      secondName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: this.fb.control('', [Validators.required, this.phoneValidator()]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      date: this.fb.control('', [Validators.required]),
      reservationTime: [null, [Validators.required, this.dynamicTimeValidator.bind(this)]],
      option: this.fb.control(null, Validators.required)
    });
  }

  public onSubmit() {
    console.log(this.userForm.value);
  }


  private phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) return null;

      // Accept optional spaces between groups
      const phoneRegex = /^(?:\+359\s?|0)(?:87\d|88\d|89\d|7\d{2})\s?\d{2}\s?\d{2}\s?\d{2}$/;

      const compactValue = value.replace(/\s+/g, '');
      const compactRegex = /^(?:\+359|0)(87\d{6}|88\d{6}|89\d{6}|7\d{7})$/;

      const valid = phoneRegex.test(value) || compactRegex.test(compactValue);
      return valid ? null : {invalidPhone: true};
    };
  }

  private noPastDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today ? {pastDate: true} : null;
  }


  private dynamicTimeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const time = control.value;
      if (!(time instanceof Date)) return {invalidTimeFormat: true};

      const hour = time.getHours();
      const minute = time.getMinutes();

      if (minute !== 0) return {notRoundHour: true};

      const date = this.userForm?.get('date')?.value;
      const day = date instanceof Date ? date.getDay() : null;
      const minHour = day === 0 || day === 6 ? 10 : 8;
      const maxHour = day === 0 || day === 6 ? 16 : 17;

      if (hour < minHour || hour > maxHour) return {outOfTimeRange: true};

      return null;
    };
  }
}
