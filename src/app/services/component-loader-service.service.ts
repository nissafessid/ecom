import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderServiceService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver){}

//   public getComponents(components: any[]): any[] {
//       var tmp = Array();

//       for (var i = 0; i < components.length; ++i){
//           if (components[i].key == 0){
//               tmp.push(components[i].component);
//           }
//       }

//       return tmp;
//   }
  
  public getComponents(c:any){
      return HeaderComponent
  }
  load(container: ViewContainerRef, components: any[]): void {
      // clear 
      container.clear();

      for (var i = 0; i < components.length; ++i){
          if (components[i].key == 0 || components[i].key == 'site'){
              const childComponent = this.componentFactoryResolver.resolveComponentFactory( components[i].component );

              // at this point we want the "child" component to be rendered into the app.component:
              container.createComponent(childComponent);          
          }            
      }
  }
}
