import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRouteComponent } from './button-route.component';

describe('ButtonRouteComponent', () => {
  let component: ButtonRouteComponent;
  let fixture: ComponentFixture<ButtonRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
