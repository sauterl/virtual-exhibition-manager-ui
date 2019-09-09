import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseEditorComponent } from './choose-editor.component';

describe('ChooseEditorComponent', () => {
  let component: ChooseEditorComponent;
  let fixture: ComponentFixture<ChooseEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
