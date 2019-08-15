import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitFormComponent } from './exhibit-form.component';

describe('ExhibitFormComponent', () => {
  let component: ExhibitFormComponent;
  let fixture: ComponentFixture<ExhibitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
