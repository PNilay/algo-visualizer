import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridworldComponent } from './visualizer/gridworld/gridworld.component';
import { NavBarComponent } from './visualizer/nav-bar/nav-bar.component';
import { GridcellComponent } from './visualizer/gridcell/gridcell.component';
import { AlgovisualizerComponent } from './visualizer/algovisualizer/algovisualizer.component';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorRepresentationComponent } from './visualizer/helper_components/color-representation/color-representation.component';
import { WalkthrouhTutorialComponent } from './visualizer//walkthrouh-tutorial/walkthrouh-tutorial.component';



@NgModule({
  declarations: [
    AppComponent,
    GridworldComponent,
    NavBarComponent,
    GridcellComponent,
    AlgovisualizerComponent,
    ColorRepresentationComponent,
    WalkthrouhTutorialComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
