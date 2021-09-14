import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFromItemComponent } from './remove-from-item.component';

describe('RemoveFromItemComponent', () => {
  let component: RemoveFromItemComponent;
  let fixture: ComponentFixture<RemoveFromItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFromItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFromItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
