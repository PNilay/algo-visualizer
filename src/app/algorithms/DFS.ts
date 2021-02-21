import { Cell } from "../models/cell";
import { NavInfo } from "../models/navInfo";
import { AlgoHelper } from "./algo-helper";

export class DFS{

    gridcells:Cell[][] = [];
    visited:any[] = [];
    isPathAvail:boolean = false;
    navigation!:NavInfo;

    start_mid:number[] =[];
    end_mid:number[] =[];

    constructor(){ 
    }

    runDFS(cells:Cell[][], start:number[], end:number[], navinformation:NavInfo){
        this.gridcells = cells;
        this.navigation = navinformation;
        // this.isPathAvail = this.DFS_Path(start, end);   
        
        if(this.navigation.allowBidirection){
            this.start_mid = [];
            this.end_mid = [];

            this.isPathAvail = this.DFS_Bidirection_Path(start, end);
        }else{
            this.isPathAvail = this.DFS_Path(start, end);
        }


    }

    generatePath(start:number[], end:number[]){
        // var path = [];

        // var prev = this.gridcells[end[0]][end[1]].prev;
        // while(!(prev[0]==start[0] && prev[1]==start[1])){
        //     path.push(prev);
        //     this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
        //     prev = this.gridcells[prev[0]][prev[1]].prev;
        // }
        // return path;

        var path = [];

        if(this.navigation.allowBidirection){            
            var prev = this.start_mid;
            while(!(prev[0]==start[0] && prev[1]==start[1])){
                path.push(prev);
                this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
                prev = this.gridcells[prev[0]][prev[1]].prev;
            }

            prev = this.end_mid;
            while(!(prev[0]==end[0] && prev[1]==end[1])){
                path.push(prev);
                this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
                prev = this.gridcells[prev[0]][prev[1]].prev;
            }
        }else{
            var prev = this.gridcells[end[0]][end[1]].prev;
            while(!(prev[0]==start[0] && prev[1]==start[1])){
                path.push(prev);
                this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
                prev = this.gridcells[prev[0]][prev[1]].prev;
            }
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


    DFS_Bidirection_Path(start:number[], end:number[]){
        this.visited = [];
        var q_start = [];
        q_start.push(start);
       
        var q_goal = [];
        q_goal.push(end);

        while(q_start.length != 0 && q_goal.length != 0){            
            if(q_start.length != 0){
                var current = q_start.pop();
                if(current){
                    if(this.gridcells[current[0]][current[1]].status == 'end' || this.gridcells[current[0]][current[1]].vertex_status == 'visited_goal'){
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
                            if((this.gridcells[n[0]][n[1]].vertex_status == 'unvisited'|| this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal' ) && this.gridcells[n[0]][n[1]].status != 'close'){
                                if(this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal'){

                                    this.visited.push(current);
                                    this.gridcells[current[0]][current[1]].vertex_status = 'visited_start';

                                    this.start_mid = current;
                                    this.end_mid = n;

                                    if(this.gridcells[n[0]][n[1]].status != 'start' && this.gridcells[n[0]][n[1]].status != 'end'){
                                        this.gridcells[n[0]][n[1]].status = 'mid';
                                        this.gridcells[n[0]][n[1]].vertex_status='unvisited';
                                    }
                                    return true;
                                }
                                this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                                q_start.push(n);
                                this.gridcells[n[0]][n[1]].prev = current; 
                            }                        
                        } 
                    } 
                    this.visited.push(current);
                    this.gridcells[current[0]][current[1]].vertex_status = 'visited_start'; 

                    // console.log("If visited included in current or not ",  this.visited.includes(current));
                    
                }
            }else{
                throw new Error('Current node is undefined');
            }            
            if(q_goal.length != 0){
                var current = q_goal.pop();
                if(current){
                    if(this.gridcells[current[0]][current[1]].status == 'start' ||  this.gridcells[current[0]][current[1]].vertex_status == 'visited_start'){
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
                            if((this.gridcells[n[0]][n[1]].vertex_status == 'unvisited'|| this.gridcells[n[0]][n[1]].vertex_status == 'neighbors' ||  this.gridcells[n[0]][n[1]].vertex_status == 'visited_start' )&& this.gridcells[n[0]][n[1]].status != 'close'){
                                if(this.gridcells[n[0]][n[1]].vertex_status == 'visited_start'){
                                    this.visited.push(current);
                                    this.gridcells[current[0]][current[1]].vertex_status = 'visited_goal'; 


                                    this.start_mid = n;
                                    this.end_mid = current;
                                    
                                    if(this.gridcells[n[0]][n[1]].status != 'start' && this.gridcells[n[0]][n[1]].status != 'end'){
                                        this.gridcells[n[0]][n[1]].status = 'mid';
                                        this.gridcells[n[0]][n[1]].vertex_status='unvisited';
                                    }
                                    
                                    return true;
                                }
                                this.gridcells[n[0]][n[1]].vertex_status = 'neighbors_end';
                                q_goal.push(n);
                                this.gridcells[n[0]][n[1]].prev = current; 
                            }                        
                        } 
                    } 
                    this.visited.push(current);
                    this.gridcells[current[0]][current[1]].vertex_status = 'visited_goal'; 
                }
            }else{
                throw new Error('Current node is undefined');
            }
        }

        return false;
    }
}