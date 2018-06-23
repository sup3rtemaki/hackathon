import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelComponent } from './fidel.component';

describe('FidelComponent', () => {
  let component: FidelComponent;
  let fixture: ComponentFixture<FidelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FidelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FidelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
