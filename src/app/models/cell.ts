export class Cell{
    status:'start'| 'end' | 'open' | 'close' = 'open';
    vertex_status: 'visited' | 'unvisited' | 'exploring' | 'current' | 'neighbors'|'path' = 'unvisited';
    prev!:number[];
    dist!:number;
}