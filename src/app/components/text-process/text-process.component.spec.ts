import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextProcessComponent } from './text-process.component';

describe('TextProcessComponent', () => {
  let component: TextProcessComponent;
  let fixture: ComponentFixture<TextProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
