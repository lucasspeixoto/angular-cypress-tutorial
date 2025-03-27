import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-user',
  imports: [NzIconModule, NzTabsModule, CreateUserComponent],
  template: `
    <nz-tabset #tabset>
      <nz-tab nzTitle="Novo usuário">
        <app-create-user />
      </nz-tab>
    </nz-tabset>
  `,
})
export class UserComponent {}
