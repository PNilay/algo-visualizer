import { Component, OnInit, ViewChild } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { NotificationsService, Options } from 'angular2-notifications';
import { Astar } from 'src/app/algorithms/a-star';
import { BFS } from 'src/app/algorithms/BFS';
import { DFS } from 'src/app/algorithms/DFS';
import { Dijksta } from 'src/app/algorithms/Dijkstra';
import { NavInfo } from 'src/app/models/navInfo';
import { Cell } from '../../models/cell';
import { GridcellComponent } from '../gridcell/gridcell.component';
import { GridworldComponent } from '../gridworld/gridworld.component';
import { WalkthrouhTutorialComponent } from '../walkthrouh-tutorial/walkthrouh-tutorial.component';

@Component({
  selector: 'app-algovisualizer',
  templateUrl: './algovisualizer.component.html',
  styleUrls: ['./algovisualizer.component.css']
})
export class AlgovisualizerComponent implements OnInit {

  @ViewChild('grid') child!: GridworldComponent;

  isWalkthrough:boolean = false;

  sizeOfGrid:number[] = [30,60];
  bfs!: BFS;
  dfs!:DFS;
  dijksta!:Dijksta;
  astar!:Astar;

  cells:Cell[][] = [];
  isVisualizing:boolean = false;
  inProcess:boolean = false;


  navigation!:NavInfo;
  diagonal_weight!:number;
  toll_weight!:number;

  is_touch_toll:boolean=false;

  startNode:number[] = [15,10];
  endNode:number[] = [15,50];

  options:Options = {
    position: ["top", "left"],
    // lastOnBottom: true,
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    preventDuplicates: true
}
  
  constructor(private shepherdService: ShepherdService, private notificationService:NotificationsService){};

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

   // this.shapherds_tour();

    // if(window.innerWidth>700 && window.innerHeight>500){
    //   this.shepherdService.start();
    // }
    //// this.shepherdService.start();

    this.isWalkthrough = true;





    
  }

  onSuccess(){
    this.notificationService.success('Item created!', 'Click to undo...', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
  noPath(){
    this.notificationService.remove();
    this.notificationService.error('No Path', 'Path not available between start and end node', {
      timeOut: 5000
    });
  }

  // availPath(){
  //   this.notificationService.remove();
  // }

  // resetWalkthrough(event:any){
  //   this.isWalkthrough = event;
  // }

  resetWalkthrough(event:any){
    console.log("walkthrough reset", event);
    this.isWalkthrough = event;
  }

  ChangeGridSize(event:number){
    console.log("Change Grid Size");
    this.cells = [];

    this.sizeOfGrid = [event,2*event];

    
    // this.startNode = [this.randomInteger(0,event-1),this.randomInteger(0,(2*event)-1)];
    // this.endNode = [(this.startNode[0]+1)%event ,this.randomInteger(0,(2*event)-1)];

    this.startNode = [Math.floor(event/2),Math.floor((event*2)*.20)];
    this.endNode = [Math.floor(event/2),2*event - Math.floor(((event*2)*.20))];

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

  randomInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// NavBar Functions
  infoFromNav(event:NavInfo){
    if(event.algorithm != "Algorithms"){
      this.navigation = event;
      if(event.algorithm == "BFS"){
        // this.generateRandomPatterns();
        // console.log("Run Sucess");
        
        this.runBFSPath();
      }else if(event.algorithm == "DFS"){      
        this.runDFSPath();
      }else if(event.algorithm == "Dijkstra"){
        this.runDijkstraPath();
      }else if(event.algorithm == "A* algorithm"){
        this.runAstarPath();
      }
    }else{
      this.notificationService.warn('Select Algorithm', 'select algorithm to visualize');
    }
  }

  changeTouchSetting(event:boolean){
    console.log("algovisualizer touch screen", event);
    
    this.is_touch_toll = event;
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

  changeWeightValues(event:number[]){
    this.diagonal_weight = event[0];
    this.toll_weight = event[1];
    // console.log("Change Weght Values", event);
    
  }

  change_mazes_pattern(event:string){
    if(event == 'isWalkthrough'){
      // this.shepherdService.start();
      this.isWalkthrough = true;
    }else if(event == 'Random Pattern'){
      this.child.generateRandomPatterns();
    }else if(event == 'Recursive Division'){
      this.child.generateRecursiveDivisionMaze(0);
    }else if(event == 'Recursive Division (Verticle skew)'){
      this.child.generateRecursiveDivisionMaze(-1);
    }else if(event == 'Recursive Division (Horizontal skew)'){
      this.child.generateRecursiveDivisionMaze(1);
    }
  }

  generateRandomPatterns(){
    for (let y =0; y<this.sizeOfGrid[0]; y++){
      for(let x=0; x<this.sizeOfGrid[1]; x++){
        this.cells[y][x].status = 'close';
      }
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
        this.notificationService.remove();
        path = this.bfs.generatePath(this.startNode, this.endNode);
        this.runPathSimulation(path);
      }else{
        this.noPath();
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
      this.notificationService.remove();
      this.bfs.generatePath(this.startNode, this.endNode);
    }else{
      this.noPath();
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
        this.notificationService.remove();
        path = this.dfs.generatePath(this.startNode, this.endNode);
        this.runPathSimulation(path);
      }else{
        this.noPath();
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
      this.notificationService.remove();
      this.dfs.generatePath(this.startNode, this.endNode);
    }else{
      this.noPath();
    }
    this.child.refreshGridworld();
  }

  // ***************************** Dijkstra's algorithm ***********************************88

  runDijkstraPath(){
    this.inProcess = true;    
    this.dijksta.runDijksta(this.cells, this.startNode, this.endNode, this.navigation , this.diagonal_weight);
    this.runDijkstaSimulation();

    let path = [];
    setTimeout(() => {
      if(this.dijksta.isPathAvail == true){
        this.notificationService.remove();
        path = this.dijksta.generatePath(this.startNode, this.endNode);
        this.runPathSimulation(path);
      }else{
        this.noPath();
      }
    }, this.navigation.algorithmSpeed * (this.dijksta.visited.length-1));

    setTimeout(() => {
      this.isVisualizing = true;
      this.inProcess = false;
    }, this.navigation.algorithmSpeed * (this.dijksta.visited.length-1) + this.navigation.algorithmSpeed*(path.length-1));
  }

  runDijkstaSimulation(){
    // console.log("Visited length: ", this.dijksta.visited.length);
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
    

    this.dijksta.runDijksta(this.cells, this.startNode, this.endNode, this.navigation, this.diagonal_weight);
    if(this.dijksta.isPathAvail == true){
      this.notificationService.remove();
      this.dijksta.generatePath(this.startNode, this.endNode);
    }else{
      this.noPath();
    }
    this.child.refreshGridworld();
  }

  // ***************************** A* Algorithm ****************************************


  runAstarPath(){
    this.inProcess = true;    
    this.astar.runAstar(this.cells, this.startNode, this.endNode, this.navigation, this.diagonal_weight);
    this.runAstarSimulation();

    let path = [];
    setTimeout(() => {
      if(this.astar.isPathAvail == true){
        this.notificationService.remove();
        path = this.astar.generatePath(this.startNode, this.endNode);
        this.runPathSimulation(path);
      }else{
        this.noPath();
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
    

    this.astar.runAstar(this.cells, this.startNode, this.endNode, this.navigation, this.diagonal_weight);
    if(this.astar.isPathAvail == true){
      this.notificationService.remove();
      this.astar.generatePath(this.startNode, this.endNode);
    }else{
      this.noPath();
    }
    this.child.refreshGridworld();
  }

  shapherds_tour(){

    var color_representation = `
    <h5>Color in grid represents type of Node/Block. Here are the mapping of each color with it\'s portrayal. </h5>
        <div class="main_color_rep" style="margin-top:20px;">
        <div class="start_node" style="height: 50px;">
            <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #ff005f; margin-left: 10px;"></div>
            <div class="statr_txt" style="float: left; margin-left: 5px;">Start Node</div>

            <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: green; margin-left: 80px;"></div>
            <div class="statr_txt" style="float: left; margin-left: 5px;">Gole Node</div>
        </div>


        <div class="start_node" style="height: 50px;">
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #000347; margin-left: 10px;"></div>
          <div class="statr_txt" style="float: left; margin-left: 5px;">Blocked/Wall Node</div>

          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: rgb(230, 120, 120); margin-left: 20px;"></div>
          <div class="statr_txt" style="float: left; margin-left: 5px;"v>Toll Node</div>
        </div>


        <div class="start_node" style="height: 50px;">
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: white; margin-left: 10px;"></div>
          <div class="statr_txt" style="float: left; margin-left: 5px;">Unvisitd Node</div>

          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: dodgerblue; margin-left: 55px;"></div>
          <div class="statr_txt" style="float: left; margin-left: 5px;">Path Node</div>
        </div>

        <div class="start_node" style="height: 50px;">
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #ffd300; margin-left: 10px;"></div>
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #00ffb6; margin-left: 10px;"></div>
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #cc00ff; margin-left: 10px;"></div>

          <div class="statr_txt" style="float: left; margin-left: 5px;">Visited Nodes</div>
        </div>
    </div>
    `;

    this.shepherdService.defaultStepOptions = {
      scrollTo: true,
      cancelIcon: {
        enabled: true
      }
    };
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps([
    {
      id: 'step0',
      title: '<h1><strong><code>Algo Visualizer</code></strong></h1>',
      text: ['<h5><strong>A fun way to visualize algorithms</strong></h5> <h6> Welcome, Let Have a walkthrough of this tool </h6>',
      // color_representation,
      '<img src="assets/Visualization_Intro.gif" width="100%" height="50%">'  
    ],
      
      classes: 'example-step-extra-class',
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ]
    },
    {
      id: 'step1',
      text: '<h6> Click on this <code>Algo Visualizer</code>, to get the walkthrough tutorial anytime </h6>',
      attachTo: {
        element: '.navhome'
      },
      classes: 'example-step-extra-class',
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ]
    },
    {
      id: 'step2',
      text: ['<h6>Use these navbar dropdowns and options to select algorithms, grid size, create patterns/mazes and many more </h6>'],
      title: '<h3><strong><code>Algorithms and Options</code></strong></h3>',
      attachTo: {
        element: '.navbar-nav'
        // on: 'bottom'
      },
      classes: 'example-step-extra-class',
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ]
    },
    {
      id: 'step3',
      text: ['<h6>Use these buttons to visualize algorithm, clear visualization and reset/remove grid blocks</h6>'],
      title: '<h3><strong><code>Visualiztion Buttons</code></strong></h3>',
      attachTo: {
        element: '.btn_navbar'
      },
      classes: 'example-step-extra-class',
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ]
    },
    {
      id: 'step4',
      text: [color_representation],
      title: '<h3><strong><code>Colors and It\'s <br> Representations</code></strong></h3>',

      classes: 'example-step-extra-class',
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ]
    },
    {
      id: 'step5',
      text: [`<h5>Left click on cell to to create blocked node and right click to crate toll nodes.<h5> 
              <h6>Walls or Blocked nodes are impssible to pass through, 
              therfore path between start and gole node can not pass through them. 
              <div style="margin-top:8px; margin-bottom:8px">
                Unlike Wall nodes, Toll nodes allows path to pass through them,
                but it a charge extra cost for permission to use a particular node.
              </div>
                Cost of toll node can be set under Options dropdown menu in navbar. 
                Five is selected as default cost for toll node. 
                change toll weight before creating toll block in grid to reflect thoes changes in for toll. 
               </h6> 
              <img src="assets/toll_block.gif" width="80%" height="40%">`],
      title: '<h3><strong><code>Wall and Toll Blocks</code></strong></h3>',

      classes: 'example-step-extra-class',
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ]
    },
    {
      id: 'step6',
      text: ['<div style="margin-bottom:20px;"><h5>Left click on Start or Goal cells and drag to move them and see the instant path change between them. </h5></div> <img src="assets/drag_drop.gif" width="100%" height="50%">'
            ],
      title: '<h3><strong><code>Drag and Drop</code></strong></h3>',

      classes: 'example-step-extra-class',
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'End',
          type: 'cancel'
        }
      ]
    }
  
  
  ]);
  }
}
