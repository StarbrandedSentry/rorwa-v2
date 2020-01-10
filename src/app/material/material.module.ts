import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';

const Material = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatDividerModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule {}
