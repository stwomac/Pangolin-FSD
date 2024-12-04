import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDoneEditorComponent } from './report-done-editor.component';

describe('ReportDoneEditorComponent', () => {
  let component: ReportDoneEditorComponent;
  let fixture: ComponentFixture<ReportDoneEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDoneEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDoneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
