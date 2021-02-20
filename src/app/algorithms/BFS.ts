import { Cell } from "../models/cell";
import { NavInfo } from "../models/navInfo";
import { AlgoHelper } from "./algo-helper";

export class BFS{

    gridcells:Cell[][] = [];
    visited:any[] = [];
    isPathAvail:boolean = false;
    navigation!:NavInfo;
    

    constructor(){ 
    }

    runBFS(cells:Cell[][], start:number[], end:number[] , navinformation:NavInfo){
        this.gridcells = cells;
        this.navigation = navinformation;
        this.isPathAvail = this.BFS_Path(start, end);
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

    BFS_Path(start:number[], end:number[]){
        var q = [];
        this.visited = [];
        q.push(start);
        while(q.length!= 0){
            var current = q.shift();

            if(current){
                if(this.gridcells[current[0]][current[1]].status == 'end'){
                    return true;
                }
                this.gridcells[current[0]][current[1]].vertex_status = 'current';
                
                if(this.navigation.allowDiagonals){
                    var neighbors = AlgoHelper.findAllNeighbors(current[0], current[1],this.gridcells.length,this.gridcells[0].length);
                }else{
                    var neighbors = AlgoHelper.findNeighbors(current[0], current[1],this.gridcells.length,this.gridcells[0].length);
                }

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
}