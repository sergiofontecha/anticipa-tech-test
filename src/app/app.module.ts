// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// App Modules & Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// App Services
import { InitializerService } from './shared/services/initializer.service';
import { PropertiesService } from './shared/services/properties.service';

export function loadData(initializerService: InitializerService): {} {
  return () => initializerService.getProductsData();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    InitializerService,
    PropertiesService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadData,
      deps: [InitializerService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
