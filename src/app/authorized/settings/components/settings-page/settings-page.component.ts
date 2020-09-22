import { Component, OnInit } from '@angular/core';
import { HilSelectionDialogComponent } from '../hil-selection-dialog/hil-selection-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Hil } from 'src/app/shared/services/hil.service';
import { User, UserService } from 'src/app/shared/services/user.service';
import { PropertiesSelectionDialogComponent } from '../properties-selection-dialog/properties-selection-dialog.component';
import { PropertyService } from 'src/app/shared/services/property.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private propertyService: PropertyService,
    private toastr: ToastrService,
  ) {}

  username = localStorage.getItem('username');

  ngOnInit(): void {}

  openHilsSelectionDialog(): void {
    const dialogRef = this.dialog.open(HilSelectionDialogComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((result: Hil[]) => {
      const numberArrayHils: Array<number> = [];
      localStorage.setItem(
        'hils',
        JSON.stringify(result.map((x) => x.labcarname))
      );
      if (result) {
        for (const entry of result) {
          numberArrayHils.push(entry.id);
        }
        this.userService.sendHils(this.username, numberArrayHils).subscribe(
          (data) => this.toastr.success('Settings saved.', 'Success!'),
          (error) => console.log(error)
        );
      }
    });
  }

  openPropertiesSelectionDialog(): void {
    const dialogRef = this.dialog.open(PropertiesSelectionDialogComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      const numberArrayProperties: Array<number> = [];
      if (result) {
        localStorage.setItem(
          'properties',
          JSON.stringify(result.map((x) => x.name))
        );
        for (const entry of result) {
          numberArrayProperties.push(entry.id);
        }
        this.propertyService
          .sendProperties(this.username, numberArrayProperties)
          .subscribe(
            (data) => this.toastr.success('Settings saved.', 'Success!'),
            (error) => console.log(error)
          );
      }
    });
  }
}
