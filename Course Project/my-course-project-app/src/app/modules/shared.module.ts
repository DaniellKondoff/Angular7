import { NgModule } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { DropdownDirective } from '../shared/dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [
        AlertComponent
      ]
})
export class SharedModule{}