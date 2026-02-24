import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudListClienteComponent } from './solicitud-list-cliente.component';

describe('SolicitudListClienteComponent', () => {
  let component: SolicitudListClienteComponent;
  let fixture: ComponentFixture<SolicitudListClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudListClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudListClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
