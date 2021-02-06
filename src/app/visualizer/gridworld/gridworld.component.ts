import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Cell } from '../../models/cell';
import { GridcellComponent } from '../gridcell/gridcell.component';
// import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-gridworld',
  templateUrl: './gridworld.component.html',
  styleUrls: ['./gridworld.component.css']
})
export class GridworldComponent implements OnInit {

  @Input() inProcess:boolean = false;
  @Input() cells:Cell[][] = [];

  @Output() iswallClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() dragged: EventEmitter<any> = new EventEmitter();

  @ViewChildren('cell') cellcomponents!: QueryList<any>;

  mousePressed:boolean = false;
  prev_mouseEnter!:number;

  dragNode!:number[];
  dragType!:boolean; //True == Start, False == End


  prevdragNode!:number[];
  
  constructor(){ };

  ngOnInit(): void { };

  refreshGridworld(){
    this.cellcomponents.forEach((cmp: GridcellComponent) => {
        cmp.runChangeDetector();
    });
  }

  addColors(){
    this.cellcomponents.forEach((cmp: GridcellComponent) => {
      setTimeout(() => {
        cmp.runChangeDetector();
      }, 100);
    });
  }

  tdClick(y:number,x:number){    
    if(this.cells[y][x].status == 'open'){
      this.cells[y][x].status = 'close';
    }else if(this.cells[y][x].status == 'close'){
      this.cells[y][x].status = 'open';
    }
    this.refreshGridworld();
  }

  mouseEnterHandler(y:number,x:number){    
    if(this.mousePressed &&  !this.inProcess){
      if(this.prev_mouseEnter != y+x){      
        if(this.cells[y][x].status == 'open'){ 
          this.cells[y][x].status = 'close';
          this.prev_mouseEnter = y+x;
          this.refreshGridworld();
          return;
        }else if(this.cells[y][x].status == 'close'){    
          this.cells[y][x].status = 'open';
          this.prev_mouseEnter = y+x;
          this.refreshGridworld();
          return;
        }
      }
    }
  }
  mouseDownHandler(y:number,x:number){
    if(!this.inProcess){
      if(this.cells[y][x].status != 'start' || this.cells[y][x].status != 'end' ){
        this.prev_mouseEnter = y+x;
        if(this.cells[y][x].status == 'close'){
          this.cells[y][x].status = 'open';
        }
        else if(this.cells[y][x].status == 'open'){
          this.cells[y][x].status = 'close';
        }
        this.mousePressed = true;        
        this.refreshGridworld();
      }
    }
  }

  mouseUpHandler(){   
    this.mousePressed = false;
    this.iswallClicked.emit(true);
  }

  resetGridworld(){
    this.cellcomponents.forEach((cmp: GridcellComponent) => {
        cmp.reset();
        cmp.runChangeDetector();
    });
  }

  clearGridWorld(){
    this.cellcomponents.forEach((cmp: GridcellComponent) => {
      cmp.reset();
      cmp.removeAllWall();
      cmp.runChangeDetector();
  });
  }


  DragStart(event:any,y:number,x:number) {
    if(this.cells[y][x].status != 'start' &&  this.cells[y][x].status != 'end'){
      event.preventDefault();
    }else{
      this.dragNode = [y,x];
      this.dragType = this.cells[y][x].status == 'start';
    }
  }

  dropEnd(event:any){
    event.preventDefault();
  }

  MouseUp(event:any, y:number, x:number){
    this.mousePressed = false;

    if(this.cells[y][x].status !!= 'end' && this.cells[y][x].status !!= 'start'){
      if(this.dragType){
        this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
        this.cells[y][x].status = 'start';
        this.dragged.emit([true,y,x]);
      }else{
        this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
        this.cells[y][x].status = 'end';
        this.dragged.emit([false,y,x])
      }
      event.preventDefault();
  }
  }

  DragCancel(event: Event , y:number, x:number) {
    if(this.dragNode[0] != y && this.dragNode[1] != x){
      // console.log("drag cancel", x,y, this.dragNode, this.dragType);
      if(this.cells[y][x].status == 'start' ||  this.cells[y][x].status == 'end'){
        event.preventDefault();
      }else{
        if(this.dragType){
          this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
          this.cells[y][x].status = 'start';
          this.dragNode = [y,x];
          this.dragType = this.cells[y][x].status == 'start';
          this.dragged.emit([true,y,x]);
        }else{
          this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
          this.cells[y][x].status = 'end';
          this.dragNode = [y,x];
          this.dragType = this.cells[y][x].status == 'start';
          this.dragged.emit([false,y,x])
        }
      }
    }
    event.preventDefault();
  }
  }


