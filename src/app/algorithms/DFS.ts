import { Cell } from "../models/cell";

export class DFS{

    gridcells:Cell[][] = [];
    visited:any[] = [];
    isPathAvail:boolean = false;
    

    constructor(cells:Cell[][]){ 
        this.gridcells = cells;
    }

    runDFS(cells:Cell[][], start:number[], end:number[]){
        this.gridcells = cells;
        this.isPathAvail = this.DFS_Path(start, end);
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

    DFS_Path(start:number[], end:number[]){
        var q = [];
        this.visited = [];
        q.push(start);
        while(q.length!= 0){
            var current = q.pop();

            if(current){
                if(this.gridcells[current[0]][current[1]].status == 'end'){
                    return true;
                }
                this.gridcells[current[0]][current[1]].vertex_status = 'current';
                var neighbors = this.findNeighbors(current[0], current[1],20,50);
                while(neighbors.length != 0){
                    var n = neighbors.shift();
                    if(n){
                        if(this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' && this.gridcells[n[0]][n[1]].status != 'close'){
                            this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';                        
                            q.push(n);
                            this.gridcells[n[0]][n[1]].prev = current; 
                        }                        
                    } 
                } 
                this.visited.push(current);
                this.gridcells[current[0]][current[1]].vertex_status = 'visited'; 
            }else{
                throw new Error('Current node is undefined');
            }
        }
        return false;

    }


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