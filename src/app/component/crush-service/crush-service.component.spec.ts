import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrushServiceComponent } from './crush-service.component';

describe('CrushServiceComponent', () => {
  let component: CrushServiceComponent;
  let fixture: ComponentFixture<CrushServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrushServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrushServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
