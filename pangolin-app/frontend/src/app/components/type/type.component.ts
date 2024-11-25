import { Component } from '@angular/core'
import { Type } from '../../models/type/type'
import { HttpService } from '../../services/http.service'
import { ContextType } from '../../models/context_type/context-type'
import { Reports } from '../../models/reports/reports'
@Component({
  selector: 'app-type',
  imports: [],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css',
})
export class TypeComponent {
  constructor(private httpService: HttpService) {
    this.getAllTypes()
  }
  types: Type[] = []

  getAllTypes() {
    this.httpService.getAllType().subscribe((data) => {
      let tempTypes: Type[] = []
      if (data.body) {
        for (let type of data.body) {
          tempTypes.push(
            new Type(
              type.type_id,
              type.type_name,
              type.reports,
              type.contextTypes,
            ),
          )
        }
      }
      this.types = tempTypes
    })
  }
}
