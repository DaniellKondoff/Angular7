import { NgModule } from '@angular/core';
import { AuthComponent } from '../auth/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports: [
        RouterModule.forChild([
            {path: '', component: AuthComponent}
        ]),
        FormsModule,
        SharedModule
    ]
})
export class AuthModule{}