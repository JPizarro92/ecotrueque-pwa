import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangeViewPage } from './exchange-view.page';

describe('ExchangeViewPage', () => {
  let component: ExchangeViewPage;
  let fixture: ComponentFixture<ExchangeViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExchangeViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
