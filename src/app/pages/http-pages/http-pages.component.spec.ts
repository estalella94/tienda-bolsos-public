import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpPagesComponent } from './http-pages.component';

describe('HttpPagesComponent', () => {
  let component: HttpPagesComponent;
  let fixture: ComponentFixture<HttpPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
