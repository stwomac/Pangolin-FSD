import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDescriptionEditorComponent } from './report-description-editor.component';

describe('ReportDescriptionEditorComponent', () => {
  let component: ReportDescriptionEditorComponent;
  let fixture: ComponentFixture<ReportDescriptionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDescriptionEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDescriptionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
