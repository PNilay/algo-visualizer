import { Cell } from "../models/cell";
import { NavInfo } from "../models/navInfo";
import { AlgoHelper } from "./algo-helper";

export class Dijksta{
    gridcells:Cell[][] = [];
    visited:any[] = [];
    navigation!:NavInfo;
    isPathAvail:boolean = false;
    start_mid: number[] = [];
    end_mid: number[] = [];

    diagonal_weight:number = 1;
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

    runDijksta(cells:Cell[][], start:number[], end:number[], navinformation:NavInfo, diagonal_weight:number){
        this.gridcells = cells;
        this.navigation = navinformation;
        this.diagonal_weight =  diagonal_weight;

        if(this.navigation.allowBidirection){
            
            this.start_mid = [];
            this.end_mid = [];

            this.isPathAvail = this.Dijksta_Bidirection_Path(start, end);
            this.gridcells = AlgoHelper.resetDiagonalWeights(this.gridcells);
        }else{
            this.isPathAvail = this.Dijksta_Path(start, end);
            this.gridcells = AlgoHelper.resetDiagonalWeights(this.gridcells);
        }

        // this.isPathAvail = this.Dijksta_Path(start, end);
    }

    Dijksta_Path(start:number[], end:number[]){
        this.visited = []
        let unvisited_neighbors = new Map()

        unvisited_neighbors.set(start.toString(), 0);        
        
        while(unvisited_neighbors.size != 0){
            var current = this.findMinDistanceNeighbor(unvisited_neighbors);

            // var current_pt =  Object.values(current[0]);
            var current_pt =  (current[0].toString()).split(',').map(Number);

            
            var current_val = Number(current[1]);

            if(this.gridcells[current_pt[0]][current_pt[1]].status == 'end'){                                
                return true;
            }
            this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
            if(this.navigation.allowDiagonals){
                // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);                
                var neighbors = AlgoHelper.findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length, this.gridcells,  this.diagonal_weight);

            }else{
                var neighbors = AlgoHelper.findNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
            }


            while(neighbors.length != 0){
                var n = neighbors.shift();
                if(n){
                    if(this.gridcells[n[0]][n[1]].status != 'close'){
                        
                        // Check if it thas been added to neighbor's list before or not
                        if(this.gridcells[n[0]][n[1]].vertex_status == 'neighbors'){                            
                            //It is already in the list, so check previous distance and compare it with new distance
                            // If new distance is less, update it's previous node and distance                       
                            
                            // let old_dist = Number(unvisited_neighbors.get(n));
                            let old_dist = unvisited_neighbors.get(n.toString());

                            if(current_val+this.gridcells[n[0]][n[1]].weight < old_dist){
                                unvisited_neighbors.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight);                                
                                this.gridcells[n[0]][n[1]].prev = current_pt; 
                            }

                        }else if(this.gridcells[n[0]][n[1]].vertex_status == 'unvisited'){
                            // Brand new neighbor which has never been visited before
                            this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                            unvisited_neighbors.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight); 
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

    // generatePath(start:number[], end:number[]){
    //     // var path = [];

    //     // var prev = this.gridcells[end[0]][end[1]].prev;
    //     // while(!(prev[0]==start[0] && prev[1]==start[1])){
    //     //     path.push(prev);
    //     //     this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
    //     //     prev = this.gridcells[prev[0]][prev[1]].prev;
    //     // }
    //     // return path;


    //     var path = [];

    //     if(this.navigation.allowBidirection){            
    //         var prev = this.start_mid;
    //         while(!(prev[0]==start[0] && prev[1]==start[1])){
    //             path.push(prev);
    //             this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
    //             prev = this.gridcells[prev[0]][prev[1]].prev;
    //         }

    //         prev = this.end_mid;
    //         while(!(prev[0]==end[0] && prev[1]==end[1])){
    //             path.push(prev);
    //             this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
    //             prev = this.gridcells[prev[0]][prev[1]].prev;
    //         }
    //     }else{
    //         var prev = this.gridcells[end[0]][end[1]].prev;
    //         while(!(prev[0]==start[0] && prev[1]==start[1])){
    //             path.push(prev);
    //             this.gridcells[prev[0]][prev[1]].vertex_status = 'path';
    //             prev = this.gridcells[prev[0]][prev[1]].prev;
    //         }
    //     }
    //     return path;
    // }

    generatePath(start:number[], end:number[]){
        if(this.navigation.allowBidirection){
            return AlgoHelper.generateWeightedBidirectionPath(start, end, this.gridcells, this.start_mid, this.end_mid);
        }else{
            return AlgoHelper.generatePath(start, end, this.gridcells);
        }
    }


    Dijksta_Bidirection_Path(start:number[], end:number[]){
        
        this.visited = []

        let unvisited_neighbors = new Map();
        unvisited_neighbors.set(start.toString(), 0);

        let unvisited_neighbors_goal = new Map();
        unvisited_neighbors_goal.set(end.toString(), 0);

        while(unvisited_neighbors.size != 0 && unvisited_neighbors_goal.size != 0){
            
            if(unvisited_neighbors.size != 0){
                
                var current = this.findMinDistanceNeighbor(unvisited_neighbors);

                // var current_pt =  Object.values(current[0]);
                var current_pt = (current[0].toString()).split(',').map(Number);
                var current_val = Number(current[1]);

                if(this.gridcells[current_pt[0]][current_pt[1]].status == 'end'){                
                    return true;
                }

                if(this.gridcells[current_pt[0]][current_pt[1]].vertex_status == 'visited_goal'){
                    this.visited.push(current_pt);
                    this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_start'; 

                    this.start_mid = current_pt;
                    this.end_mid = current_pt;

                    if(this.gridcells[current_pt[0]][current_pt[1]].status != 'start' && this.gridcells[current_pt[0]][current_pt[1]].status != 'end'){
                        this.gridcells[current_pt[0]][current_pt[1]].status = 'mid';
                        this.gridcells[current_pt[0]][current_pt[1]].vertex_status='unvisited';
                    }

                    return true;
                }



                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';

                if(this.navigation.allowDiagonals){
                    // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                    var neighbors = AlgoHelper.findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length, this.gridcells,  this.diagonal_weight);
                }else{
                    var neighbors = AlgoHelper.findNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                }


                while(neighbors.length != 0){                    
                    var n = neighbors.shift();
                    if(n){
                        if((this.gridcells[n[0]][n[1]].vertex_status == 'neighbors' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end'  ||this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal') && this.gridcells[n[0]][n[1]].status != 'close'){
                            // Check if it thas been added to neighbor's list before or not
                            if(this.gridcells[n[0]][n[1]].vertex_status == 'neighbors'){
                                //It is already in the list, so check previous distance and compare it with new distance
                                // If new distance is less, update it's previous node and distance

                                // let old_dist = Number(unvisited_neighbors.get(n));
                                let old_dist = Number(unvisited_neighbors.get(n.toString()));

                                if(current_val+this.gridcells[n[0]][n[1]].weight < old_dist){
                                    unvisited_neighbors.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight);
                                    this.gridcells[n[0]][n[1]].prev = current_pt; 
                                }
    
                            }else if(this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end'){
                                // Brand new neighbor which has been visited before from goal and also might be visited from start
                                if(unvisited_neighbors.has(n.toString())){
                                    let old_dist = Number(unvisited_neighbors.get(n.toString()));

                                    if(current_val+this.gridcells[n[0]][n[1]].weight < old_dist){
                                        unvisited_neighbors.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight);
                                        this.gridcells[n[0]][n[1]].prev = current_pt; 
                                    }
                                }else{
                                    unvisited_neighbors.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight); 
                                    this.gridcells[n[0]][n[1]].prev = current_pt; 
                                }

                            }else{
                                // Brand new neighbor which has never been visited before from either start or goal
                                // if(this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal'){
                                //     this.visited.push(current_pt);
                                //     this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_start'; 

                                //     this.start_mid = current_pt;
                                //     this.end_mid = n;

                                //     if(this.gridcells[n[0]][n[1]].status != 'start' && this.gridcells[n[0]][n[1]].status != 'end'){
                                //         this.gridcells[n[0]][n[1]].status = 'mid';
                                //         this.gridcells[n[0]][n[1]].vertex_status='unvisited';
                                //     }

                                //     return true;
                                // }

                                this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                                unvisited_neighbors.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight); 
                                this.gridcells[n[0]][n[1]].prev = current_pt; 
                            }
                        }                        
                    } 
                } 

                this.visited.push(current_pt);
                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_start'; 
            }
            // ======================================================================================================================

            if(unvisited_neighbors_goal.size != 0){
                var current = this.findMinDistanceNeighbor(unvisited_neighbors_goal);

                // var current_pt =  Object.values(current[0]);
                var current_pt =  (current[0].toString()).split(',').map(Number);
                var current_val = Number(current[1]);

                if(this.gridcells[current_pt[0]][current_pt[1]].status == 'start'){                
                    return true;
                }

                if(this.gridcells[current_pt[0]][current_pt[1]].vertex_status == 'visited_start'){
                    this.visited.push(current_pt);
                    this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_goal'; 

                    this.start_mid = current_pt;
                    this.end_mid = current_pt;

                    if(this.gridcells[current_pt[0]][current_pt[1]].status != 'start' && this.gridcells[current_pt[0]][current_pt[1]].status != 'end'){
                        this.gridcells[current_pt[0]][current_pt[1]].status = 'mid';
                        this.gridcells[current_pt[0]][current_pt[1]].vertex_status='unvisited';
                    }

                    return true;
                    
                }




                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
                if(this.navigation.allowDiagonals){

                    var neighbors = AlgoHelper.findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length, this.gridcells,  this.diagonal_weight);

                    // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                }else{
                    var neighbors = AlgoHelper.findNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                }


                while(neighbors.length != 0){
                    var n = neighbors.shift();
                    if(n){
                        if((this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end' ||this.gridcells[n[0]][n[1]].vertex_status == 'neighbors'||this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_start') && this.gridcells[n[0]][n[1]].status != 'close'){
                            
                            // Check if it thas been added to neighbor's list before or not
                            if(this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end'){
                                //It is already in the list, so check previous distance and compare it with new distance
                                // If new distance is less, update it's previous node and distance
                                let old_dist = Number(unvisited_neighbors_goal.get(n.toString()));
                                if(current_val+this.gridcells[n[0]][n[1]].weight < old_dist){
                                    unvisited_neighbors_goal.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight);
                                    this.gridcells[n[0]][n[1]].prev_goal = current_pt; 
                                }
    
                            }else if(this.gridcells[n[0]][n[1]].vertex_status == 'visited_start' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors' ){
                                    // Brand new neighbor which has been visited before from goal and also might be visited from start
                                    if(unvisited_neighbors_goal.has(n.toString())){
                                        let old_dist = Number(unvisited_neighbors_goal.get(n.toString()));
    
                                        if(current_val+this.gridcells[n[0]][n[1]].weight < old_dist){
                                            unvisited_neighbors_goal.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight);
                                            this.gridcells[n[0]][n[1]].prev_goal = current_pt; 
                                        }
                                    }else{
                                        unvisited_neighbors_goal.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight);
                                        this.gridcells[n[0]][n[1]].prev_goal = current_pt;  
                                    }
                            }else{
                                // Brand new neighbor which has never been visited before
                                // if(this.gridcells[n[0]][n[1]].vertex_status == 'visited_start'){
                                //     this.visited.push(current_pt);
                                //     this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_goal'; 

                                //     this.start_mid = n;
                                //     this.end_mid = current_pt;

                                //     if(this.gridcells[n[0]][n[1]].status != 'start' && this.gridcells[n[0]][n[1]].status != 'end'){
                                //         this.gridcells[n[0]][n[1]].status = 'mid';
                                //         this.gridcells[n[0]][n[1]].vertex_status='unvisited';
                                //     }

                                //     return true;
                                    
                                // }
                                this.gridcells[n[0]][n[1]].vertex_status = 'neighbors_end';
                                unvisited_neighbors_goal.set(n.toString(), current_val+this.gridcells[n[0]][n[1]].weight); 
                                this.gridcells[n[0]][n[1]].prev_goal = current_pt; 
                            }
                        }                        
                    } 
                } 

                this.visited.push(current_pt);
                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_goal'; 
            }

        }
        
        return false;

    }



}