import { Cell } from "../models/cell";
import { NavInfo } from "../models/navInfo";
import { AlgoHelper } from "./algo-helper";

export class Astar{
    gridcells:Cell[][] = [];
    visited:any[] = [];
    navigation!:NavInfo;

    isPathAvail:boolean = false;
    
    constructor(){ 
    }

    // This Function assign h values to all cells
    // Iinput to this function is the location of goal node
    Manhattan_Distances(end:number[]){
        for(var i=0; i<this.gridcells.length; i++){
            for(var j=0; j<this.gridcells[0].length; j++){
                this.gridcells[i][j].h = (1+1/10000000)*(Math.abs(i-end[0])+Math.abs(j-end[1]));
            }
        }
    }

    Euclidean_Distance(end:number[]){
        for(var i=0; i<this.gridcells.length; i++){
            for(var j=0; j<this.gridcells[0].length; j++){
                var dx = (i-end[0]);
                var dy = (j-end[1]);
                this.gridcells[i][j].h = Math.sqrt((dx * dx) + (dy * dy));                
            }
        }
    }

    runAstar(cells:Cell[][], start:number[], end:number[], navinformation:NavInfo){
        this.gridcells = cells;
        this.navigation = navinformation;
        this.Manhattan_Distances(end);
        // this.Euclidean_Distance(end);
        this.isPathAvail = this.Astar_Path(start, end);
    }


    Astar_Path(start:number[], end:number[]){
        this.visited = [];
        let unvisited_neighbors = new Map()

        unvisited_neighbors.set(start, 0+this.gridcells[start[0]][start[1]].h);
        this.gridcells[start[0]][start[1]].g = 0;

        while(unvisited_neighbors.size != 0){
            var current = this.findMinDistanceNeighbor(unvisited_neighbors);

            var current_pt =  Object.values(current[0]);
            var current_val = Number(current[1]);

            if(this.gridcells[current_pt[0]][current_pt[1]].status == 'end'){                
                return true;
            }

            this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
            // var neighbors = this.findNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
            // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length); // <===============================
            // var neighbors = AlgoHelper.findNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length); // <===============================
            // var neighbors = AlgoHelper.findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length, this.gridcells,1.2);

            if(this.navigation.allowDiagonals){
                var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
            }else{
                var neighbors = AlgoHelper.findNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
            }

            while(neighbors.length != 0){
                var n = neighbors.shift();
                if(n){
                    // if(this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' && this.gridcells[n[0]][n[1]].status != 'close'){
                    if(this.gridcells[n[0]][n[1]].vertex_status != 'visited' && this.gridcells[n[0]][n[1]].status != 'close'){
                        // Check if it thas been added to neighbor's list before or not
                        if(this.gridcells[n[0]][n[1]].vertex_status == 'neighbors'){
                            //It is already in the list, so check previous distance and compare it with new distance
                            // If new distance is less, update it's previous node and distance                            
                            if(this.gridcells[n[0]][n[1]].g > this.gridcells[current_pt[0]][current_pt[1]].g+ this.gridcells[n[0]][n[1]].weight ){
                                this.gridcells[n[0]][n[1]].g = this.gridcells[current_pt[0]][current_pt[1]].g + this.gridcells[n[0]][n[1]].weight;
                                unvisited_neighbors.set(n, this.gridcells[n[0]][n[1]].g+this.gridcells[n[0]][n[1]].h); 
                                this.gridcells[n[0]][n[1]].prev = current_pt; 
                            }

                        }else{
                            // Brand new neighbor which has never been visited before
                            this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                            this.gridcells[n[0]][n[1]].g = this.gridcells[current_pt[0]][current_pt[1]].g + this.gridcells[n[0]][n[1]].weight;
                            unvisited_neighbors.set(n, this.gridcells[n[0]][n[1]].g+this.gridcells[n[0]][n[1]].h); 
                            this.gridcells[n[0]][n[1]].prev = current_pt; 
                        }
                    }
                }
            }

            this.visited.push(current_pt);
            this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited'; 
        }
        return false;
    }

    // Find min distace neighbor node and remove it from map and return it
    findMinDistanceNeighbor(unvisited_neighbors:Map<number[], number>){
        const values = Array.from( unvisited_neighbors.values() );
        const lowest = Math.min.apply(null, values);
        const keys = Array.from( unvisited_neighbors.keys() );
        const indexOfLowest = values.findIndex(function (x) { return x === lowest });
        unvisited_neighbors.delete(keys[indexOfLowest]);
        return [keys[indexOfLowest], lowest];
    }


    generatePath(start:number[], end:number[]){
        var path = [];

        var prev = this.gridcells[end[0]][end[1]].prev;
        while(!(prev[0]==start[0] && prev[1]==start[1])){
            path.push(prev);
            this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
            prev = this.gridcells[prev[0]][prev[1]].prev;
        }
        return path;
    }
}