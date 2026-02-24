import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDashboardComponent } from './usuarios-dashboard.component';

describe('UsuariosDashboardComponent', () => {
  let component: UsuariosDashboardComponent;
  let fixture: ComponentFixture<UsuariosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
