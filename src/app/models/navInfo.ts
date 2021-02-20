export class NavInfo{
    algorithm:string = '';
    algorithmSpeed!:number;
    allowBidirection:boolean = false;
    allowDiagonals:boolean = false;
    heuristics:'manhattan'| 'euclidean' | 'octile' | 'chebyshev'  = 'manhattan';
}