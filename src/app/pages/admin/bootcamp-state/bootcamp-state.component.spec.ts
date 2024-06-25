import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampStateComponent } from './bootcamp-state.component';

describe('BootcampStateComponent', () => {
  let component: BootcampStateComponent;
  let fixture: ComponentFixture<BootcampStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
