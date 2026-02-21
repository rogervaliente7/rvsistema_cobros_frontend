import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosNewComponent } from './empleados-new.component';

describe('EmpleadosNewComponent', () => {
  let component: EmpleadosNewComponent;
  let fixture: ComponentFixture<EmpleadosNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
