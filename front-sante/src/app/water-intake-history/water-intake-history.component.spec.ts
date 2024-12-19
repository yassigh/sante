import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterIntakeHistoryComponent } from './water-intake-history.component';

describe('WaterIntakeHistoryComponent', () => {
  let component: WaterIntakeHistoryComponent;
  let fixture: ComponentFixture<WaterIntakeHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterIntakeHistoryComponent]
    });
    fixture = TestBed.createComponent(WaterIntakeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
