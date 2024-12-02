import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginOrReportComponent } from './login-or-report.component'

describe('LoginOrReportComponent', () => {
  let component: LoginOrReportComponent
  let fixture: ComponentFixture<LoginOrReportComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOrReportComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginOrReportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
