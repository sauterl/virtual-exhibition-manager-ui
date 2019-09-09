import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExhibitionVisualComponent } from './edit-exhibition-visual.component';

describe('EditExhibitionVisualComponent', () => {
  let component: EditExhibitionVisualComponent;
  let fixture: ComponentFixture<EditExhibitionVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExhibitionVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExhibitionVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
