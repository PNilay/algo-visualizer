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

  toVis:NavInfo = new NavInfo();
  favoriteColor:number = 5;
  name!: string;

  advance_setting!:boolean;
 
  constructor(){
    this.toVis.algorithm = "Algorithms";
    this.toVis.algorithmSpeed = 30;
    this.advance_setting = false;
   }

  ngOnInit(): void {
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

  ResetGridSize(n:number){
    this.grid_size.emit(n);
  }

}
