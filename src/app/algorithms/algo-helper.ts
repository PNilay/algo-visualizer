import { Cell } from "../models/cell";

export class AlgoHelper{

    // This finction only allows left, right, top and bottom
    static findNeighbors(x:number, y:number, width:number, height:number){
        var neighbor = []      
        if((x>0 && y > 0) && (x<width-1 && y <height-1)){
                var leftX = (x - 1 + width) % width;
                var rightX = (x + 1) % width;
                var aboveY = (y - 1 + height) % height;
                var belowY = (y + 1) % height;

                // neighbor.push([rightX, y]);
                // neighbor.push([leftX, y]);
                // neighbor.push([x,aboveY]);
                // neighbor.push([x,belowY]);


                neighbor.push([x,aboveY]);
                neighbor.push([rightX, y]);
                neighbor.push([x,belowY]);
                neighbor.push([leftX, y]);

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
    // find all neighbors allow diagonal
    static findAllNeighbors(x:number, y:number, width:number, height:number){
    var neighbor = []      
    if((x>0 && y > 0) && (x<width-1 && y <height-1)){
            var leftX = (x - 1 + width) % width;
            var rightX = (x + 1) % width;
            var aboveY = (y - 1 + height) % height;
            var belowY = (y + 1) % height;


            // neighbor.push([rightX, aboveY]);
            // neighbor.push([rightX, belowY]);
            // neighbor.push([leftX, belowY]);
            // neighbor.push([leftX, aboveY]);

            neighbor.push([x,aboveY]);
            neighbor.push([rightX, y]);
            neighbor.push([x,belowY]);
            neighbor.push([leftX, y]);

            neighbor.push([leftX, aboveY]);
            neighbor.push([rightX, aboveY]);
            neighbor.push([rightX, belowY]);
            neighbor.push([leftX, belowY]);
            // neighbor.push([leftX, aboveY]);


    }else{
        var l = false;
        var r = false;
        var t = false;
        var b = false;


        if(y - 1 >= 0){
            var aboveY = (y - 1 + height) % height;
            neighbor.push([x,aboveY]);
            t = true;
        }
        if(x+1< width){
            var rightX = (x + 1) % width;
            neighbor.push([rightX, y]);
            r = true;
        }
        if(y+1 < height){
            var belowY = (y + 1) % height;
            neighbor.push([x, belowY]);
            b = true;
        }
        if(x-1 >= 0){
            var leftX = (x - 1 + width) % width;
            neighbor.push([leftX, y]);
            l = true;
        }


        if(t){
        var aboveY = (y - 1 + height) % height;
            if(l){
            var leftX = (x - 1 + width) % width;
            neighbor.push([leftX, aboveY]);
            }
            if(r){
            var rightX = (x + 1) % width;
            neighbor.push([rightX, aboveY]);
            }
        }

        if(b){
        var belowY = (y + 1) % height;
            if(r){
            var rightX = (x + 1) % width;
            neighbor.push([rightX, belowY]);
            }
            if(l){
                var leftX = (x - 1 + width) % width;
                neighbor.push([leftX, belowY]);
            }
        }

    }
        return neighbor;
    }

    // find all neighbors allow diagonal
    static findAllNeighborsWithWeightedDiagonals(x:number, y:number, width:number, height:number, cells:Cell[][],  diagonalWeight:number){
        var neighbor = []      
        if((x>0 && y > 0) && (x<width-1 && y <height-1)){
                var leftX = (x - 1 + width) % width;
                var rightX = (x + 1) % width;
                var aboveY = (y - 1 + height) % height;
                var belowY = (y + 1) % height;
    
    
                // neighbor.push([rightX, aboveY]);
                // neighbor.push([rightX, belowY]);
                // neighbor.push([leftX, belowY]);
                // neighbor.push([leftX, aboveY]);
    
                neighbor.push([x,aboveY]);
                if(cells[x][aboveY].status != 'toll'){
                    cells[x][aboveY].weight = 1;
                }
                neighbor.push([rightX, y]);
                if(cells[rightX][y].status != 'toll'){
                    cells[rightX][y].weight = 1;
                }
                neighbor.push([x,belowY]);
                if(cells[x][belowY].status != 'toll'){
                    cells[x][belowY].weight = 1;
                }

                neighbor.push([leftX, y]);
                if(cells[leftX][y].status != 'toll'){
                    cells[leftX][y].weight = 1;
                }






                neighbor.push([leftX, aboveY]);
                if(cells[leftX][aboveY].status != 'toll'){
                    cells[leftX][aboveY].weight = diagonalWeight;
                }

                neighbor.push([rightX, aboveY]);
                if(cells[rightX][aboveY].status != 'toll'){
                    cells[rightX][aboveY].weight = diagonalWeight;
                }

                neighbor.push([rightX, belowY]);
                if(cells[rightX][belowY].status != 'toll'){
                    cells[rightX][belowY].weight = diagonalWeight;
                }

                neighbor.push([leftX, belowY]);
                if(cells[leftX][belowY].status != 'toll'){
                    cells[leftX][belowY].weight = diagonalWeight;
                }
    
    
        }else{
            var l = false;
            var r = false;
            var t = false;
            var b = false;
    
    
            if(y - 1 >= 0){
                var aboveY = (y - 1 + height) % height;
                neighbor.push([x,aboveY]);
                if(cells[x][aboveY].status != 'toll'){
                    cells[x][aboveY].weight = 1;
                }
                t = true;
            }
            if(x+1< width){
                var rightX = (x + 1) % width;
                neighbor.push([rightX, y]);
                if(cells[rightX][y].status != 'toll'){
                    cells[rightX][y].weight = 1;
                }
                r = true;
            }
            if(y+1 < height){
                var belowY = (y + 1) % height;
                neighbor.push([x, belowY]);
                if(cells[x][belowY].status != 'toll'){
                    cells[x][belowY].weight = 1;
                }
                b = true;
            }
            if(x-1 >= 0){
                var leftX = (x - 1 + width) % width;
                neighbor.push([leftX, y]);
                if(cells[leftX][y].status != 'toll'){
                    cells[leftX][y].weight = 1;
                }
                l = true;
            }
    
    
            if(t){
            var aboveY = (y - 1 + height) % height;
                if(l){
                    var leftX = (x - 1 + width) % width;
                    neighbor.push([leftX, aboveY]);
                    
                    if(cells[leftX][aboveY].status != 'toll'){
                        cells[leftX][aboveY].weight = diagonalWeight;
                    }
                }
                if(r){
                    var rightX = (x + 1) % width;
                    neighbor.push([rightX, aboveY]);

                    if(cells[rightX][aboveY].status != 'toll'){
                        cells[rightX][aboveY].weight = diagonalWeight;
                    }
                }
            }
    
            if(b){
            var belowY = (y + 1) % height;
                if(r){
                    var rightX = (x + 1) % width;
                    neighbor.push([rightX, belowY]);

                    if(cells[rightX][belowY].status != 'toll'){
                        cells[rightX][belowY].weight = diagonalWeight;
                    }
                }
                if(l){
                    var leftX = (x - 1 + width) % width;
                    neighbor.push([leftX, belowY]);

                    if(cells[leftX][belowY].status != 'toll'){
                        cells[leftX][belowY].weight = diagonalWeight;
                    }
                }
            }
    
        }
            return neighbor;
    }

    

}