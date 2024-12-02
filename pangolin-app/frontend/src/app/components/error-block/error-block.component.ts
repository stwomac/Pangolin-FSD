import { NgIf } from '@angular/common'
import { Input, Component } from '@angular/core'

/*
 * simple component to represent a location where we can display an error
 * */
@Component({
  selector: 'error-block',
  imports: [NgIf],
  templateUrl: './error-block.component.html',
  styleUrl: './error-block.component.css',
})
export class ErrorBlockComponent {
  @Input() error: string = ''

  test = true
}
