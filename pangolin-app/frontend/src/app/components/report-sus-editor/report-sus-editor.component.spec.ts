import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSusEditorComponent } from './report-sus-editor.component';

describe('ReportSusEditorComponent', () => {
  let component: ReportSusEditorComponent;
  let fixture: ComponentFixture<ReportSusEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSusEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSusEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
