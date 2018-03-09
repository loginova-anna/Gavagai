import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneChooserComponent } from './tone-chooser.component';

describe('ToneChooserComponent', () => {
  let component: ToneChooserComponent;
  let fixture: ComponentFixture<ToneChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToneChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToneChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
