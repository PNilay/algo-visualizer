export class Cell{
    status:'start'| 'end' | 'open' | 'close' | 'toll' = 'open';
    vertex_status: 'visited' | 'unvisited' | 'exploring' | 'current' | 'neighbors'|'path' = 'unvisited';
    prev!:number[];
    dist!:number;
    weight:number = 1;

    // Variable for A* algorithm
    g!:number;
    h!:number;
    f!:number;
}