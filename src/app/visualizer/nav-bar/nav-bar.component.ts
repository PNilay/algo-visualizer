import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavInfo } from 'src/app/models/navInfo';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() information: EventEmitter<NavInfo> = new EventEmitter();
  @Output() reset:  EventEmitter<boolean> = new EventEmitter();
  @Output() grid_size:  EventEmitter<number> = new EventEmitter();
  @Output() weight_values:  EventEmitter<number[]> = new EventEmitter(); //0 index ==> diagonal weight, 1 index ==> toll weight
  @Output() mazesAndPatterns:EventEmitter<string> = new EventEmitter();

  toVis:NavInfo = new NavInfo();
  favoriteColor:number = 5;
  name!: string;

  diagonal_weight:number = 1.42;
  toll_weight:number = 5;

  advance_setting!:boolean;

  maze_pattern:string = "blank";

  custom_grid_size:number = 5;
 
  constructor(){
    this.toVis.algorithm = "Algorithms";
    this.toVis.algorithmSpeed = 30;
    this.advance_setting = false;
   }

  ngOnInit(): void {
    this.updateWeights();
  }

  handleChange(val:string){
    console.log("this ischeked", val);
    
  }

  RunVisualizer(){
    if(this.toVis.algorithm != "Algorithms"){
      this.reset.emit(true);
      let id = window.setTimeout(() => {  this.information.emit(this.toVis);}, 100);
    }
  }

  RunReset(){
    this.reset.emit(true);
  }

  RunResetAll(){
    this.reset.emit(false);
  }

  mazesAndPattern(maze_type:string){
    this.maze_pattern = maze_type;
    this.reset.emit(false);
    this.mazesAndPatterns.emit(this.maze_pattern);
  }

  ResetGridSize(n:number){
    this.grid_size.emit(n);
  }

  updateWeights(){
    this.weight_values.emit([this.diagonal_weight, this.toll_weight]);
    // console.log("On focus out", this.diagonal_weight);
    
  }
}
