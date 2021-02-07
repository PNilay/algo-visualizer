import { Cell } from "../models/cell";

export class Dijksta{

    gridcells:Cell[][] = [];

    visited:any[] = [];
    // unvisited_neighbors:any[] =[];

    isPathAvail:boolean = false;
    
    constructor(cells:Cell[][]){ 
        this.gridcells = cells;
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

    runDijksta(cells:Cell[][], start:number[], end:number[]){
        this.gridcells = cells;
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
            var neighbors = this.findNeighbors(current_pt[0], current_pt[1],20,50); // <===============================
            
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


    // // initialize initial distance as large number forr 
    // initalizeDistance(){

    // }
    findNeighbors(x:number, y:number, width:number, height:number){
       var neighbor = []      
       if((x>0 && y > 0) && (x<width-1 && y <height-1)){
            var leftX = (x - 1 + width) % width;
            var rightX = (x + 1) % width;
            var aboveY = (y - 1 + height) % height;
            var belowY = (y + 1) % height;

            neighbor.push([rightX, y]);
            neighbor.push([leftX, y]);
            neighbor.push([x,aboveY]);
            neighbor.push([x,belowY]);
       }else{
        if(x-1 >= 0){
            var leftX = (x - 1 + width) % width;
            neighbor.push([leftX, y]);
        }
        if(x+1< width){
            var rightX = (x + 1) % width;
            neighbor.push([rightX, y]);
        }
        if(y - 1 >= 0){
            var aboveY = (y - 1 + height) % height;
            neighbor.push([x,aboveY]);
        }
        if(y+1 < height){
            var belowY = (y + 1) % height;
            neighbor.push([x, belowY]);
        }
       }
        return neighbor;
    }

}