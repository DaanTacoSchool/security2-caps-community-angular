import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikePageComponent } from './like-page.component';

describe('LikePageComponent', () => {
  let component: LikePageComponent;
  let fixture: ComponentFixture<LikePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
