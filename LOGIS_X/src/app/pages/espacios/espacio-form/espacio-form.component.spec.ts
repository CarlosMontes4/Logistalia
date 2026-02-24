import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacioFormComponent } from './espacio-form.component';

describe('EspacioFormComponent', () => {
  let component: EspacioFormComponent;
  let fixture: ComponentFixture<EspacioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspacioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspacioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
