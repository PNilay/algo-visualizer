import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Randompatterns } from 'src/app/algorithms/maze_and_pattern_Algorithms/random-patterns';
import { RecursiveDivisionMaze } from 'src/app/algorithms/maze_and_pattern_Algorithms/recursive-division-maze';
import { Cell } from '../../models/cell';
import { GridcellComponent } from '../gridcell/gridcell.component';
// import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-gridworld',
  templateUrl: './gridworld.component.html',
  styleUrls: ['./gridworld.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class GridworldComponent implements OnInit {

  @Input() inProcess:boolean = false;
  @Input() cells:Cell[][] = [];
  @Input() toll!:number;

  @Output() iswallClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() dragged: EventEmitter<any> = new EventEmitter();

  @ViewChildren('cell') cellcomponents!: QueryList<any>;

  mousePressed:boolean = false;
  leftOrRight:boolean = false; //left button clicked == false, right button ==> true
  prev_mouseEnter!:number;

  dragNode!:number[];
  dragType!:boolean; //True == Start, False == End

  drag_touch:boolean = false;

  // window_width:number = window.innerWidth;


  screenWidth!:number;
  cell_width:number = 10;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void{ 
    if(window.innerWidth < 450){
      this.cell_width = 2 *(85/this.cells[0].length);
    }else{
      this.cell_width = 85/this.cells[0].length;
    }    
  };


  onResize(event:any) {
    this.screenWidth = event.target.screen.availWidth;
    this.grid_sizeChange();
    // console.log("cell width: ", this.cell_width , this.cells[0].length, this.screenWidth);
  };

  grid_sizeChange(){
    if(this.screenWidth < 450){
      this.cell_width = 2 *(85/this.cells[0].length);
    }else{
      this.cell_width = 85/this.cells[0].length;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.grid_sizeChange();    
  }

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

  onRightClick(){
    return false;
  }
  mouseEnterHandler(y:number,x:number){        
    if(this.mousePressed &&  !this.inProcess){
      if(this.prev_mouseEnter != y+x){ 
        if(this.leftOrRight){          
          //right button pressed
          if(this.cells[y][x].status == 'open' || this.cells[y][x].status == 'close'){             
            this.cells[y][x].status = 'toll';
            // this.cells[y][x].weight = 10;
            this.cells[y][x].weight = this.toll;
            this.prev_mouseEnter = y+x;
            this.refreshGridworld();
            return;
          }else if(this.cells[y][x].status == 'toll'){    
            this.cells[y][x].status = 'open';
            this.cells[y][x].weight = 1;
            this.prev_mouseEnter = y+x;
            this.refreshGridworld();
            return;
          }
        }else{
          if(this.cells[y][x].status == 'open' || this.cells[y][x].status == 'toll'){ 
            this.cells[y][x].status = 'close';
            this.cells[y][x].weight = 1;
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
  }

  // Left button --> Create wall
  // right button --> Create toll
  mouseDownHandler(event:any, y:number,x:number){
    if(!this.inProcess){
      if(this.cells[y][x].status != 'start' && this.cells[y][x].status != 'end' ){
        this.prev_mouseEnter = y+x;

        if(event.button == 0){
          // console.log('Left Clicked');
          this.leftOrRight = false;
          if(this.cells[y][x].status == 'close'){
            this.cells[y][x].status = 'open';
          }
          else if(this.cells[y][x].status == 'open' || this.cells[y][x].status == 'toll'){
            this.cells[y][x].weight = 1;
            this.cells[y][x].status = 'close';
          }
        }else{
          // console.log("Right Click");
          this.leftOrRight = true;
          if(this.cells[y][x].status == 'toll'){
            this.cells[y][x].weight = 1;
            this.cells[y][x].status = 'open';
          }
          else{

            // console.log("Toll : ", this.toll);
            // this.generateRandomPatterns();
            this.cells[y][x].status = 'toll';
            // this.cells[y][x].weight = 10;
            this.cells[y][x].weight = this.toll;
          }
        }
        this.mousePressed = true;        
        this.refreshGridworld();

      }
    }
    
  }

  mouseUpHandler(){   
    this.mousePressed = false;
    this.leftOrRight = false;
    this.drag_touch = false;
    this.iswallClicked.emit(true);
  }

  resetGridworld(){
    this.cellcomponents.forEach((cmp: GridcellComponent) => {
        cmp.reset();
        cmp.removeMid();
        cmp.runChangeDetector();
    });
  }

  clearGridWorld(){
    this.cellcomponents.forEach((cmp: GridcellComponent) => {
      cmp.reset();
      cmp.removeMid();
      cmp.removeAllWall();
      cmp.removeAllTolls();
      cmp.runChangeDetector();
  });
  }


  DragStart(event:any,y:number,x:number) {    
    if(this.cells[y][x].status != 'start' &&  this.cells[y][x].status != 'end'){
      event.preventDefault();
    }else{
      this.dragNode = [y,x];
      this.dragType = this.cells[y][x].status == 'start';
      // console.log("Drag Start at : ",y,x);
      
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

  DragCancel(event: DragEvent , y:number, x:number) {
    // console.log("event-- ", event);
    // console.log("eelement frorm point,",document.elementFromPoint(event.clientX, event.clientY)?.parentElement);
    
    if(this.dragNode[0] != y && this.dragNode[1] != x){
      // console.log("drag cancel", x,y, this.dragNode, this.dragType);
      if(this.cells[y][x].status == 'start' ||  this.cells[y][x].status == 'end'){
        event.preventDefault();
      }else{
        if(this.dragType){
          this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
          this.cells[y][x].status = 'start';
          this.dragNode = [y,x];
          this.dragType = true;
          this.dragged.emit([true,y,x]);
        }else{
          this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
          this.cells[y][x].status = 'end';
          this.dragNode = [y,x];
          this.dragType = false;
          this.dragged.emit([false,y,x])
        }
      }
    }
    event.preventDefault();
  }


  createWall(index:number[]){    
    if(this.cells[index[0]][index[1]].status != 'start' &&  this.cells[index[0]][index[1]].status != 'end'){
      if(this.cells[index[0]][index[1]].status == 'open'){
        this.cells[index[0]][index[1]].status = 'close';
      }else{
        this.cells[index[0]][index[1]].status = 'open';
      }
    }
  }

  delay(value:number[]) {
    setTimeout(() => {
      this.createWall(value);
      this.cellcomponents.forEach((cmp: GridcellComponent) => {
        if (cmp.cell == this.cells[value[0]][value[1]]) {                    
            cmp.runChangeDetector();            
        }
      });
    }, 1000);
  }


  generateRandomPatterns(){
    Randompatterns.generateRandomPattern(this.cells);
    
    // var queue: number[][] = [];
    // var rd = new RecursiveDivisionMaze();
    // rd.RecursiveDivision(this.cells, [0,0], [this.cells.length-1,this.cells[0].length-1], 0, queue);
    // for(var i =0;i<queue.length; i++){
    //   var value = queue[i];
    //   if(value){
    //     this.delay(value);
    //   }
    // }
    
  }

  generateRecursiveDivisionMaze(orientation:number){
    var queue: number[][] = [];
    var rd = new RecursiveDivisionMaze();
    rd.RecursiveDivision(this.cells, [0,0], [this.cells.length-1,this.cells[0].length-1], orientation, queue);
    for(var i =0;i<queue.length; i++){
      var value = queue[i];
      if(value){
        this.delay(value);
      }
    }
  }


  touchStart(event:any, y:number,x:number){
    // console.log("touch start::  ", y,x);
    // console.log("touch start", event);
    
    if(!this.inProcess){
      if(this.cells[y][x].status != 'start' && this.cells[y][x].status != 'end' ){
        this.prev_mouseEnter = y+x;

        this.leftOrRight = false;
        if(this.cells[y][x].status == 'close'){
          this.cells[y][x].status = 'open';
        }
        else if(this.cells[y][x].status == 'open' || this.cells[y][x].status == 'toll'){
          this.cells[y][x].weight = 1;
          this.cells[y][x].status = 'close';
        }
          
        this.mousePressed = true;        
        this.refreshGridworld();

      }else{
        // drag start on touch
        this.dragNode = [y,x];
        this.dragType = this.cells[y][x].status == 'start';
        this.drag_touch = true;
        // console.log("Drag Start at : ",y,x);
      }
    }
  }


  touchEnd(event:any, y:number,x:number){
    // console.log("touch end::  ", y,x);
    // console.log("touch end", event);

    if(this.drag_touch){
      var myLocation = event.changedTouches[0];
      var x_and_y = document.elementFromPoint(myLocation.clientX, myLocation.clientY)?.parentElement?.id;
  
      if(x_and_y != '' && x_and_y != undefined){
        var arr = x_and_y.split(',')
        y = parseInt(arr[0]);
        x = parseInt(arr[1]);
        this.dragTouchMouseUp(y, x);
      }
      this.mouseUpHandler();
    }else{
      this.mouseUpHandler();
    }

    if (event.cancelable) {
      event.preventDefault();
   }

    // event.preventDefault();
  }

  touchCancel(event:any, y:number,x:number){
    // console.log("touch cancel::  ", y,x);
    // console.log("touch cancel", event);

    event.preventDefault();
  }
  touchMove(event:any, y_in:number,x_in:number){
    // console.log("touch move::  ", y_in,x_in);
    // console.log("touch move", event);

    var myLocation = event.changedTouches[0];
    // console.log("my location ", myLocation);
    // console.log("my location ", myLocation.clientX);

    // console.log("elment from move ",document.elementFromPoint(myLocation.clientX, myLocation.clientY)?.parentElement?.id);

    var x_and_y = document.elementFromPoint(myLocation.clientX, myLocation.clientY)?.parentElement?.id;

    if(x_and_y != '' && x_and_y != undefined){
      var arr = x_and_y.split(',')
      var y = parseInt(arr[0]);
      var x = parseInt(arr[1]);

      // console.log("x and y ", y, x);

      if(this.drag_touch){
        this.dragTouchMove(y,x);
      }else{
        if(this.mousePressed &&  !this.inProcess){
          // console.log("mouse pressed and not tin prrcess", x_and_y);

          // console.log(x_and_y.split(','));
          // var arr = x_and_y.split(',')
          // var y = parseInt(arr[0]);
          // var x = parseInt(arr[1]);

          // console.log("x and y ", y, x);
          
          
          if(this.prev_mouseEnter != y+x){ 
            if(this.cells[y][x].status == 'open' || this.cells[y][x].status == 'toll'){ 
              this.cells[y][x].status = 'close';
              this.cells[y][x].weight = 1;
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

    }
  }




  dragTouchMove(y:number, x:number) {
    if(this.dragNode[0] != y && this.dragNode[1] != x){
      if(this.cells[y][x].status != 'start' ||  this.cells[y][x].status != 'end'){
        if(this.dragType){
          this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
          this.cells[y][x].status = 'start';
          this.dragNode = [y,x];
          this.dragType = true;
          this.dragged.emit([true,y,x]);
        }else{
          this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
          this.cells[y][x].status = 'end';
          this.dragNode = [y,x];
          this.dragType = false;
          this.dragged.emit([false,y,x])
        }
      }
    }
  }

  dragTouchMouseUp(y:number, x:number){    
    this.mousePressed = false;
    this.drag_touch = false;

    if(this.cells[y][x].status != 'end' && this.cells[y][x].status != 'start'){
      if(this.dragType){
        this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
        this.cells[y][x].status = 'start';
        this.dragged.emit([true,y,x]);
      }else{
        this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
        this.cells[y][x].status = 'end';
        this.dragged.emit([false,y,x])
      }
    }
  }

  }


