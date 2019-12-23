import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const Material = [MatButtonModule, MatToolbarModule, MatIconModule];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule {}
