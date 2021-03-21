import { Cell } from "src/app/models/cell";


// https://medium.com/analytics-vidhya/maze-generations-algorithms-and-visualizations-9f5e88a3ae37
export class RecursiveDivisionMaze {
    gridcells:Cell[][] = [];

    createBorder(cells:Cell[][]){

    }

    randomInteger(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }


    // RecursiveDivision function divides the portion of blank canvas to create maze
    // cells: it is an 2D array of gidworld's each cell
    // start: it is a topmost point of the protion of gridworld
    // end: bottom most point
    // orientation: represent the orientataion of maze to created
    //      -1: vertically oriented
    //       0: mixed (vertically and horizontally)
    //       1: Horizontally oriented
    RecursiveDivision(cells:Cell[][], start:number[], end:number[], orientation:number, queue:number[][]){    
        if(end[0]-start[0] < 2 || end[1]-start[1] < 2){
            return;
        }

        // Horizontal recursive division maze ===============================================
        if(orientation == 1){
            var horizontal_index = this.randomInteger(start[0]+1, end[0]-1);

            for(var i =start[1]; i<=end[1]; i++){
                // cells[horizontal_index][i].status = "close";
                queue.push([horizontal_index, i]);
            }
            var open_idx = this.randomInteger(start[1], end[1]);
            // cells[horizontal_index][open_idx].status = "open";
            queue.push([horizontal_index, open_idx]);


            open_idx = this.randomInteger(start[1], end[1]);
            // cells[horizontal_index][open_idx].status = "open";
            queue.push([horizontal_index, open_idx]);

            this.RecursiveDivision(cells,start, [horizontal_index-1,end[1]], orientation,queue);
            this.RecursiveDivision(cells, [horizontal_index+1, start[1]], end, orientation, queue);

        }else if(orientation == -1){
            // Verticle recursive division maze =============================================
            var verticle_index = this.randomInteger(start[1]+1, end[1]-1);

            for(var i =start[0]; i<=end[0]; i++){
                // cells[i][verticle_index].status = "close";
                queue.push([i, verticle_index]);
            }

            var open_idx = this.randomInteger(start[0], end[0]);
            // cells[open_idx][verticle_index].status = "open";
            queue.push([open_idx, verticle_index]);




            this.RecursiveDivision(cells,start, [end[0], verticle_index-1], orientation, queue);
            this.RecursiveDivision(cells, [start[0], verticle_index+1], end, orientation, queue);
        }else{
            // Mixed Horizontal and verticle division maze ==============================================

            var horizontal_or_verticle = this.randomInteger(0, 1);
            if(horizontal_or_verticle == 0){
                // Horizontal division
                var horizontal_index = this.randomInteger(start[0]+1, end[0]-1);

                for(var i =start[1]; i<=end[1]; i++){
                    // cells[horizontal_index][i].status = "close";
                    queue.push([horizontal_index, i]);
                }

                var open_idx = this.randomInteger(start[1], end[1]);
                // cells[horizontal_index][open_idx].status = "open";
                queue.push([horizontal_index, open_idx]);


                open_idx = this.randomInteger(start[1], end[1]);
                // cells[horizontal_index][open_idx].status = "open";
                queue.push([horizontal_index, open_idx]);

                this.RecursiveDivision(cells,start, [horizontal_index-1,end[1]], orientation,queue);
                this.RecursiveDivision(cells, [horizontal_index+1, start[1]], end, orientation, queue);
            }else{
                // verticle division
                var verticle_index = this.randomInteger(start[1]+1, end[1]-1);

                for(var i =start[0]; i<=end[0]; i++){
                    // cells[i][verticle_index].status = "close";
                    queue.push([i, verticle_index]);
                }

                var open_idx = this.randomInteger(start[0], end[0]);
                // cells[open_idx][verticle_index].status = "open";
                queue.push([open_idx, verticle_index]);




                this.RecursiveDivision(cells,start, [end[0], verticle_index-1], orientation, queue);
                this.RecursiveDivision(cells, [start[0], verticle_index+1], end, orientation, queue);
            }
        }
    }
}
