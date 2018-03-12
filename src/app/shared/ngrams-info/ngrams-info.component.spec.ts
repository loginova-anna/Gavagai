import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgramsInfoComponent } from './ngrams-info.component';

describe('NgramsInfoComponent', () => {
  let component: NgramsInfoComponent;
  let fixture: ComponentFixture<NgramsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgramsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgramsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
