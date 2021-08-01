import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavInfo } from 'src/app/models/navInfo';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', './custom_styles.css', './checkbox_radio-input.css']
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

  custom_grid_size:number = 30;

  isHamburger_status:boolean = false;
 
  constructor(){
    this.toVis.algorithm = "Algorithms";
    this.toVis.algorithmSpeed = 50;
    this.advance_setting = false;
   }

  ngOnInit(): void {
    this.updateWeights();
  }

  clicked(val:string){
    console.log("ccclicked :: ", val);
    
  }
  handleChange(val:string){
    console.log("this ischeked", val);
    
  }

  RunVisualizer(){
    if(window.innerWidth<1140){
      // $('#hamburger_btn').click();
      this.isHamburger_status = false;
    }
    if(this.toVis.algorithm != "Algorithms"){
      this.reset.emit(true);
      // var oldspeed = this.toVis.algorithmSpeed;
      // this.toVis.algorithmSpeed = 400-oldspeed;
      let id = window.setTimeout(() => {  this.information.emit(this.toVis);}, 100);
      
    }else{
      this.information.emit(this.toVis);
    }
  }

  RunReset(){
    if(window.innerWidth<1140){
      // $('#hamburger_btn').click();
      this.isHamburger_status = false;
    }
    this.reset.emit(true);
  }

  RunResetAll(){
    if(window.innerWidth<1140){
      // $('#hamburger_btn').click();
      this.isHamburger_status = false;
    }
    this.reset.emit(false);
  }

  mazesAndPattern(maze_type:string){
    if(window.innerWidth<1140){
      // $('#hamburger_btn').click();
      this.isHamburger_status = false;
    }
    this.maze_pattern = maze_type;
    this.reset.emit(false);
    this.mazesAndPatterns.emit(this.maze_pattern);
  }

  turn_walkthrough_tutorial(){
    this.reset.emit(false);
    this.mazesAndPatterns.emit('isWalkthrough');
  }

  ResetGridSize(n:number){
    this.custom_grid_size = n;
    this.grid_size.emit(n);
  }

  updateWeights(){
    if((this.diagonal_weight <= 100 && this.diagonal_weight >= 0) && (this.toll_weight <= 100 && this.toll_weight >= 0)){
      this.weight_values.emit([this.diagonal_weight, this.toll_weight]); 
    }else{
      if(this.diagonal_weight > 100){
        this.diagonal_weight = 100;
      }else if( this.diagonal_weight <= 0){
        this.diagonal_weight = 0;
      }

      if(this.toll_weight > 100){
        this.toll_weight = 100;
      }else if(this.toll_weight <= 0){
        this.toll_weight = 0;
      }
      this.weight_values.emit([this.diagonal_weight, this.toll_weight]); 
    }
  }

  increment_num(t:number){
    if(t == 0){
        if(this.toll_weight < 100){
          this.toll_weight = this.toll_weight+1;
        }
    }else if(t == 1){
      if(this.diagonal_weight < 100){
        this.diagonal_weight = this.diagonal_weight + 1;
      }
    }
    this.weight_values.emit([this.diagonal_weight, this.toll_weight]); 
    // this.updateWeights();
}

decrement_num(t:number){
    if(t == 0){

      if(this.toll_weight > 1){
        this.toll_weight = this.toll_weight-1;
      }
    }else if(t == 1){
      if(this.diagonal_weight > 1){
        this.diagonal_weight = this.diagonal_weight - 1;
      }
    }
    this.weight_values.emit([this.diagonal_weight, this.toll_weight]); 
    // this.updateWeights();
}
}
