import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'mindata-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
})
export class DeleteConfirmationComponent {
  hero = inject(MAT_DIALOG_DATA);
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>) {}
}
