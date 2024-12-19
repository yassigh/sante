import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterReminderComponent } from './water-reminder.component';

describe('WaterReminderComponent', () => {
  let component: WaterReminderComponent;
  let fixture: ComponentFixture<WaterReminderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterReminderComponent]
    });
    fixture = TestBed.createComponent(WaterReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
