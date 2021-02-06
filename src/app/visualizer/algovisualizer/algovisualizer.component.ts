import { Component, OnInit, ViewChild } from '@angular/core';
import { BFS } from 'src/app/algorithms/BFS';
import { DFS } from 'src/app/algorithms/DFS';
import { NavInfo } from 'src/app/models/navInfo';
import { Cell } from '../../models/cell';
import { GridcellComponent } from '../gridcell/gridcell.component';
import { GridworldComponent } from '../gridworld/gridworld.component';

@Component({
  selector: 'app-algovisualizer',
  templateUrl: './algovisualizer.component.html',
  styleUrls: ['./algovisualizer.component.css']
})
export class AlgovisualizerComponent implements OnInit {

  @ViewChild('grid') child!: GridworldComponent;

  sizeOfGrid:number[] = [20,50];
  bfs!: BFS;
  dfs!:DFS;

  cells:Cell[][] = [];
  isVisualizing:boolean = false;
  inProcess:boolean = false;


  navigation!:NavInfo;


  startNode:number[] = [0,9];
  endNode:number[] = [15,40];

  msg:string = "";
  
  constructor(){};

  ngOnInit(): void {
    for (let y =0; y<this.sizeOfGrid[0]; y++){
      this.cells[y] =[];
      for(let x=0; x<this.sizeOfGrid[1]; x++){
        this.cells[y][x] = new Cell();
      }
    }
    this.cells[this.startNode[0]][this.startNode[1]].status = 'start';
    this.cells[this.endNode[0]][this.endNode[1]].status ='end';

    this.bfs = new BFS(this.cells);
    this.dfs = new DFS(this.cells);
  }


// NavBar Functions
  infoFromNav(event:NavInfo){
    this.navigation = event;
    if(event.algorithm == "BFS"){
      this.runBFSPath();
    }else if(event.algorithm == "DFS"){      
      this.runDFSPath();
    }
  }

  resetEverything(event:boolean){
    this.isVisualizing = false;
    this.inProcess = false;
    let id = window.setTimeout(() => {}, 0);
    while (id) {            
      window.clearTimeout(id);
      id--;
    }

    if(event){   
      // Remove visualization not the walls
      this.child.resetGridworld();
    }else{
    //remove everything from gridworld, including walls
    // console.log("Reset Everything");
    this.child.clearGridWorld();
    }
  }
// _______________________________________________________

// Function runs when start and end node is dragged by user and refreshes the gridworld
  startOrEndDragged(event:any){
    if(event[0] == true){
      this.startNode = [event[1],event[2]];
      this.updateAfterDrag();
    }else{
      this.endNode = [event[1],event[2]];
      this.updateAfterDrag();
    }
  }

  // Update the gridworld after start or dragged is moved:
  // if path is already visualizing --> upadate everything at same time
  // if path is in process of visualizing --> start visualization process from begining
  // if no path is  visualizing --> reset everything
  updateAfterDrag(){
    if(this.isVisualizing == true){   

      if(this.navigation.algorithm == "BFS"){
        this.runBFSReset();
      }else if(this.navigation.algorithm == "DFS"){
        this.runDFSReset();
      }

    }else if(this.inProcess == true){
      this.resetEverything(true);
      let id = window.setTimeout(() => {
        if(this.navigation.algorithm == "BFS"){
          this.runBFSPath();
        }else if(this.navigation.algorithm == "DFS"){
          this.runDFSPath();
        }
      }, 100);
    }else{      
      this.resetEverything(true);
    }
  }

  //Provied path array it will simulate path on gridworld
  runPathSimulation(path:any[]){
    for (let i = 0; i < path.length; i++) {
      let p  = path[path.length-i-1];
      this.child.cellcomponents.forEach((cmp: GridcellComponent) => {
        if (cmp.cell == this.cells[p[0]][p[1]]) {                    
          setTimeout(() => {
            cmp.runChangeDetector();
          },this.navigation.algorithmSpeed * i);
        }
      });
    }
  }
  
  // when wall is created this function reset the grid world if path is not visualizing,
  // If path is visualizing then depending on algorithm type it update new path
  oniswallClicked(event: any){
    if(event == true){
      if(this.isVisualizing == true){
        if(this.navigation.algorithm == "BFS"){
          this.runBFSReset();
        }else if(this.navigation.algorithm == "DFS"){
          this.runDFSReset();
        }
      }
    }else{
      this.resetEverything(true);
    }
  }


// ******************************** BFS **************************************************

  runBFSPath(){
    this.inProcess = true;
    this.bfs.runBFS(this.cells, this.startNode, this.endNode);
    this.runBFSSimulation();

    let path = [];
    setTimeout(() => {
      if(this.bfs.isPathAvail == true){
        path = this.bfs.generatePath(this.startNode, this.endNode);
        this.runPathSimulation(path);
      }
    }, this.navigation.algorithmSpeed * (this.bfs.visited.length-1));

    setTimeout(() => {
      this.isVisualizing = true;
      this.inProcess = false;
    }, this.navigation.algorithmSpeed * (this.bfs.visited.length-1) + this.navigation.algorithmSpeed*(path.length-1));
  }

  runBFSSimulation(){
    for (let i = 0; i < this.bfs.visited.length; i++) {
      this.child.cellcomponents.forEach((cmp: GridcellComponent) => {
        var c = this.bfs.visited[i];
        if (cmp.cell == this.cells[c[0]][c[1]]) {                    
          setTimeout(() => {
            cmp.runChangeDetector();            
          }, this.navigation.algorithmSpeed * i);
        }
      });
    }
  }
  
  runBFSReset(){            
    let id = window.setTimeout(() => {}, 0);
    while (id) {
      window.clearTimeout(id);
      id--;
    }
    this.child.resetGridworld();
    

    this.bfs.runBFS(this.cells, this.startNode, this.endNode);
    if(this.bfs.isPathAvail == true){
      this.bfs.generatePath(this.startNode, this.endNode);
    }
    this.child.refreshGridworld();
  }

  // ******************************* DFS ****************************************************

  runDFSPath(){
    this.inProcess = true;
    this.dfs.runDFS(this.cells, this.startNode, this.endNode);
    this.runDFSSimulation();

    let path = [];
    setTimeout(() => {
      if(this.dfs.isPathAvail == true){
        path = this.dfs.generatePath(this.startNode, this.endNode);
        this.runPathSimulation(path);
      }
    }, this.navigation.algorithmSpeed * (this.dfs.visited.length-1));

    setTimeout(() => {
      this.isVisualizing = true;
      this.inProcess = false;
    }, this.navigation.algorithmSpeed * (this.dfs.visited.length-1) + this.navigation.algorithmSpeed*(path.length-1));
  }

  runDFSSimulation(){
    for (let i = 0; i < this.dfs.visited.length; i++) {
      this.child.cellcomponents.forEach((cmp: GridcellComponent) => {
        var c = this.dfs.visited[i];
        if (cmp.cell == this.cells[c[0]][c[1]]) {                    
          setTimeout(() => {
            cmp.runChangeDetector();            
          }, this.navigation.algorithmSpeed * i);
        }
      });
    }
  }

  runDFSReset(){            
    let id = window.setTimeout(() => {}, 0);
    while (id) {
      window.clearTimeout(id);
      id--;
    }
    this.child.resetGridworld();
    

    this.dfs.runDFS(this.cells, this.startNode, this.endNode);
    if(this.dfs.isPathAvail == true){
      this.dfs.generatePath(this.startNode, this.endNode);
    }
    this.child.refreshGridworld();
  }

  // ***************************** Dijkstra's algorithm ***********************************88






}
