export class Cell{
    status:'start'| 'end' | 'open' | 'close' | 'toll' | 'mid' = 'open';
    vertex_status: 'visited' | 'unvisited' | 'exploring' | 'current' | 'neighbors'| 'neighbors_end'|'path' | 'visited_start' | 'visited_goal' = 'unvisited';
    prev!:number[];
    dist!:number;
    weight:number = 1;

    // Variable for A* algorithm
    g!:number;
    h!:number;
    f!:number;

    g_goal!:number;
    h_goal!:number;
    prev_goal!:number[];


}