import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCOmponentComponent } from './item-component.component';

describe('ItemCOmponentComponent', () => {
  let component: ItemCOmponentComponent;
  let fixture: ComponentFixture<ItemCOmponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCOmponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCOmponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
