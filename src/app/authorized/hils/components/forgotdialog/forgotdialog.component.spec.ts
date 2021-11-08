import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotdialogComponent } from './forgotdialog.component';

describe('ForgotdialogComponent', () => {
  let component: ForgotdialogComponent;
  let fixture: ComponentFixture<ForgotdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
