import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationSelectorComponent } from './annotation-selector.component';

describe('AnnotationSelectorComponent', () => {
  let component: AnnotationSelectorComponent;
  let fixture: ComponentFixture<AnnotationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
