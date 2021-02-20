import { Cell } from "../models/cell";
import { NavInfo } from "../models/navInfo";
import { AlgoHelper } from "./algo-helper";

export class Dijksta{
    gridcells:Cell[][] = [];
    visited:any[] = [];
    navigation!:NavInfo;
    isPathAvail:boolean = false;
    constructor(){ 
    }

    setDistance(point:number[], val:number){
        this.gridcells[point[0]][point[1]].dist = val;
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

    runDijksta(cells:Cell[][], start:number[], end:number[], navinformation:NavInfo){
        this.gridcells = cells;
        this.navigation = navinformation;
        this.isPathAvail = this.Dijksta_Path(start, end);
    }

    Dijksta_Path(start:number[], end:number[]){
        this.visited = []
        let unvisited_neighbors = new Map()

        unvisited_neighbors.set(start, 0);
        
        while(unvisited_neighbors.size != 0){
            var current = this.findMinDistanceNeighbor(unvisited_neighbors);

            var current_pt =  Object.values(current[0]);
            var current_val = Number(current[1]);

            if(this.gridcells[current_pt[0]][current_pt[1]].status == 'end'){                
                return true;
            }
            this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
            if(this.navigation.allowDiagonals){
                var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
            }else{
                var neighbors = AlgoHelper.findNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
            }


            while(neighbors.length != 0){
                var n = neighbors.shift();
                if(n){
                    if(this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' && this.gridcells[n[0]][n[1]].status != 'close'){
                        
                        // Check if it thas been added to neighbor's list before or not
                        if(this.gridcells[n[0]][n[1]].vertex_status == 'neighbors'){
                            //It is already in the list, so check previous distance and compare it with new distance
                            // If new distance is less, update it's previous node and distance
                            let old_dist = Number(unvisited_neighbors.get(n));
                            if(current_val+this.gridcells[n[0]][n[1]].weight < old_dist){
                                unvisited_neighbors.set(n, current_val+this.gridcells[n[0]][n[1]].weight);
                                this.gridcells[n[0]][n[1]].prev = current_pt; 
                            }

                        }else{
                            // Brand new neighbor which has never been visited before
                            this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                            unvisited_neighbors.set(n, current_val+this.gridcells[n[0]][n[1]].weight); 
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