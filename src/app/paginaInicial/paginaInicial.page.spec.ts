import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { paginaInicial } from './paginaInicial.page';

describe('paginaInicialPage', () => {
  let component: paginaInicial;
  let fixture: ComponentFixture<paginaInicial>;
  let paginaInicialPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ paginaInicial ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(paginaInicial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    paginaInicialPage = fixture.nativeElement;
    const items = paginaInicialPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
