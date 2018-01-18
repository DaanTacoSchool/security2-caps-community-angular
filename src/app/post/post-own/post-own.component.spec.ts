import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOwnComponent } from './post-own.component';

describe('PostOwnComponent', () => {
  let component: PostOwnComponent;
  let fixture: ComponentFixture<PostOwnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOwnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
