import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyMenuComponent } from './typography-menu.component';

describe('TypographyMenuComponent', () => {
  let component: TypographyMenuComponent;
  let fixture: ComponentFixture<TypographyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypographyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
