import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from '../components/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        RouterModule.forChild([
            {path: 'shopping-list', component: ShoppingListComponent},
        ]),
        SharedModule,
        FormsModule
    ]
})
export class ShoppingListModule{}