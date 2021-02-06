import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridworldComponent } from './visualizer/gridworld/gridworld.component';
import { NavBarComponent } from './visualizer/nav-bar/nav-bar.component';
import { GridcellComponent } from './visualizer/gridcell/gridcell.component';
import { AlgovisualizerComponent } from './visualizer/algovisualizer/algovisualizer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    GridworldComponent,
    NavBarComponent,
    GridcellComponent,
    AlgovisualizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
