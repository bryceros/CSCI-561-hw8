import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { MainFormComponentComponent } from './main-form-component/main-form-component.component';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { CurrentlyTabComponent } from './currently-tab/currently-tab.component';
import { HourlyTabComponent } from './hourly-tab/hourly-tab.component';

import { ChartsModule } from 'ng2-charts';
import { WeeklyTabComponent } from './weekly-tab/weekly-tab.component';
import { WeatherDayComponent } from './weather-day/weather-day.component';

import { LocalStorageService } from './main-form-component/favorite-storage'
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponentComponent,
    MenuComponent,
    CurrentlyTabComponent,
    HourlyTabComponent,
    WeeklyTabComponent,
    WeatherDayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    NoopAnimationsModule,
    ChartsModule,
    StorageServiceModule,
    TooltipModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
