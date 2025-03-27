import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnDestroy,
  type OnInit,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-user',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
  ],
  template: ` <div class="container">
    <form
      class="container__form"
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item>
        <nz-form-label [nzSpan]="4" nzRequired nzFor="name">Nome</nz-form-label>
        <nz-form-control [nzSpan]="8" nzErrorTip="O nome é obrigatório">
          <input
            type="text"
            nz-input
            formControlName="name"
            placeholder="Digite o seu nome"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label
          [nzSpan]="4"
          nzFor="nickname"
          [nzRequired]="validateForm.controls.required.value"
        >
          Apelido
        </nz-form-label>
        <nz-form-control [nzSpan]="8" nzErrorTip="Apelido obrigatório">
          <input
            type="text"
            nz-input
            formControlName="nickname"
            placeholder="Digite o apelido ou como gostaria de ser chamado"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="8" [nzOffset]="4">
          <label nz-checkbox formControlName="required"
            >Apelido obrigatório</label
          >
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="8" [nzOffset]="4">
          <button [disabled]="validateForm.invalid" nz-button nzType="primary">
            Criar
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  </div>`,
  styles: [
    `
      .container {
        height: 100vh;
        overflow-x: hidden;

        &__form {
          padding: 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent implements OnInit, OnDestroy {
  private fb = inject(NonNullableFormBuilder);

  private destroy$ = new Subject<void>();

  public validateForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    nickname: this.fb.control(''),
    required: this.fb.control(false),
  });

  public ngOnInit(): void {
    this.validateForm.controls.required.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.requiredChange(value);
      });
  }

  public submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      alert('Usuário salvo');
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public requiredChange(required: boolean): void {
    if (!required) {
      this.validateForm.controls.nickname.clearValidators();
      this.validateForm.controls.nickname.markAsPristine();
    } else {
      this.validateForm.controls.nickname.setValidators(Validators.required);
      this.validateForm.controls.nickname.markAsDirty();
    }
    this.validateForm.controls.nickname.updateValueAndValidity();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
