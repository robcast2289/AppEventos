import { Injectable } from '@angular/core';

// Moduls
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items:any[] = [];
  
  constructor(
    public translateService:TranslateService
  ) { }

  async translateSer(value:string,parm?:any) {
    let valueTranslate = "";
    //this.translateService.use('en');
    await this.translateService.get(value,parm).toPromise().then(resp => { valueTranslate = resp; })
    return valueTranslate;
  }
}
