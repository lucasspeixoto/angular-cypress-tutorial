import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CustomValidationMessagesComponent } from '../../../components/custom-validation-messages/custom-validation-messages.component';

@Component({
  selector: 'app-create-user',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    CustomValidationMessagesComponent,
  ],
  template: ` <div class="container">
    <div class="container__form">
      <form id="form" nz-form [formGroup]="validateForm">
        <nz-form-item id="nameItem">
          <nz-form-label nzRequired>Nome</nz-form-label>
          <nz-form-control>
            <nz-input-group nzPrefixIcon="user">
              <input
                id="nameField"
                nz-input
                formControlName="name"
                placeholder="Digite o seu nome"
              />
            </nz-input-group>
            <app-custom-validation-messages
              [minLength]="3"
              id="nameErrorMessage"
              controlName="name"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item id="emailItem">
          <nz-form-label nzRequired>E-mail</nz-form-label>
          <nz-form-control>
            <nz-input-group nzPrefixIcon="mail">
              <input
                id="emailField"
                nz-input
                formControlName="email"
                placeholder="Entre com seu email"
              />
            </nz-input-group>
            <app-custom-validation-messages
              [minLength]="3"
              id="emailErrorMessage"
              controlName="email"
            />
          </nz-form-control>
        </nz-form-item>
      </form>
    </div>

    <div class="container__actions">
      <button
        id="createButton"
        (click)="submitForm()"
        [disabled]="validateForm.invalid"
        nz-button
        nzType="primary"
      >
        Criar
      </button>
    </div>
  </div>`,
  styles: [
    `
      .container {
        height: 100vh;
        overflow-x: hidden;

        &__form {
          padding: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          form {
            width: 50%;

            @media (max-width: 750px) {
              width: 100%;
            }
          }
        }

        &__actions {
          display: flex;
          justify-content: center;
          margin-top: 16px;
          width: 100%;

          button {
            width: 80px;
            padding: 5px;

            @media (max-width: 750px) {
              width: 100%;
              padding: 0;
            }
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  private fb = inject(NonNullableFormBuilder);

  public validateForm = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
    ]),
  });

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
}
