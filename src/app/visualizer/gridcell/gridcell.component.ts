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
  // @Input('toll_weight') toll_weight!: number;

  bri:string = 'brightness(130%)';
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

  getFilterIntensity(){
    if(this.cell.status == 'toll' && this.cell.vertex_status != 'path'){
      var intensity  = 130 - (this.cell.weight);
      return 'brightness('+intensity+'%)';
      
      // return "brightness("+intensity+"%)";
      // [style.background-color]="getFilterIntensity()"
    }
    return 'brightness(130%)';
  }

}
