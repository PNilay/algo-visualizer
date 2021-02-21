import { Component, OnInit, ViewChild } from '@angular/core';
import { Astar } from 'src/app/algorithms/a-star';
import { BFS } from 'src/app/algorithms/BFS';
import { DFS } from 'src/app/algorithms/DFS';
import { Dijksta } from 'src/app/algorithms/Dijkstra';
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

  sizeOfGrid:number[] = [30,60];
  bfs!: BFS;
  dfs!:DFS;
  dijksta!:Dijksta;
  astar!:Astar;

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

    this.bfs = new BFS();
    this.dfs = new DFS();
    this.dijksta = new Dijksta();
    this.astar = new Astar();

  }

  ChangeGridSize(event:number){
    console.log("Change Grid Size");
    this.cells = [];

    this.sizeOfGrid = [event,2*event];

    this.startNode = [0,1];
    this.endNode = [5,5];

    for (let y =0; y<this.sizeOfGrid[0]; y++){
      this.cells[y] =[];
      for(let x=0; x<this.sizeOfGrid[1]; x++){
        this.cells[y][x] = new Cell();
      }
    }
    this.cells[this.startNode[0]][this.startNode[1]].status = 'start';
    this.cells[this.endNode[0]][this.endNode[1]].status ='end';

    this.resetEverything(false);
    
  }


// NavBar Functions
  infoFromNav(event:NavInfo){
    this.navigation = event;
    if(event.algorithm == "BFS"){
      this.runBFSPath();
    }else if(event.algorithm == "DFS"){      
      this.runDFSPath();
    }else if(event.algorithm == "Dijkstra"){
      this.runDijkstraPath();
    }else if(event.algorithm == "A* algorithm"){
      this.runAstarPath();
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


// new reset visualizer function to just stop visualizing for just few seconds and start over
// Drag and drop when visulaization is in process
resetDragDropVisualizer(event:boolean){
  this.isVisualizing = false;
  // this.inProcess = false;
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
      }else if(this.navigation.algorithm == "Dijkstra"){
        this.runDijkstaReset();
      }else if(this.navigation.algorithm == "A* algorithm"){
        this.runAstarReset();
      }

    }else if(this.inProcess == true){
      // this.resetEverything(true);
      this.resetDragDropVisualizer(true);
      let id = window.setTimeout(() => {
        if(this.navigation.algorithm == "BFS"){
          this.runBFSPath();
        }else if(this.navigation.algorithm == "DFS"){
          this.runDFSPath();
        }else if(this.navigation.algorithm == "Dijkstra"){
          this.runDijkstraPath();
        }else if(this.navigation.algorithm == "A* algorithm"){
          this.runAstarPath();
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
        }else if(this.navigation.algorithm == "Dijkstra"){
          this.runDijkstaReset();
        }else if(this.navigation.algorithm == "A* algorithm"){
          this.runAstarReset();
        }
      }
    }else{
      this.resetEverything(true);
    }
  }


// ******************************** BFS **************************************************

  runBFSPath(){
    this.inProcess = true;
    this.bfs.runBFS(this.cells, this.startNode, this.endNode, this.navigation);
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
    

    this.bfs.runBFS(this.cells, this.startNode, this.endNode, this.navigation);
    if(this.bfs.isPathAvail == true){
      this.bfs.generatePath(this.startNode, this.endNode);
    }
    this.child.refreshGridworld();
  }

  // ******************************* DFS ****************************************************

  runDFSPath(){
    this.inProcess = true;
    this.dfs.runDFS(this.cells, this.startNode, this.endNode, this.navigation);
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
    

    this.dfs.runDFS(this.cells, this.startNode, this.endNode, this.navigation);
    if(this.dfs.isPathAvail == true){
      this.dfs.generatePath(this.startNode, this.endNode);
    }
    this.child.refreshGridworld();
  }

  // ***************************** Dijkstra's algorithm ***********************************88

  runDijkstraPath(){
    this.inProcess = true;    
    this.dijksta.runDijksta(this.cells, this.startNode, this.endNode, this.navigation);
    this.runDijkstaSimulation();

    let path = [];
    setTimeout(() => {
      if(this.dijksta.isPathAvail == true){
        path = this.dijksta.generatePath(this.startNode, this.endNode);
        this.runPathSimulation(path);
      }
    }, this.navigation.algorithmSpeed * (this.dijksta.visited.length-1));

    setTimeout(() => {
      this.isVisualizing = true;
      this.inProcess = false;
    }, this.navigation.algorithmSpeed * (this.dijksta.visited.length-1) + this.navigation.algorithmSpeed*(path.length-1));
  }

  runDijkstaSimulation(){
    for (let i = 0; i < this.dijksta.visited.length; i++) {
      this.child.cellcomponents.forEach((cmp: GridcellComponent) => {
        var c = this.dijksta.visited[i];
        if (cmp.cell == this.cells[c[0]][c[1]]) {                    
          setTimeout(() => {
            cmp.runChangeDetector();            
          }, this.navigation.algorithmSpeed * i);
        }
      });
    }
  }

  runDijkstaReset(){            
    let id = window.setTimeout(() => {}, 0);
    while (id) {
      window.clearTimeout(id);
      id--;
    }
    this.child.resetGridworld();
    

    this.dijksta.runDijksta(this.cells, this.startNode, this.endNode, this.navigation);
    if(this.dijksta.isPathAvail == true){
      this.dijksta.generatePath(this.startNode, this.endNode);
    }
    this.child.refreshGridworld();
  }

  // ***************************** A* Algorithm ****************************************


  runAstarPath(){
    this.inProcess = true;    
    this.astar.runAstar(this.cells, this.startNode, this.endNode, this.navigation);
    this.runAstarSimulation();

    let path = [];
    setTimeout(() => {
      if(this.astar.isPathAvail == true){
        path = this.astar.generatePath(this.startNode, this.endNode);
        this.runPathSimulation(path);
      }
    }, this.navigation.algorithmSpeed * (this.astar.visited.length-1));

    setTimeout(() => {
      this.isVisualizing = true;
      this.inProcess = false;
    }, this.navigation.algorithmSpeed * (this.astar.visited.length-1) + this.navigation.algorithmSpeed*(path.length-1));
  }

  runAstarSimulation(){
    for (let i = 0; i < this.astar.visited.length; i++) {
      this.child.cellcomponents.forEach((cmp: GridcellComponent) => {
        var c = this.astar.visited[i];
        if (cmp.cell == this.cells[c[0]][c[1]]) {                    
          setTimeout(() => {
            cmp.runChangeDetector();            
          }, this.navigation.algorithmSpeed * i);
        }
      });
    }
  }

  runAstarReset(){            
    let id = window.setTimeout(() => {}, 0);
    while (id) {
      window.clearTimeout(id);
      id--;
    }
    this.child.resetGridworld();
    

    this.astar.runAstar(this.cells, this.startNode, this.endNode, this.navigation);
    if(this.astar.isPathAvail == true){
      this.astar.generatePath(this.startNode, this.endNode);
    }
    this.child.refreshGridworld();
  }
}
