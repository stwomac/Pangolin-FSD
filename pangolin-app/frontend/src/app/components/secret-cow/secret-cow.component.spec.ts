import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SecretCowComponent } from './secret-cow.component'

describe('SecretCowComponent', () => {
  let component: SecretCowComponent
  let fixture: ComponentFixture<SecretCowComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretCowComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SecretCowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
