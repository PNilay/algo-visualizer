import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Cell } from '../../models/cell';

@Component({
  selector: 'app-gridcell',
  templateUrl: './gridcell.component.html',
  styleUrls: ['./gridcell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridcellComponent implements OnInit{

  @Input('cell') cell!: Cell;
  isdraggable:boolean = false;
  
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {

    if(this.cell.status == "start" || this.cell.status == "end"){
      this.isdraggable = true;      
    }
  }

  runChangeDetector() {
    this.ref.markForCheck();
  }

  reset(){
    this.cell.vertex_status = 'unvisited';
  }

  removeMid(){
    if(this.cell.status == 'mid'){
      this.cell.status = 'open';
    }
  }
  removeAllWall(){
    if(this.cell.status == 'close'){
      this.cell.status = 'open';
    }
  }

  removeAllTolls(){
    if(this.cell.status == 'toll'){
      this.cell.status = 'open';
      this.cell.weight = 1;
    }
  }

}
