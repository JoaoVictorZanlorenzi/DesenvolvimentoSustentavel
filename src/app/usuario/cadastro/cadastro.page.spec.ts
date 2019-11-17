import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { cadastro } from './cadastro.page';

describe('cadastro', () => {
  let component: cadastro;
  let fixture: ComponentFixture<cadastro>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [cadastro],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(cadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
