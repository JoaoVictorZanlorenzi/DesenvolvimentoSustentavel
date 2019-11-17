import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { login } from './login.page';

describe('login', () => {
  let component: login;
  let fixture: ComponentFixture<login>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [login],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
