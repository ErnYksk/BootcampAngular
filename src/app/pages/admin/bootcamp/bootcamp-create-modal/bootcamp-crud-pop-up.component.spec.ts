import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampCrudPopUpComponent } from './bootcamp-crud-pop-up.component';

describe('BootcampCrudPopUpComponent', () => {
  let component: BootcampCrudPopUpComponent;
  let fixture: ComponentFixture<BootcampCrudPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampCrudPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampCrudPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
