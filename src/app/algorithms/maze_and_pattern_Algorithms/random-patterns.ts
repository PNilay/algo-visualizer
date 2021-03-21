//searches all nodes through dfs
//starts at p1's start node which is denoted by 'S'
//30% chance of marking the visited node as blocked
//visited statuses are kept under node.visitState where 'U' marks unvisited and 'V' marks visited
//For now, X's denote blockages and O's denoted open spaces

import { Cell } from "../../models/cell";

export class Randompatterns{

    static getRandom(){
        var num=Math.random();
        if(num < 0.3) return true;  //probability 0.3, create wall
        else return false; // probability 0.7 leave empty
    }

    static generateRandomPattern(cells:Cell[][]) {
        for (let y =0; y<cells.length; y++){
          for(let x=0; x<cells[0].length; x++){
              if(cells[y][x].status != 'start' && cells[y][x].status != 'end' ){
                  if(Randompatterns.getRandom()){
                    cells[y][x].status = 'close';
                  }
              }
          }
        }
    }
}












