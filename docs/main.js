(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/nilay/Documents/Side Projects/algo-visualizer/src/main.ts */"zUnb");


/***/ }),

/***/ "1Jg+":
/*!**************************************!*\
  !*** ./src/app/algorithms/a-star.ts ***!
  \**************************************/
/*! exports provided: Astar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Astar", function() { return Astar; });
/* harmony import */ var _algo_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./algo-helper */ "Y3ol");

class Astar {
    constructor() {
        this.gridcells = [];
        this.visited = [];
        this.isPathAvail = false;
        this.start_mid = [];
        this.end_mid = [];
        this.diagonal_weight = 1;
    }
    // This Function assign h values to all cells
    // Iinput to this function is the location of goal node
    Manhattan_Distances(end) {
        for (var i = 0; i < this.gridcells.length; i++) {
            for (var j = 0; j < this.gridcells[0].length; j++) {
                this.gridcells[i][j].h = (1 + 1 / 10000000) * (Math.abs(i - end[0]) + Math.abs(j - end[1]));
            }
        }
    }
    Manhattan_Distances_goal(end) {
        for (var i = 0; i < this.gridcells.length; i++) {
            for (var j = 0; j < this.gridcells[0].length; j++) {
                this.gridcells[i][j].h_goal = (1 + 1 / 10000000) * (Math.abs(i - end[0]) + Math.abs(j - end[1]));
            }
        }
    }
    Euclidean_Distance_goal(end) {
        for (var i = 0; i < this.gridcells.length; i++) {
            for (var j = 0; j < this.gridcells[0].length; j++) {
                var dx = (i - end[0]);
                var dy = (j - end[1]);
                this.gridcells[i][j].h_goal = Math.sqrt((dx * dx) + (dy * dy));
            }
        }
    }
    Euclidean_Distance(end) {
        for (var i = 0; i < this.gridcells.length; i++) {
            for (var j = 0; j < this.gridcells[0].length; j++) {
                var dx = (i - end[0]);
                var dy = (j - end[1]);
                this.gridcells[i][j].h = Math.sqrt((dx * dx) + (dy * dy));
            }
        }
    }
    runAstar(cells, start, end, navinformation, diagonal_weight) {
        this.gridcells = cells;
        this.navigation = navinformation;
        this.diagonal_weight = diagonal_weight;
        if (this.navigation.heuristics == 'euclidean') {
            this.Euclidean_Distance(end);
            this.Euclidean_Distance_goal(start);
        }
        else {
            this.Manhattan_Distances(end);
            this.Manhattan_Distances_goal(start);
        }
        // this.Manhattan_Distances(end);
        // this.Euclidean_Distance(end);
        // this.isPathAvail = this.Astar_Path(start, end);
        if (this.navigation.allowBidirection) {
            this.start_mid = [];
            this.end_mid = [];
            this.isPathAvail = this.Astar_Bidirection_Path(start, end);
            this.gridcells = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].resetDiagonalWeights(this.gridcells);
        }
        else {
            this.isPathAvail = this.Astar_Path(start, end);
            this.gridcells = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].resetDiagonalWeights(this.gridcells);
        }
    }
    Astar_Path(start, end) {
        this.visited = [];
        let unvisited_neighbors = new Map();
        unvisited_neighbors.set(start, 0 + this.gridcells[start[0]][start[1]].h);
        this.gridcells[start[0]][start[1]].g = 0;
        while (unvisited_neighbors.size != 0) {
            var current = this.findMinDistanceNeighbor(unvisited_neighbors);
            var current_pt = Object.values(current[0]);
            if (this.gridcells[current_pt[0]][current_pt[1]].status == 'end') {
                return true;
            }
            this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
            if (this.navigation.allowDiagonals) {
                // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length, this.gridcells, this.diagonal_weight);
            }
            else {
                var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length);
            }
            while (neighbors.length != 0) {
                var n = neighbors.shift();
                if (n) {
                    // if(this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' && this.gridcells[n[0]][n[1]].status != 'close'){
                    if (this.gridcells[n[0]][n[1]].vertex_status != 'visited' && this.gridcells[n[0]][n[1]].status != 'close') {
                        // Check if it thas been added to neighbor's list before or not
                        if (this.gridcells[n[0]][n[1]].vertex_status == 'neighbors') {
                            //It is already in the list, so check previous distance and compare it with new distance
                            // If new distance is less, update it's previous node and distance                            
                            if (this.gridcells[n[0]][n[1]].g > this.gridcells[current_pt[0]][current_pt[1]].g + this.gridcells[n[0]][n[1]].weight) {
                                this.gridcells[n[0]][n[1]].g = this.gridcells[current_pt[0]][current_pt[1]].g + this.gridcells[n[0]][n[1]].weight;
                                unvisited_neighbors.set(n, this.gridcells[n[0]][n[1]].g + this.gridcells[n[0]][n[1]].h);
                                this.gridcells[n[0]][n[1]].prev = current_pt;
                            }
                        }
                        else {
                            // Brand new neighbor which has never been visited before
                            this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                            this.gridcells[n[0]][n[1]].g = this.gridcells[current_pt[0]][current_pt[1]].g + this.gridcells[n[0]][n[1]].weight;
                            unvisited_neighbors.set(n, this.gridcells[n[0]][n[1]].g + this.gridcells[n[0]][n[1]].h);
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
    // Find min distace neighbor node and remove it from map and return it
    findMinDistanceNeighbor(unvisited_neighbors) {
        const values = Array.from(unvisited_neighbors.values());
        const lowest = Math.min.apply(null, values);
        const keys = Array.from(unvisited_neighbors.keys());
        const indexOfLowest = values.findIndex(function (x) { return x === lowest; });
        unvisited_neighbors.delete(keys[indexOfLowest]);
        return [keys[indexOfLowest], lowest];
    }
    generatePath(start, end) {
        if (this.navigation.allowBidirection) {
            return _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].generateWeightedBidirectionPath(start, end, this.gridcells, this.start_mid, this.end_mid);
        }
        else {
            return _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].generatePath(start, end, this.gridcells);
        }
    }
    Astar_Bidirection_Path(start, end) {
        this.visited = [];
        let unvisited_neighbors = new Map();
        unvisited_neighbors.set(start, 0 + this.gridcells[start[0]][start[1]].h);
        this.gridcells[start[0]][start[1]].g = 0;
        let unvisited_neighbors_goal = new Map();
        unvisited_neighbors_goal.set(end, 0 + this.gridcells[start[0]][start[1]].h_goal);
        this.gridcells[end[0]][end[1]].g_goal = 0;
        while (unvisited_neighbors.size != 0 && unvisited_neighbors_goal.size != 0) {
            if (unvisited_neighbors.size != 0) {
                var current = this.findMinDistanceNeighbor(unvisited_neighbors);
                var current_pt = Object.values(current[0]);
                if (this.gridcells[current_pt[0]][current_pt[1]].status == 'end') {
                    return true;
                }
                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
                if (this.navigation.allowDiagonals) {
                    // var neighbors = AlgoHelper.findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length, this.gridcells, 0);
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length, this.gridcells, this.diagonal_weight);
                    // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                }
                else {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length);
                }
                while (neighbors.length != 0) {
                    var n = neighbors.shift();
                    if (n) {
                        // if((this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal') && this.gridcells[n[0]][n[1]].status != 'close'){
                        if (this.gridcells[n[0]][n[1]].vertex_status != 'visited_start' && this.gridcells[n[0]][n[1]].status != 'close') {
                            // Check if it thas been added to neighbor's list before or not
                            if (this.gridcells[n[0]][n[1]].vertex_status == 'neighbors') {
                                //It is already in the list, so check previous distance and compare it with new distance
                                // If new distance is less, update it's previous node and distance                            
                                if (this.gridcells[n[0]][n[1]].g > this.gridcells[current_pt[0]][current_pt[1]].g + this.gridcells[n[0]][n[1]].weight) {
                                    this.gridcells[n[0]][n[1]].g = this.gridcells[current_pt[0]][current_pt[1]].g + this.gridcells[n[0]][n[1]].weight;
                                    unvisited_neighbors.set(n, this.gridcells[n[0]][n[1]].g + this.gridcells[n[0]][n[1]].h);
                                    this.gridcells[n[0]][n[1]].prev = current_pt;
                                }
                            }
                            else {
                                // Brand new neighbor which has never been visited before
                                if (this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal') {
                                    this.visited.push(current_pt);
                                    this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_start';
                                    this.start_mid = current_pt;
                                    this.end_mid = n;
                                    if (this.gridcells[n[0]][n[1]].status != 'start' && this.gridcells[n[0]][n[1]].status != 'end') {
                                        this.gridcells[n[0]][n[1]].status = 'mid';
                                        this.gridcells[n[0]][n[1]].vertex_status = 'unvisited';
                                    }
                                    return true;
                                }
                                // Brand new neighbor which has never been visited before
                                this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                                this.gridcells[n[0]][n[1]].g = this.gridcells[current_pt[0]][current_pt[1]].g + this.gridcells[n[0]][n[1]].weight;
                                unvisited_neighbors.set(n, this.gridcells[n[0]][n[1]].g + this.gridcells[n[0]][n[1]].h);
                                this.gridcells[n[0]][n[1]].prev = current_pt;
                            }
                        }
                    }
                }
                this.visited.push(current_pt);
                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_start';
            }
            // ======================================================================================================================
            if (unvisited_neighbors_goal.size != 0) {
                var current = this.findMinDistanceNeighbor(unvisited_neighbors_goal);
                var current_pt = Object.values(current[0]);
                if (this.gridcells[current_pt[0]][current_pt[1]].status == 'start') {
                    return true;
                }
                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
                if (this.navigation.allowDiagonals) {
                    // var neighbors = AlgoHelper.findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length, this.gridcells, 50);
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length, this.gridcells, this.diagonal_weight);
                    // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                }
                else {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length);
                }
                while (neighbors.length != 0) {
                    var n = neighbors.shift();
                    if (n) {
                        // if((this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_start') && this.gridcells[n[0]][n[1]].status != 'close'){
                        if (this.gridcells[n[0]][n[1]].vertex_status != 'visited_goal' && this.gridcells[n[0]][n[1]].status != 'close') {
                            // Check if it thas been added to neighbor's list before or not
                            if (this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end') {
                                if (this.gridcells[n[0]][n[1]].g_goal > this.gridcells[current_pt[0]][current_pt[1]].g_goal + this.gridcells[n[0]][n[1]].weight) {
                                    this.gridcells[n[0]][n[1]].g_goal = this.gridcells[current_pt[0]][current_pt[1]].g_goal + this.gridcells[n[0]][n[1]].weight;
                                    unvisited_neighbors_goal.set(n, this.gridcells[n[0]][n[1]].g_goal + this.gridcells[n[0]][n[1]].h_goal);
                                    this.gridcells[n[0]][n[1]].prev_goal = current_pt;
                                }
                            }
                            else {
                                if (this.gridcells[n[0]][n[1]].vertex_status == 'visited_start') {
                                    this.visited.push(current_pt);
                                    this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_goal';
                                    this.start_mid = n;
                                    this.end_mid = current_pt;
                                    if (this.gridcells[n[0]][n[1]].status != 'start' && this.gridcells[n[0]][n[1]].status != 'end') {
                                        this.gridcells[n[0]][n[1]].status = 'mid';
                                        this.gridcells[n[0]][n[1]].vertex_status = 'unvisited';
                                    }
                                    return true;
                                }
                                // Brand new neighbor which has never been visited before
                                this.gridcells[n[0]][n[1]].vertex_status = 'neighbors_end';
                                this.gridcells[n[0]][n[1]].g_goal = this.gridcells[current_pt[0]][current_pt[1]].g_goal + this.gridcells[n[0]][n[1]].weight;
                                unvisited_neighbors_goal.set(n, this.gridcells[n[0]][n[1]].g_goal + this.gridcells[n[0]][n[1]].h_goal);
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


/***/ }),

/***/ "2Trt":
/*!****************************************!*\
  !*** ./src/app/algorithms/Dijkstra.ts ***!
  \****************************************/
/*! exports provided: Dijksta */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dijksta", function() { return Dijksta; });
/* harmony import */ var _algo_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./algo-helper */ "Y3ol");

class Dijksta {
    constructor() {
        this.gridcells = [];
        this.visited = [];
        this.isPathAvail = false;
        this.start_mid = [];
        this.end_mid = [];
        this.diagonal_weight = 1;
    }
    setDistance(point, val) {
        this.gridcells[point[0]][point[1]].dist = val;
    }
    // Find min distace neighbor node and remove it from map and return it
    findMinDistanceNeighbor(unvisited_neighbors) {
        const values = Array.from(unvisited_neighbors.values());
        const lowest = Math.min.apply(null, values);
        const keys = Array.from(unvisited_neighbors.keys());
        const indexOfLowest = values.findIndex(function (x) { return x === lowest; });
        unvisited_neighbors.delete(keys[indexOfLowest]);
        return [keys[indexOfLowest], lowest];
    }
    runDijksta(cells, start, end, navinformation, diagonal_weight) {
        this.gridcells = cells;
        this.navigation = navinformation;
        this.diagonal_weight = diagonal_weight;
        if (this.navigation.allowBidirection) {
            this.start_mid = [];
            this.end_mid = [];
            this.isPathAvail = this.Dijksta_Bidirection_Path(start, end);
            this.gridcells = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].resetDiagonalWeights(this.gridcells);
        }
        else {
            this.isPathAvail = this.Dijksta_Path(start, end);
            this.gridcells = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].resetDiagonalWeights(this.gridcells);
        }
        // this.isPathAvail = this.Dijksta_Path(start, end);
    }
    Dijksta_Path(start, end) {
        this.visited = [];
        let unvisited_neighbors = new Map();
        unvisited_neighbors.set(start.toString(), 0);
        while (unvisited_neighbors.size != 0) {
            var current = this.findMinDistanceNeighbor(unvisited_neighbors);
            // var current_pt =  Object.values(current[0]);
            var current_pt = (current[0].toString()).split(',').map(Number);
            var current_val = Number(current[1]);
            if (this.gridcells[current_pt[0]][current_pt[1]].status == 'end') {
                return true;
            }
            this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
            if (this.navigation.allowDiagonals) {
                // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);                
                var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length, this.gridcells, this.diagonal_weight);
            }
            else {
                var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length);
            }
            while (neighbors.length != 0) {
                var n = neighbors.shift();
                if (n) {
                    if (this.gridcells[n[0]][n[1]].status != 'close') {
                        // Check if it thas been added to neighbor's list before or not
                        if (this.gridcells[n[0]][n[1]].vertex_status == 'neighbors') {
                            //It is already in the list, so check previous distance and compare it with new distance
                            // If new distance is less, update it's previous node and distance                       
                            // let old_dist = Number(unvisited_neighbors.get(n));
                            let old_dist = unvisited_neighbors.get(n.toString());
                            if (current_val + this.gridcells[n[0]][n[1]].weight < old_dist) {
                                unvisited_neighbors.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
                                this.gridcells[n[0]][n[1]].prev = current_pt;
                            }
                        }
                        else if (this.gridcells[n[0]][n[1]].vertex_status == 'unvisited') {
                            // Brand new neighbor which has never been visited before
                            this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                            unvisited_neighbors.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
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
    generatePath(start, end) {
        if (this.navigation.allowBidirection) {
            return _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].generateWeightedBidirectionPath(start, end, this.gridcells, this.start_mid, this.end_mid);
        }
        else {
            return _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].generatePath(start, end, this.gridcells);
        }
    }
    Dijksta_Bidirection_Path(start, end) {
        this.visited = [];
        let unvisited_neighbors = new Map();
        unvisited_neighbors.set(start.toString(), 0);
        let unvisited_neighbors_goal = new Map();
        unvisited_neighbors_goal.set(end.toString(), 0);
        while (unvisited_neighbors.size != 0 && unvisited_neighbors_goal.size != 0) {
            if (unvisited_neighbors.size != 0) {
                var current = this.findMinDistanceNeighbor(unvisited_neighbors);
                // var current_pt =  Object.values(current[0]);
                var current_pt = (current[0].toString()).split(',').map(Number);
                var current_val = Number(current[1]);
                if (this.gridcells[current_pt[0]][current_pt[1]].status == 'end') {
                    return true;
                }
                if (this.gridcells[current_pt[0]][current_pt[1]].vertex_status == 'visited_goal') {
                    this.visited.push(current_pt);
                    this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_start';
                    this.start_mid = current_pt;
                    this.end_mid = current_pt;
                    if (this.gridcells[current_pt[0]][current_pt[1]].status != 'start' && this.gridcells[current_pt[0]][current_pt[1]].status != 'end') {
                        this.gridcells[current_pt[0]][current_pt[1]].status = 'mid';
                        this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'unvisited';
                    }
                    return true;
                }
                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
                if (this.navigation.allowDiagonals) {
                    // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length, this.gridcells, this.diagonal_weight);
                }
                else {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length);
                }
                while (neighbors.length != 0) {
                    var n = neighbors.shift();
                    if (n) {
                        if ((this.gridcells[n[0]][n[1]].vertex_status == 'neighbors' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end' || this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal') && this.gridcells[n[0]][n[1]].status != 'close') {
                            // Check if it thas been added to neighbor's list before or not
                            if (this.gridcells[n[0]][n[1]].vertex_status == 'neighbors') {
                                //It is already in the list, so check previous distance and compare it with new distance
                                // If new distance is less, update it's previous node and distance
                                // let old_dist = Number(unvisited_neighbors.get(n));
                                let old_dist = Number(unvisited_neighbors.get(n.toString()));
                                if (current_val + this.gridcells[n[0]][n[1]].weight < old_dist) {
                                    unvisited_neighbors.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
                                    this.gridcells[n[0]][n[1]].prev = current_pt;
                                }
                            }
                            else if (this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end') {
                                // Brand new neighbor which has been visited before from goal and also might be visited from start
                                if (unvisited_neighbors.has(n.toString())) {
                                    let old_dist = Number(unvisited_neighbors.get(n.toString()));
                                    if (current_val + this.gridcells[n[0]][n[1]].weight < old_dist) {
                                        unvisited_neighbors.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
                                        this.gridcells[n[0]][n[1]].prev = current_pt;
                                    }
                                }
                                else {
                                    unvisited_neighbors.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
                                    this.gridcells[n[0]][n[1]].prev = current_pt;
                                }
                            }
                            else {
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
                                unvisited_neighbors.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
                                this.gridcells[n[0]][n[1]].prev = current_pt;
                            }
                        }
                    }
                }
                this.visited.push(current_pt);
                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_start';
            }
            // ======================================================================================================================
            if (unvisited_neighbors_goal.size != 0) {
                var current = this.findMinDistanceNeighbor(unvisited_neighbors_goal);
                // var current_pt =  Object.values(current[0]);
                var current_pt = (current[0].toString()).split(',').map(Number);
                var current_val = Number(current[1]);
                if (this.gridcells[current_pt[0]][current_pt[1]].status == 'start') {
                    return true;
                }
                if (this.gridcells[current_pt[0]][current_pt[1]].vertex_status == 'visited_start') {
                    this.visited.push(current_pt);
                    this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'visited_goal';
                    this.start_mid = current_pt;
                    this.end_mid = current_pt;
                    if (this.gridcells[current_pt[0]][current_pt[1]].status != 'start' && this.gridcells[current_pt[0]][current_pt[1]].status != 'end') {
                        this.gridcells[current_pt[0]][current_pt[1]].status = 'mid';
                        this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'unvisited';
                    }
                    return true;
                }
                this.gridcells[current_pt[0]][current_pt[1]].vertex_status = 'current';
                if (this.navigation.allowDiagonals) {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighborsWithWeightedDiagonals(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length, this.gridcells, this.diagonal_weight);
                    // var neighbors = AlgoHelper.findAllNeighbors(current_pt[0], current_pt[1],this.gridcells.length,this.gridcells[0].length);
                }
                else {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current_pt[0], current_pt[1], this.gridcells.length, this.gridcells[0].length);
                }
                while (neighbors.length != 0) {
                    var n = neighbors.shift();
                    if (n) {
                        if ((this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors' || this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_start') && this.gridcells[n[0]][n[1]].status != 'close') {
                            // Check if it thas been added to neighbor's list before or not
                            if (this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end') {
                                //It is already in the list, so check previous distance and compare it with new distance
                                // If new distance is less, update it's previous node and distance
                                let old_dist = Number(unvisited_neighbors_goal.get(n.toString()));
                                if (current_val + this.gridcells[n[0]][n[1]].weight < old_dist) {
                                    unvisited_neighbors_goal.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
                                    this.gridcells[n[0]][n[1]].prev_goal = current_pt;
                                }
                            }
                            else if (this.gridcells[n[0]][n[1]].vertex_status == 'visited_start' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors') {
                                // Brand new neighbor which has been visited before from goal and also might be visited from start
                                if (unvisited_neighbors_goal.has(n.toString())) {
                                    let old_dist = Number(unvisited_neighbors_goal.get(n.toString()));
                                    if (current_val + this.gridcells[n[0]][n[1]].weight < old_dist) {
                                        unvisited_neighbors_goal.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
                                        this.gridcells[n[0]][n[1]].prev_goal = current_pt;
                                    }
                                }
                                else {
                                    unvisited_neighbors_goal.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
                                    this.gridcells[n[0]][n[1]].prev_goal = current_pt;
                                }
                            }
                            else {
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
                                unvisited_neighbors_goal.set(n.toString(), current_val + this.gridcells[n[0]][n[1]].weight);
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


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Def+":
/*!***********************************************************!*\
  !*** ./src/app/visualizer/gridcell/gridcell.component.ts ***!
  \***********************************************************/
/*! exports provided: GridcellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridcellComponent", function() { return GridcellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");



const _c0 = function (a0, a1, a2, a3, a4, a5, a6, a7, a8) { return { "start_cell": a0, "end_cell": a1, "close_cell": a2, "path_cell": a3, "current_cell": a4, "toll_cell": a5, "visited_start": a6, "visited_goal": a7, "middle": a8 }; };
const _c1 = function (a0) { return { "filter": a0 }; };
class GridcellComponent {
    constructor(ref) {
        this.ref = ref;
        // @Input('toll_weight') toll_weight!: number;
        this.bri = 'brightness(130%)';
        this.isdraggable = false;
    }
    ngOnInit() {
        if (this.cell.status == "start" || this.cell.status == "end") {
            this.isdraggable = true;
        }
    }
    runChangeDetector() {
        this.ref.markForCheck();
    }
    reset() {
        this.cell.vertex_status = 'unvisited';
    }
    removeMid() {
        if (this.cell.status == 'mid') {
            this.cell.status = 'open';
        }
    }
    removeAllWall() {
        if (this.cell.status == 'close') {
            this.cell.status = 'open';
        }
    }
    removeAllTolls() {
        if (this.cell.status == 'toll') {
            this.cell.status = 'open';
            this.cell.weight = 1;
        }
    }
    getFilterIntensity() {
        if (this.cell.status == 'toll' && this.cell.vertex_status != 'path') {
            var intensity = 130 - (this.cell.weight);
            return 'brightness(' + intensity + '%)';
            // return "brightness("+intensity+"%)";
            // [style.background-color]="getFilterIntensity()"
        }
        return 'brightness(130%)';
    }
}
GridcellComponent.ɵfac = function GridcellComponent_Factory(t) { return new (t || GridcellComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
GridcellComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GridcellComponent, selectors: [["app-gridcell"]], inputs: { cell: "cell" }, decls: 1, vars: 14, consts: [[3, "ngClass", "ngStyle"]], template: function GridcellComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunctionV"](2, _c0, [ctx.cell.status == "start", ctx.cell.status == "end", ctx.cell.status == "close", ctx.cell.vertex_status == "path" && (ctx.cell.status == "open" || ctx.cell.status == "toll"), ctx.cell.vertex_status == "visited" && ctx.cell.status == "open", ctx.cell.status == "toll" && ctx.cell.vertex_status != "path", ctx.cell.vertex_status == "visited_start" && ctx.cell.status == "open", ctx.cell.vertex_status == "visited_goal" && ctx.cell.status == "open", ctx.cell.status == "mid"]))("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](12, _c1, ctx.cell.status == "toll" && ctx.cell.vertex_status != "path" ? ctx.getFilterIntensity() : "brightness(100%)"));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"]], styles: ["div[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n\n.start_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: #ff005f;\n}\n\n.end_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: green;\n}\n\n.close_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: #000347;\n\n  animation-name: wall_animation;\n  animation-timing-function: ease;\n  animation-duration: 4s;\n}\n\n@keyframes wall_animation {\n  0% {\n    background-color: #333685;\n  }\n  20% {\n    background-color: #000466;\n  }\n  40% {\n    background-color: #000466;\n  }\n  60% {\n    background-color: #00045c;\n  }\n  80% {\n    background-color: #000352;\n  }\n  100% {\n    background-color: #000347;\n  }\n}\n\n\n\n.current_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  \n  \n  background-color: #ffd300;\n  animation-name: visited_animation;\n  animation-timing-function: ease;\n  animation-duration: 1s;\n}\n\n@keyframes visited_animation {\n  0% {\n    border-radius: 35%;\n    background-color: #ff005f;\n  }\n  20% {\n    border-radius: 30%;\n    background-color: #ff5233;\n  }\n  40% {\n    border-radius: 25%;\n    background-color: #ffa733;\n  }\n  60% {\n    border-radius: 20%;\n    background-color: #ffbb00;\n  }\n  80% {\n    border-radius: 10%;\n    \n    background-color: #ffee00;\n  }\n  100% {\n    border-radius: 0%;\n    background-color: #ffd300;\n  }\n}\n\n.path_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: dodgerblue;\n  animation-name: path_animation;\n  animation-timing-function: ease;\n  animation-duration: 1s;\n}\n\n@keyframes path_animation {\n  0% {\n    border-radius: 35%;\n    background-color: #0a26c4;\n  }\n  20% {\n    border-radius: 30%;\n    background-color: #1d0ac4;\n  }\n  40% {\n    border-radius: 25%;\n    background-color: #610ac4;\n  }\n  60% {\n    border-radius: 20%;\n    background-color: #a333ff;\n  }\n  80% {\n    border-radius: 10%;\n    background-color: #ff33ff;\n  }\n  100% {\n    border-radius: 0%;\n    background-color: #b40ac4;\n  }\n}\n\n.toll_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: rgb(230, 120, 120);\n  \n}\n\n.visited_start[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  \n  \n  \n  background-color: #00ffb6;\n  animation-name: visited_start_animation;\n  animation-timing-function: ease;\n  animation-duration: 1s;\n}\n\n@keyframes visited_start_animation {\n  0% {\n    border-radius: 35%;\n    \n    background-color: #e5ff00;\n  }\n  20% {\n    border-radius: 30%;\n    background-color: #3cff00;\n  }\n  40% {\n    border-radius: 25%;\n    background-color: #00ff37;\n  }\n  60% {\n    border-radius: 20%;\n    background-color: #00ff95;\n  }\n  80% {\n    border-radius: 10%;\n    \n    background-color: #00ff95;\n  }\n  100% {\n    border-radius: 0%;\n    background-color: #00ffb6;\n  }\n}\n\n.visited_goal[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  \n  \n  \n  \n  background-color: #cc00ff;\n  animation-name: visited_goal_animation;\n  animation-timing-function: ease;\n  animation-duration: 1s;\n}\n\n@keyframes visited_goal_animation {\n  0% {\n    border-radius: 35%;\n    \n    background-color: #ff0062;\n  }\n  20% {\n    border-radius: 30%;\n    background-color: #ff008c;\n  }\n  40% {\n    border-radius: 25%;\n    background-color: #ff00aa;\n  }\n  60% {\n    border-radius: 20%;\n    background-color: #ff00c8;\n  }\n  80% {\n    border-radius: 10%;\n    \n    background-color: #ff00f2;\n  }\n  100% {\n    border-radius: 0%;\n    background-color: #cc00ff;\n  }\n}\n\n.middle[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: #ffd300;\n  animation-name: visited_animation;\n  animation-timing-function: ease;\n  animation-duration: 2s;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWRjZWxsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCOztFQUV6Qiw4QkFBOEI7RUFDOUIsK0JBQStCO0VBQy9CLHNCQUFzQjtBQUN4Qjs7QUFDQTtFQUNFO0lBQ0UseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSx5QkFBeUI7RUFDM0I7RUFDQTtJQUNFLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0UseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSx5QkFBeUI7RUFDM0I7RUFDQTtJQUNFLHlCQUF5QjtFQUMzQjtBQUNGOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHOztBQUVIO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWiw4QkFBOEI7RUFDOUIsK0JBQStCO0VBQy9CLHlCQUF5QjtFQUN6QixpQ0FBaUM7RUFDakMsK0JBQStCO0VBQy9CLHNCQUFzQjtBQUN4Qjs7QUFDQTtFQUNFO0lBQ0Usa0JBQWtCO0lBQ2xCLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0Usa0JBQWtCO0lBQ2xCLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0Usa0JBQWtCO0lBQ2xCLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0Usa0JBQWtCO0lBQ2xCLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0Usa0JBQWtCO0lBQ2xCLCtCQUErQjtJQUMvQix5QkFBeUI7RUFDM0I7RUFDQTtJQUNFLGlCQUFpQjtJQUNqQix5QkFBeUI7RUFDM0I7QUFDRjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osNEJBQTRCO0VBQzVCLDhCQUE4QjtFQUM5QiwrQkFBK0I7RUFDL0Isc0JBQXNCO0FBQ3hCOztBQUNBO0VBQ0U7SUFDRSxrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxpQkFBaUI7SUFDakIseUJBQXlCO0VBQzNCO0FBQ0Y7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLG9DQUFvQztFQUNwQyw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLDhCQUE4QjtFQUM5QiwrQkFBK0I7RUFDL0IsK0JBQStCO0VBQy9CLHlCQUF5QjtFQUN6Qix1Q0FBdUM7RUFDdkMsK0JBQStCO0VBQy9CLHNCQUFzQjtBQUN4Qjs7QUFDQTtFQUNFO0lBQ0Usa0JBQWtCO0lBQ2xCLCtCQUErQjtJQUMvQix5QkFBeUI7RUFDM0I7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQix5QkFBeUI7RUFDM0I7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQix5QkFBeUI7RUFDM0I7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQix5QkFBeUI7RUFDM0I7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQiwrQkFBK0I7SUFDL0IseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxpQkFBaUI7SUFDakIseUJBQXlCO0VBQzNCO0FBQ0Y7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLCtCQUErQjtFQUMvQiwrQkFBK0I7RUFDL0IsMENBQTBDO0VBQzFDLCtCQUErQjtFQUMvQix5QkFBeUI7RUFDekIsc0NBQXNDO0VBQ3RDLCtCQUErQjtFQUMvQixzQkFBc0I7QUFDeEI7O0FBQ0E7RUFDRTtJQUNFLGtCQUFrQjtJQUNsQiwrQkFBK0I7SUFDL0IseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIsK0JBQStCO0lBQy9CLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0UsaUJBQWlCO0lBQ2pCLHlCQUF5QjtFQUMzQjtBQUNGOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsaUNBQWlDO0VBQ2pDLCtCQUErQjtFQUMvQixzQkFBc0I7QUFDeEIiLCJmaWxlIjoiZ3JpZGNlbGwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImRpdiB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5zdGFydF9jZWxsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDA1Zjtcbn1cblxuLmVuZF9jZWxsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG59XG5cbi5jbG9zZV9jZWxsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDM0NztcblxuICBhbmltYXRpb24tbmFtZTogd2FsbF9hbmltYXRpb247XG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNHM7XG59XG5Aa2V5ZnJhbWVzIHdhbGxfYW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM2ODU7XG4gIH1cbiAgMjAlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwNDY2O1xuICB9XG4gIDQwJSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDQ2NjtcbiAgfVxuICA2MCUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA0NWM7XG4gIH1cbiAgODAlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMzUyO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAzNDc7XG4gIH1cbn1cblxuLyogLmN1cnJlbnRfY2VsbDpob3ZlciB7XG4gIGFuaW1hdGlvbi1uYW1lOiB2aXNpdGVkX2FuaW1hdGlvbl9ob3ZlcjtcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcbn1cblxuQGtleWZyYW1lcyB2aXNpdGVkX2FuaW1hdGlvbl9ob3ZlciB7XG4gIDAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAxNSU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYTczMztcbiAgfVxuICAyMCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhNzMzO1xuICB9XG4gIDQwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMTUlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmE3MzM7XG4gIH1cbiAgNjAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYmIwMDtcbiAgfVxuICA4MCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDUlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmVlMDA7XG4gIH1cbiAgMTAwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogNSU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDMwMDtcbiAgfVxufSAqL1xuXG4uY3VycmVudF9jZWxsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogeWVsbG93OyAqL1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZmEwOyAqL1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkMzAwO1xuICBhbmltYXRpb24tbmFtZTogdmlzaXRlZF9hbmltYXRpb247XG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XG59XG5Aa2V5ZnJhbWVzIHZpc2l0ZWRfYW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDM1JTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDVmO1xuICB9XG4gIDIwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMzAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjUyMzM7XG4gIH1cbiAgNDAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAyNSU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYTczMztcbiAgfVxuICA2MCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZiYjAwO1xuICB9XG4gIDgwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6ICMwMDAzNTI7ICovXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZWUwMDtcbiAgfVxuICAxMDAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkMzAwO1xuICB9XG59XG5cbi5wYXRoX2NlbGwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBkb2RnZXJibHVlO1xuICBhbmltYXRpb24tbmFtZTogcGF0aF9hbmltYXRpb247XG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XG59XG5Aa2V5ZnJhbWVzIHBhdGhfYW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDM1JTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGEyNmM0O1xuICB9XG4gIDIwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMzAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxZDBhYzQ7XG4gIH1cbiAgNDAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAyNSU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzYxMGFjNDtcbiAgfVxuICA2MCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTMzM2ZmO1xuICB9XG4gIDgwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjMzZmY7XG4gIH1cbiAgMTAwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2I0MGFjNDtcbiAgfVxufVxuXG4udG9sbF9jZWxsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzMCwgMTIwLCAxMjApO1xuICAvKiBmaWx0ZXI6IGJyaWdodG5lc3MoMzAlKTsgKi9cbn1cblxuLnZpc2l0ZWRfc3RhcnQge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7ICovXG4gIC8qIGJhY2tncm91bmQtY29sb3I6ICNlOTUzMGQ7ICovXG4gIC8qIGJhY2tncm91bmQtY29sb3I6ICMwZGU5ZDQ7ICovXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGZmYjY7XG4gIGFuaW1hdGlvbi1uYW1lOiB2aXNpdGVkX3N0YXJ0X2FuaW1hdGlvbjtcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcbn1cbkBrZXlmcmFtZXMgdmlzaXRlZF9zdGFydF9hbmltYXRpb24ge1xuICAwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMzUlO1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6ICNmZjAwNWY7ICovXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZmYwMDtcbiAgfVxuICAyMCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDMwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2NmZjAwO1xuICB9XG4gIDQwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMjUlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGZmMzc7XG4gIH1cbiAgNjAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAyMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwZmY5NTtcbiAgfVxuICA4MCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMzUyOyAqL1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGZmOTU7XG4gIH1cbiAgMTAwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwZmZiNjtcbiAgfVxufVxuXG4udmlzaXRlZF9nb2FsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogbWFnZW50YTsgKi9cbiAgLyogYmFja2dyb3VuZC1jb2xvcjogI2U5MGRjNjsgKi9cbiAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMTg5LCAxNDUpOyAqL1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjYzhmZjAwOyAqL1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2MwMGZmO1xuICBhbmltYXRpb24tbmFtZTogdmlzaXRlZF9nb2FsX2FuaW1hdGlvbjtcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcbn1cbkBrZXlmcmFtZXMgdmlzaXRlZF9nb2FsX2FuaW1hdGlvbiB7XG4gIDAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAzNSU7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogI2ZmMDA1ZjsgKi9cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDYyO1xuICB9XG4gIDIwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMzAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwOGM7XG4gIH1cbiAgNDAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAyNSU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDBhYTtcbiAgfVxuICA2MCUge1xuICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMGM4O1xuICB9XG4gIDgwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6ICMwMDAzNTI7ICovXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDBmMjtcbiAgfVxuICAxMDAlIHtcbiAgICBib3JkZXItcmFkaXVzOiAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2MwMGZmO1xuICB9XG59XG5cbi5taWRkbGUge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkMzAwO1xuICBhbmltYXRpb24tbmFtZTogdmlzaXRlZF9hbmltYXRpb247XG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XG59XG4iXX0= */"], changeDetection: 0 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GridcellComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-gridcell',
                templateUrl: './gridcell.component.html',
                styleUrls: ['./gridcell.component.css'],
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, { cell: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['cell']
        }] }); })();


/***/ }),

/***/ "O2vY":
/*!*****************************************************************************************************!*\
  !*** ./src/app/visualizer/helper_components/color-representation/color-representation.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: ColorRepresentationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorRepresentationComponent", function() { return ColorRepresentationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ColorRepresentationComponent {
    constructor() { }
    ngOnInit() {
    }
}
ColorRepresentationComponent.ɵfac = function ColorRepresentationComponent_Factory(t) { return new (t || ColorRepresentationComponent)(); };
ColorRepresentationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ColorRepresentationComponent, selectors: [["app-color-representation"]], decls: 29, vars: 0, consts: [[1, "main_color_rep"], [1, "start_node"], [1, "start"], [1, "statr_txt"], [1, "start", 2, "margin-left", "80px"], [1, "start", 2, "margin-left", "20px"], [1, "start", 2, "margin-left", "55px"]], template: function ColorRepresentationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Start Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Gole Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Blocked/Wall Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Toll Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Unvisitd Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Path Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Visited Nodes");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".main_color_rep[_ngcontent-%COMP%] {\n  width: 500px;\n  height: 200px;\n  margin: auto;\n}\n\n.start_node[_ngcontent-%COMP%] {\n  height: 50px;\n}\n\n.start[_ngcontent-%COMP%] {\n  float: left;\n  height: 30px;\n  width: 30px;\n  background-color: sandybrown;\n\n  margin-left: 10px;\n}\n\n.statr_txt[_ngcontent-%COMP%] {\n  float: left;\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbG9yLXJlcHJlc2VudGF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFDQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osV0FBVztFQUNYLDRCQUE0Qjs7RUFFNUIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJjb2xvci1yZXByZXNlbnRhdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW5fY29sb3JfcmVwIHtcbiAgd2lkdGg6IDUwMHB4O1xuICBoZWlnaHQ6IDIwMHB4O1xuICBtYXJnaW46IGF1dG87XG59XG5cbi5zdGFydF9ub2RlIHtcbiAgaGVpZ2h0OiA1MHB4O1xufVxuLnN0YXJ0IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGhlaWdodDogMzBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHNhbmR5YnJvd247XG5cbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5cbi5zdGF0cl90eHQge1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ColorRepresentationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-color-representation',
                templateUrl: './color-representation.component.html',
                styleUrls: ['./color-representation.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "RViY":
/*!********************************!*\
  !*** ./src/app/models/cell.ts ***!
  \********************************/
/*! exports provided: Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
class Cell {
    constructor() {
        this.status = 'open';
        this.vertex_status = 'unvisited';
        this.weight = 1;
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _visualizer_algovisualizer_algovisualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visualizer/algovisualizer/algovisualizer.component */ "kgqt");



class AppComponent {
    constructor() { }
    ;
    ngOnInit() { }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-algovisualizer");
    } }, directives: [_visualizer_algovisualizer_algovisualizer_component__WEBPACK_IMPORTED_MODULE_1__["AlgovisualizerComponent"]], styles: [".grid[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 auto;\n  margin-top: 100px;\n  padding: 10px;\n}\n\n.container-fluid[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100vh;\n  text-align: center;\n}\n\ntable[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  border: 1px solid black;\n  cursor: default;\n}\n\ntd[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 20px;\n  height: 20px;\n}\n\n.cell_color[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: goldenrod;\n}\n\n.start_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: red;\n}\n\n.end_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: green;\n}\n\n.close_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: black;\n}\n\n.neighbor_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: indianred;\n}\n\n.current_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: yellow;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7OztFQUdFLHVCQUF1QjtFQUN2QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix3QkFBd0I7QUFDMUIiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3JpZCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luOiAwIGF1dG87XG4gIG1hcmdpbi10b3A6IDEwMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4uY29udGFpbmVyLWZsdWlkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwdmg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxudGFibGUsXG50aCxcbnRkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxudGQge1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xufVxuXG4uY2VsbF9jb2xvciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IGdvbGRlbnJvZDtcbn1cblxuLnN0YXJ0X2NlbGwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5lbmRfY2VsbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xufVxuXG4uY2xvc2VfY2VsbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuXG4ubmVpZ2hib3JfY2VsbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IGluZGlhbnJlZDtcbn1cblxuLmN1cnJlbnRfY2VsbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "T++Q":
/*!***************************************************************************!*\
  !*** ./src/app/algorithms/maze_and_pattern_Algorithms/random-patterns.ts ***!
  \***************************************************************************/
/*! exports provided: Randompatterns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Randompatterns", function() { return Randompatterns; });
//searches all nodes through dfs
//starts at p1's start node which is denoted by 'S'
//30% chance of marking the visited node as blocked
//visited statuses are kept under node.visitState where 'U' marks unvisited and 'V' marks visited
//For now, X's denote blockages and O's denoted open spaces
class Randompatterns {
    static getRandom() {
        var num = Math.random();
        if (num < 0.3)
            return true; //probability 0.3, create wall
        else
            return false; // probability 0.7 leave empty
    }
    static generateRandomPattern(cells) {
        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[0].length; x++) {
                if (cells[y][x].status != 'start' && cells[y][x].status != 'end') {
                    if (Randompatterns.getRandom()) {
                        cells[y][x].status = 'close';
                    }
                }
            }
        }
    }
}


/***/ }),

/***/ "T3EP":
/*!***********************************!*\
  !*** ./src/app/models/navInfo.ts ***!
  \***********************************/
/*! exports provided: NavInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavInfo", function() { return NavInfo; });
class NavInfo {
    constructor() {
        this.algorithm = '';
        this.allowBidirection = false;
        this.allowDiagonals = false;
        this.heuristics = 'manhattan';
    }
}


/***/ }),

/***/ "Wo3a":
/*!***********************************************************************************!*\
  !*** ./src/app/algorithms/maze_and_pattern_Algorithms/recursive-division-maze.ts ***!
  \***********************************************************************************/
/*! exports provided: RecursiveDivisionMaze */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveDivisionMaze", function() { return RecursiveDivisionMaze; });
// https://medium.com/analytics-vidhya/maze-generations-algorithms-and-visualizations-9f5e88a3ae37
class RecursiveDivisionMaze {
    constructor() {
        this.gridcells = [];
    }
    createBorder(cells) {
    }
    randomInteger(min, max) {
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
    RecursiveDivision(cells, start, end, orientation, queue) {
        if (end[0] - start[0] < 2 || end[1] - start[1] < 2) {
            return;
        }
        // Horizontal recursive division maze ===============================================
        if (orientation == 1) {
            var horizontal_index = this.randomInteger(start[0] + 1, end[0] - 1);
            for (var i = start[1]; i <= end[1]; i++) {
                queue.push([horizontal_index, i]);
            }
            for (var i = 0; i <= Math.round((end[1] - start[1]) / 10); i++) {
                var open_idx = this.randomInteger(start[1], end[1]);
                queue.push([horizontal_index, open_idx]);
            }
            // var open_idx = this.randomInteger(start[1], end[1]);
            // queue.push([horizontal_index, open_idx]);
            // open_idx = this.randomInteger(start[1], end[1]);
            // queue.push([horizontal_index, open_idx]);
            this.RecursiveDivision(cells, start, [horizontal_index - 1, end[1]], orientation, queue);
            this.RecursiveDivision(cells, [horizontal_index + 1, start[1]], end, orientation, queue);
        }
        else if (orientation == -1) {
            // Verticle recursive division maze =============================================
            var verticle_index = this.randomInteger(start[1] + 1, end[1] - 1);
            for (var i = start[0]; i <= end[0]; i++) {
                queue.push([i, verticle_index]);
            }
            for (var i = 0; i <= Math.round((end[0] - start[0]) / 10); i++) {
                var open_idx = this.randomInteger(start[0], end[0]);
                queue.push([open_idx, verticle_index]);
            }
            // var open_idx = this.randomInteger(start[0], end[0]);
            // queue.push([open_idx, verticle_index]);
            this.RecursiveDivision(cells, start, [end[0], verticle_index - 1], orientation, queue);
            this.RecursiveDivision(cells, [start[0], verticle_index + 1], end, orientation, queue);
        }
        else {
            // Mixed Horizontal and verticle division maze ==============================================
            var horizontal_or_verticle = this.randomInteger(0, 1);
            if (horizontal_or_verticle == 0) {
                // Horizontal division
                var horizontal_index = this.randomInteger(start[0] + 1, end[0] - 1);
                for (var i = start[1]; i <= end[1]; i++) {
                    queue.push([horizontal_index, i]);
                }
                for (var i = 0; i <= Math.round((end[1] - start[1]) / 10); i++) {
                    var open_idx = this.randomInteger(start[1], end[1]);
                    queue.push([horizontal_index, open_idx]);
                }
                // var open_idx = this.randomInteger(start[1], end[1]);
                // // cells[horizontal_index][open_idx].status = "open";
                // queue.push([horizontal_index, open_idx]);
                // open_idx = this.randomInteger(start[1], end[1]);
                // // cells[horizontal_index][open_idx].status = "open";
                // queue.push([horizontal_index, open_idx]);
                this.RecursiveDivision(cells, start, [horizontal_index - 1, end[1]], orientation, queue);
                this.RecursiveDivision(cells, [horizontal_index + 1, start[1]], end, orientation, queue);
            }
            else {
                // verticle division
                var verticle_index = this.randomInteger(start[1] + 1, end[1] - 1);
                for (var i = start[0]; i <= end[0]; i++) {
                    // cells[i][verticle_index].status = "close";
                    queue.push([i, verticle_index]);
                }
                for (var i = 0; i <= Math.round((end[0] - start[0]) / 10); i++) {
                    var open_idx = this.randomInteger(start[0], end[0]);
                    queue.push([open_idx, verticle_index]);
                }
                // var open_idx = this.randomInteger(start[0], end[0]);
                // // cells[open_idx][verticle_index].status = "open";
                // queue.push([open_idx, verticle_index]);
                this.RecursiveDivision(cells, start, [end[0], verticle_index - 1], orientation, queue);
                this.RecursiveDivision(cells, [start[0], verticle_index + 1], end, orientation, queue);
            }
        }
    }
}


/***/ }),

/***/ "Y3ol":
/*!*******************************************!*\
  !*** ./src/app/algorithms/algo-helper.ts ***!
  \*******************************************/
/*! exports provided: AlgoHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlgoHelper", function() { return AlgoHelper; });
class AlgoHelper {
    // This finction only allows left, right, top and bottom
    static findNeighbors(x, y, width, height) {
        var neighbor = [];
        if ((x > 0 && y > 0) && (x < width - 1 && y < height - 1)) {
            var leftX = (x - 1 + width) % width;
            var rightX = (x + 1) % width;
            var aboveY = (y - 1 + height) % height;
            var belowY = (y + 1) % height;
            // neighbor.push([rightX, y]);
            // neighbor.push([leftX, y]);
            // neighbor.push([x,aboveY]);
            // neighbor.push([x,belowY]);
            neighbor.push([x, aboveY]);
            neighbor.push([rightX, y]);
            neighbor.push([x, belowY]);
            neighbor.push([leftX, y]);
        }
        else {
            if (x - 1 >= 0) {
                var leftX = (x - 1 + width) % width;
                neighbor.push([leftX, y]);
            }
            if (x + 1 < width) {
                var rightX = (x + 1) % width;
                neighbor.push([rightX, y]);
            }
            if (y - 1 >= 0) {
                var aboveY = (y - 1 + height) % height;
                neighbor.push([x, aboveY]);
            }
            if (y + 1 < height) {
                var belowY = (y + 1) % height;
                neighbor.push([x, belowY]);
            }
        }
        return neighbor;
    }
    // find all neighbors allow diagonal
    static findAllNeighbors(x, y, width, height) {
        var neighbor = [];
        if ((x > 0 && y > 0) && (x < width - 1 && y < height - 1)) {
            var leftX = (x - 1 + width) % width;
            var rightX = (x + 1) % width;
            var aboveY = (y - 1 + height) % height;
            var belowY = (y + 1) % height;
            // neighbor.push([rightX, aboveY]);
            // neighbor.push([rightX, belowY]);
            // neighbor.push([leftX, belowY]);
            // neighbor.push([leftX, aboveY]);
            neighbor.push([x, aboveY]);
            neighbor.push([rightX, y]);
            neighbor.push([x, belowY]);
            neighbor.push([leftX, y]);
            neighbor.push([leftX, aboveY]);
            neighbor.push([rightX, aboveY]);
            neighbor.push([rightX, belowY]);
            neighbor.push([leftX, belowY]);
            // neighbor.push([leftX, aboveY]);
        }
        else {
            var l = false;
            var r = false;
            var t = false;
            var b = false;
            if (y - 1 >= 0) {
                var aboveY = (y - 1 + height) % height;
                neighbor.push([x, aboveY]);
                t = true;
            }
            if (x + 1 < width) {
                var rightX = (x + 1) % width;
                neighbor.push([rightX, y]);
                r = true;
            }
            if (y + 1 < height) {
                var belowY = (y + 1) % height;
                neighbor.push([x, belowY]);
                b = true;
            }
            if (x - 1 >= 0) {
                var leftX = (x - 1 + width) % width;
                neighbor.push([leftX, y]);
                l = true;
            }
            if (t) {
                var aboveY = (y - 1 + height) % height;
                if (l) {
                    var leftX = (x - 1 + width) % width;
                    neighbor.push([leftX, aboveY]);
                }
                if (r) {
                    var rightX = (x + 1) % width;
                    neighbor.push([rightX, aboveY]);
                }
            }
            if (b) {
                var belowY = (y + 1) % height;
                if (r) {
                    var rightX = (x + 1) % width;
                    neighbor.push([rightX, belowY]);
                }
                if (l) {
                    var leftX = (x - 1 + width) % width;
                    neighbor.push([leftX, belowY]);
                }
            }
        }
        return neighbor;
    }
    // find all neighbors allow diagonal
    static findAllNeighborsWithWeightedDiagonals(x, y, width, height, cells, diagonalWeight) {
        var neighbor = [];
        if ((x > 0 && y > 0) && (x < width - 1 && y < height - 1)) {
            var leftX = (x - 1 + width) % width;
            var rightX = (x + 1) % width;
            var aboveY = (y - 1 + height) % height;
            var belowY = (y + 1) % height;
            // neighbor.push([rightX, aboveY]);
            // neighbor.push([rightX, belowY]);
            // neighbor.push([leftX, belowY]);
            // neighbor.push([leftX, aboveY]);
            neighbor.push([x, aboveY]);
            if (cells[x][aboveY].status != 'toll') {
                cells[x][aboveY].weight = 1;
            }
            neighbor.push([rightX, y]);
            if (cells[rightX][y].status != 'toll') {
                cells[rightX][y].weight = 1;
            }
            neighbor.push([x, belowY]);
            if (cells[x][belowY].status != 'toll') {
                cells[x][belowY].weight = 1;
            }
            neighbor.push([leftX, y]);
            if (cells[leftX][y].status != 'toll') {
                cells[leftX][y].weight = 1;
            }
            neighbor.push([leftX, aboveY]);
            if (cells[leftX][aboveY].status != 'toll') {
                cells[leftX][aboveY].weight = diagonalWeight;
            }
            neighbor.push([rightX, aboveY]);
            if (cells[rightX][aboveY].status != 'toll') {
                cells[rightX][aboveY].weight = diagonalWeight;
            }
            neighbor.push([rightX, belowY]);
            if (cells[rightX][belowY].status != 'toll') {
                cells[rightX][belowY].weight = diagonalWeight;
            }
            neighbor.push([leftX, belowY]);
            if (cells[leftX][belowY].status != 'toll') {
                cells[leftX][belowY].weight = diagonalWeight;
            }
        }
        else {
            var l = false;
            var r = false;
            var t = false;
            var b = false;
            if (y - 1 >= 0) {
                var aboveY = (y - 1 + height) % height;
                neighbor.push([x, aboveY]);
                if (cells[x][aboveY].status != 'toll') {
                    cells[x][aboveY].weight = 1;
                }
                t = true;
            }
            if (x + 1 < width) {
                var rightX = (x + 1) % width;
                neighbor.push([rightX, y]);
                if (cells[rightX][y].status != 'toll') {
                    cells[rightX][y].weight = 1;
                }
                r = true;
            }
            if (y + 1 < height) {
                var belowY = (y + 1) % height;
                neighbor.push([x, belowY]);
                if (cells[x][belowY].status != 'toll') {
                    cells[x][belowY].weight = 1;
                }
                b = true;
            }
            if (x - 1 >= 0) {
                var leftX = (x - 1 + width) % width;
                neighbor.push([leftX, y]);
                if (cells[leftX][y].status != 'toll') {
                    cells[leftX][y].weight = 1;
                }
                l = true;
            }
            if (t) {
                var aboveY = (y - 1 + height) % height;
                if (l) {
                    var leftX = (x - 1 + width) % width;
                    neighbor.push([leftX, aboveY]);
                    if (cells[leftX][aboveY].status != 'toll') {
                        cells[leftX][aboveY].weight = diagonalWeight;
                    }
                }
                if (r) {
                    var rightX = (x + 1) % width;
                    neighbor.push([rightX, aboveY]);
                    if (cells[rightX][aboveY].status != 'toll') {
                        cells[rightX][aboveY].weight = diagonalWeight;
                    }
                }
            }
            if (b) {
                var belowY = (y + 1) % height;
                if (r) {
                    var rightX = (x + 1) % width;
                    neighbor.push([rightX, belowY]);
                    if (cells[rightX][belowY].status != 'toll') {
                        cells[rightX][belowY].weight = diagonalWeight;
                    }
                }
                if (l) {
                    var leftX = (x - 1 + width) % width;
                    neighbor.push([leftX, belowY]);
                    if (cells[leftX][belowY].status != 'toll') {
                        cells[leftX][belowY].weight = diagonalWeight;
                    }
                }
            }
        }
        return neighbor;
    }
    static resetDiagonalWeights(cells) {
        for (var i = 0; i < cells.length; i++) {
            for (var j = 0; j < cells[0].length; j++) {
                if (cells[i][j].status != 'toll') {
                    cells[i][j].weight = 1;
                }
            }
        }
        return cells;
    }
    static generateWeightedBidirectionPath(start, end, cells, start_mid, end_mid) {
        var path = [];
        var prev = start_mid;
        while (!(prev[0] == start[0] && prev[1] == start[1])) {
            path.push(prev);
            cells[prev[0]][prev[1]].vertex_status = 'path';
            prev = cells[prev[0]][prev[1]].prev;
        }
        prev = end_mid;
        while (!(prev[0] == end[0] && prev[1] == end[1])) {
            path.push(prev);
            cells[prev[0]][prev[1]].vertex_status = 'path';
            prev = cells[prev[0]][prev[1]].prev_goal;
        }
        return path;
    }
    static generateBidirectionPath(start, end, cells, start_mid, end_mid) {
        var path = [];
        var prev = start_mid;
        while (!(prev[0] == start[0] && prev[1] == start[1])) {
            path.push(prev);
            cells[prev[0]][prev[1]].vertex_status = 'path';
            prev = cells[prev[0]][prev[1]].prev;
        }
        prev = end_mid;
        while (!(prev[0] == end[0] && prev[1] == end[1])) {
            path.push(prev);
            cells[prev[0]][prev[1]].vertex_status = 'path';
            prev = cells[prev[0]][prev[1]].prev;
        }
        return path;
    }
    static generatePath(start, end, cells) {
        var path = [];
        var prev = cells[end[0]][end[1]].prev;
        while (!(prev[0] == start[0] && prev[1] == start[1])) {
            path.push(prev);
            cells[prev[0]][prev[1]].vertex_status = 'path';
            prev = cells[prev[0]][prev[1]].prev;
        }
        return path;
    }
}


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _visualizer_gridworld_gridworld_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./visualizer/gridworld/gridworld.component */ "aLal");
/* harmony import */ var _visualizer_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./visualizer/nav-bar/nav-bar.component */ "b2VE");
/* harmony import */ var _visualizer_gridcell_gridcell_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./visualizer/gridcell/gridcell.component */ "Def+");
/* harmony import */ var _visualizer_algovisualizer_algovisualizer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./visualizer/algovisualizer/algovisualizer.component */ "kgqt");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var angular2_notifications__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular2-notifications */ "Lm38");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _visualizer_helper_components_color_representation_color_representation_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./visualizer/helper_components/color-representation/color-representation.component */ "O2vY");
/* harmony import */ var _visualizer_walkthrouh_tutorial_walkthrouh_tutorial_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./visualizer//walkthrouh-tutorial/walkthrouh-tutorial.component */ "aXY2");















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
            angular2_notifications__WEBPACK_IMPORTED_MODULE_9__["SimpleNotificationsModule"].forRoot(),
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _visualizer_gridworld_gridworld_component__WEBPACK_IMPORTED_MODULE_4__["GridworldComponent"],
        _visualizer_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_5__["NavBarComponent"],
        _visualizer_gridcell_gridcell_component__WEBPACK_IMPORTED_MODULE_6__["GridcellComponent"],
        _visualizer_algovisualizer_algovisualizer_component__WEBPACK_IMPORTED_MODULE_7__["AlgovisualizerComponent"],
        _visualizer_helper_components_color_representation_color_representation_component__WEBPACK_IMPORTED_MODULE_11__["ColorRepresentationComponent"],
        _visualizer_walkthrouh_tutorial_walkthrouh_tutorial_component__WEBPACK_IMPORTED_MODULE_12__["WalkthrouhTutorialComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"], angular2_notifications__WEBPACK_IMPORTED_MODULE_9__["SimpleNotificationsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _visualizer_gridworld_gridworld_component__WEBPACK_IMPORTED_MODULE_4__["GridworldComponent"],
                    _visualizer_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_5__["NavBarComponent"],
                    _visualizer_gridcell_gridcell_component__WEBPACK_IMPORTED_MODULE_6__["GridcellComponent"],
                    _visualizer_algovisualizer_algovisualizer_component__WEBPACK_IMPORTED_MODULE_7__["AlgovisualizerComponent"],
                    _visualizer_helper_components_color_representation_color_representation_component__WEBPACK_IMPORTED_MODULE_11__["ColorRepresentationComponent"],
                    _visualizer_walkthrouh_tutorial_walkthrouh_tutorial_component__WEBPACK_IMPORTED_MODULE_12__["WalkthrouhTutorialComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                    angular2_notifications__WEBPACK_IMPORTED_MODULE_9__["SimpleNotificationsModule"].forRoot(),
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "aLal":
/*!*************************************************************!*\
  !*** ./src/app/visualizer/gridworld/gridworld.component.ts ***!
  \*************************************************************/
/*! exports provided: GridworldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridworldComponent", function() { return GridworldComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_algorithms_maze_and_pattern_Algorithms_random_patterns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/algorithms/maze_and_pattern_Algorithms/random-patterns */ "T++Q");
/* harmony import */ var src_app_algorithms_maze_and_pattern_Algorithms_recursive_division_maze__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/algorithms/maze_and_pattern_Algorithms/recursive-division-maze */ "Wo3a");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _gridcell_gridcell_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gridcell/gridcell.component */ "Def+");






const _c0 = ["cell"];
const _c1 = function (a0, a1) { return { "width": a0, "height": a1 }; };
function GridworldComponent_tr_2_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("contextmenu", function GridworldComponent_tr_2_td_1_Template_td_contextmenu_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r7.onRightClick(); })("mousedown", function GridworldComponent_tr_2_td_1_Template_td_mousedown_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.mouseDownHandler($event, y_r2, x_r5); })("mouseenter", function GridworldComponent_tr_2_td_1_Template_td_mouseenter_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.mouseEnterHandler(y_r2, x_r5); })("mouseup", function GridworldComponent_tr_2_td_1_Template_td_mouseup_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r13.mouseUpHandler(); })("dragstart", function GridworldComponent_tr_2_td_1_Template_td_dragstart_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.DragStart($event, y_r2, x_r5); })("drop", function GridworldComponent_tr_2_td_1_Template_td_drop_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.MouseUp($event, y_r2, x_r5); })("dragover", function GridworldComponent_tr_2_td_1_Template_td_dragover_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r18.DragCancel($event, y_r2, x_r5); })("touchstart", function GridworldComponent_tr_2_td_1_Template_td_touchstart_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r20.touchStart($event, y_r2, x_r5); })("touchend", function GridworldComponent_tr_2_td_1_Template_td_touchend_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r22.touchEnd($event, y_r2, x_r5); })("touchcancel", function GridworldComponent_tr_2_td_1_Template_td_touchcancel_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r24.touchCancel($event, y_r2, x_r5); })("touchmove", function GridworldComponent_tr_2_td_1_Template_td_touchmove_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const x_r5 = ctx.index; const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r26.touchMove($event, y_r2, x_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-gridcell", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const x_r5 = ctx.index;
    const y_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("draggable", ctx_r3.cells[y_r2][x_r5].status == "start" || ctx_r3.cells[y_r2][x_r5].status == "end");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](4, _c1, ctx_r3.cell_width + "vw", ctx_r3.cell_width + "vw"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("id", y_r2 + "," + x_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cell", ctx_r3.cells[y_r2][x_r5]);
} }
function GridworldComponent_tr_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GridworldComponent_tr_2_td_1_Template, 4, 7, "td", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", row_r1);
} }
// import { CellComponent } from '../cell/cell.component';
class GridworldComponent {
    constructor(ref) {
        this.ref = ref;
        this.inProcess = false;
        this.cells = [];
        this.is_touch_toll = false;
        this.iswallClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.dragged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.mousePressed = false;
        this.leftOrRight = false; //left button clicked == false, right button ==> true
        this.drag_touch = false;
        this.cell_width = 10;
        this.mobile_device = false;
    }
    ngOnInit() {
        if (window.innerWidth < 450) {
            this.cell_width = 2 * (85 / this.cells[0].length);
        }
        else {
            this.cell_width = 85 / this.cells[0].length;
        }
    }
    ;
    onResize(event) {
        this.screenWidth = event.target.screen.availWidth;
        this.grid_sizeChange();
        // console.log("cell width: ", this.cell_width , this.cells[0].length, this.screenWidth);
    }
    ;
    grid_sizeChange() {
        if (this.screenWidth < 450) {
            this.cell_width = 2 * (85 / this.cells[0].length);
        }
        else {
            this.cell_width = 85 / this.cells[0].length;
        }
    }
    ngOnChanges(changes) {
        this.grid_sizeChange();
        console.log("on change --------------------->", this.is_touch_toll);
    }
    refreshGridworld() {
        this.cellcomponents.forEach((cmp) => {
            cmp.runChangeDetector();
        });
    }
    addColors() {
        this.cellcomponents.forEach((cmp) => {
            setTimeout(() => {
                cmp.runChangeDetector();
            }, 100);
        });
    }
    tdClick(y, x) {
        if (this.cells[y][x].status == 'open') {
            this.cells[y][x].status = 'close';
        }
        else if (this.cells[y][x].status == 'close') {
            this.cells[y][x].status = 'open';
        }
        this.refreshGridworld();
    }
    onRightClick() {
        return false;
    }
    mouseEnterHandler(y, x) {
        if (this.mousePressed && !this.inProcess) {
            if (this.prev_mouseEnter != y + x) {
                if (this.leftOrRight) {
                    //right button pressed
                    if (this.cells[y][x].status == 'open' || this.cells[y][x].status == 'close') {
                        this.cells[y][x].status = 'toll';
                        // this.cells[y][x].weight = 10;
                        this.cells[y][x].weight = this.toll;
                        this.prev_mouseEnter = y + x;
                        this.refreshGridworld();
                        return;
                    }
                    else if (this.cells[y][x].status == 'toll') {
                        this.cells[y][x].status = 'open';
                        this.cells[y][x].weight = 1;
                        this.prev_mouseEnter = y + x;
                        this.refreshGridworld();
                        return;
                    }
                }
                else {
                    if (this.cells[y][x].status == 'open' || this.cells[y][x].status == 'toll') {
                        this.cells[y][x].status = 'close';
                        this.cells[y][x].weight = 1;
                        this.prev_mouseEnter = y + x;
                        this.refreshGridworld();
                        return;
                    }
                    else if (this.cells[y][x].status == 'close') {
                        this.cells[y][x].status = 'open';
                        this.prev_mouseEnter = y + x;
                        this.refreshGridworld();
                        return;
                    }
                }
            }
        }
    }
    // Left button --> Create wall
    // right button --> Create toll
    mouseDownHandler(event, y, x) {
        // console.log("this clidfghjkjhghgfg", this.is_touch_toll);
        if (!this.inProcess) {
            if (this.cells[y][x].status != 'start' && this.cells[y][x].status != 'end') {
                this.prev_mouseEnter = y + x;
                if ((event.button == 0 && !this.is_touch_toll) || (event.button == 2 && this.is_touch_toll)) {
                    // console.log('Left Clicked');
                    this.leftOrRight = false;
                    if (this.cells[y][x].status == 'close') {
                        this.cells[y][x].status = 'open';
                    }
                    else if (this.cells[y][x].status == 'open' || this.cells[y][x].status == 'toll') {
                        this.cells[y][x].weight = 1;
                        this.cells[y][x].status = 'close';
                    }
                }
                else {
                    // console.log("Right Click");
                    this.leftOrRight = true;
                    if (this.cells[y][x].status == 'toll') {
                        this.cells[y][x].weight = 1;
                        this.cells[y][x].status = 'open';
                    }
                    else {
                        // console.log("Toll : ", this.toll);
                        // this.generateRandomPatterns();
                        this.cells[y][x].status = 'toll';
                        // this.cells[y][x].weight = 10;
                        this.cells[y][x].weight = this.toll;
                    }
                }
                this.mousePressed = true;
                this.refreshGridworld();
            }
        }
    }
    mouseUpHandler() {
        this.mousePressed = false;
        this.leftOrRight = false;
        this.drag_touch = false;
        this.iswallClicked.emit(true);
    }
    resetGridworld() {
        this.cellcomponents.forEach((cmp) => {
            cmp.reset();
            cmp.removeMid();
            cmp.runChangeDetector();
        });
    }
    clearGridWorld() {
        this.cellcomponents.forEach((cmp) => {
            cmp.reset();
            cmp.removeMid();
            cmp.removeAllWall();
            cmp.removeAllTolls();
            cmp.runChangeDetector();
        });
    }
    DragStart(event, y, x) {
        if (this.cells[y][x].status != 'start' && this.cells[y][x].status != 'end') {
            event.preventDefault();
        }
        else {
            this.dragNode = [y, x];
            this.dragType = this.cells[y][x].status == 'start';
            // console.log("Drag Start at : ",y,x);
        }
    }
    dropEnd(event) {
        event.preventDefault();
    }
    MouseUp(event, y, x) {
        this.mousePressed = false;
        if (this.cells[y][x].status != 'end' && this.cells[y][x].status != 'start') {
            if (this.dragType) {
                this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
                this.cells[y][x].status = 'start';
                this.dragged.emit([true, y, x]);
            }
            else {
                this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
                this.cells[y][x].status = 'end';
                this.dragged.emit([false, y, x]);
            }
            event.preventDefault();
        }
    }
    DragCancel(event, y, x) {
        // console.log("event-- ", event);
        // console.log("eelement frorm point,",document.elementFromPoint(event.clientX, event.clientY)?.parentElement);
        if (this.dragNode[0] != y && this.dragNode[1] != x) {
            // console.log("drag cancel", x,y, this.dragNode, this.dragType);
            if (this.cells[y][x].status == 'start' || this.cells[y][x].status == 'end') {
                event.preventDefault();
            }
            else {
                if (this.dragType) {
                    this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
                    this.cells[y][x].status = 'start';
                    this.dragNode = [y, x];
                    this.dragType = true;
                    this.dragged.emit([true, y, x]);
                }
                else {
                    this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
                    this.cells[y][x].status = 'end';
                    this.dragNode = [y, x];
                    this.dragType = false;
                    this.dragged.emit([false, y, x]);
                }
            }
        }
        event.preventDefault();
    }
    createWall(index) {
        if (this.cells[index[0]][index[1]].status != 'start' && this.cells[index[0]][index[1]].status != 'end') {
            if (this.cells[index[0]][index[1]].status == 'open') {
                this.cells[index[0]][index[1]].status = 'close';
            }
            else {
                this.cells[index[0]][index[1]].status = 'open';
            }
        }
    }
    delay(value) {
        setTimeout(() => {
            this.createWall(value);
            this.cellcomponents.forEach((cmp) => {
                if (cmp.cell == this.cells[value[0]][value[1]]) {
                    cmp.runChangeDetector();
                }
            });
        }, 1000);
    }
    generateRandomPatterns() {
        src_app_algorithms_maze_and_pattern_Algorithms_random_patterns__WEBPACK_IMPORTED_MODULE_1__["Randompatterns"].generateRandomPattern(this.cells);
    }
    generateRecursiveDivisionMaze(orientation) {
        var queue = [];
        var rd = new src_app_algorithms_maze_and_pattern_Algorithms_recursive_division_maze__WEBPACK_IMPORTED_MODULE_2__["RecursiveDivisionMaze"]();
        rd.RecursiveDivision(this.cells, [0, 0], [this.cells.length - 1, this.cells[0].length - 1], orientation, queue);
        for (var i = 0; i < queue.length; i++) {
            var value = queue[i];
            if (value) {
                this.delay(value);
            }
        }
    }
    touchStart(event, y, x) {
        if (!this.inProcess) {
            if (this.cells[y][x].status != 'start' && this.cells[y][x].status != 'end') {
                this.prev_mouseEnter = y + x;
                if (this.is_touch_toll) {
                    this.leftOrRight = true;
                    if (this.cells[y][x].status == 'toll') {
                        this.cells[y][x].status = 'open';
                    }
                    else if (this.cells[y][x].status == 'open' || this.cells[y][x].status == 'close') {
                        this.cells[y][x].weight = this.toll;
                        this.cells[y][x].status = 'toll';
                    }
                }
                else {
                    this.leftOrRight = false;
                    if (this.cells[y][x].status == 'close') {
                        this.cells[y][x].status = 'open';
                    }
                    else if (this.cells[y][x].status == 'open' || this.cells[y][x].status == 'toll') {
                        this.cells[y][x].weight = 1;
                        this.cells[y][x].status = 'close';
                    }
                }
                this.mousePressed = true;
                this.refreshGridworld();
            }
            else {
                // drag start on touch
                this.dragNode = [y, x];
                this.dragType = this.cells[y][x].status == 'start';
                this.drag_touch = true;
                // console.log("Drag Start at : ",y,x);
            }
        }
    }
    touchEnd(event, y, x) {
        // console.log("touch end::  ", y,x);
        // console.log("touch end", event);
        var _a, _b;
        if (this.drag_touch) {
            var myLocation = event.changedTouches[0];
            var x_and_y = (_b = (_a = document.elementFromPoint(myLocation.clientX, myLocation.clientY)) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.id;
            if (x_and_y != '' && x_and_y != undefined) {
                var arr = x_and_y.split(',');
                y = parseInt(arr[0]);
                x = parseInt(arr[1]);
                this.dragTouchMouseUp(y, x);
            }
            this.mouseUpHandler();
        }
        else {
            this.mouseUpHandler();
        }
        if (event.cancelable) {
            event.preventDefault();
        }
        // event.preventDefault();
    }
    touchCancel(event, y, x) {
        // console.log("touch cancel::  ", y,x);
        // console.log("touch cancel", event);
        event.preventDefault();
    }
    touchMove(event, y_in, x_in) {
        // console.log("touch move::  ", y_in,x_in);
        // console.log("touch move", event);
        var _a, _b;
        var myLocation = event.changedTouches[0];
        // console.log("my location ", myLocation);
        // console.log("my location ", myLocation.clientX);
        // console.log("elment from move ",document.elementFromPoint(myLocation.clientX, myLocation.clientY)?.parentElement?.id);
        var x_and_y = (_b = (_a = document.elementFromPoint(myLocation.clientX, myLocation.clientY)) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.id;
        if (x_and_y != '' && x_and_y != undefined) {
            var arr = x_and_y.split(',');
            var y = parseInt(arr[0]);
            var x = parseInt(arr[1]);
            // console.log("x and y ", y, x);
            if (this.drag_touch) {
                this.dragTouchMove(y, x);
            }
            else {
                if (this.mousePressed && !this.inProcess) {
                    // console.log("mouse pressed and not tin prrcess", x_and_y);
                    // console.log(x_and_y.split(','));
                    // var arr = x_and_y.split(',')
                    // var y = parseInt(arr[0]);
                    // var x = parseInt(arr[1]);
                    // console.log("x and y ", y, x);
                    if (this.prev_mouseEnter != y + x) {
                        if (this.is_touch_toll) {
                            if (this.cells[y][x].status == 'open' || this.cells[y][x].status == 'close') {
                                this.cells[y][x].status = 'toll';
                                this.cells[y][x].weight = this.toll;
                                this.prev_mouseEnter = y + x;
                                this.refreshGridworld();
                                return;
                            }
                            else if (this.cells[y][x].status == 'toll') {
                                this.cells[y][x].status = 'open';
                                this.prev_mouseEnter = y + x;
                                this.refreshGridworld();
                                return;
                            }
                        }
                        else {
                            if (this.cells[y][x].status == 'open' || this.cells[y][x].status == 'toll') {
                                this.cells[y][x].status = 'close';
                                this.cells[y][x].weight = 1;
                                this.prev_mouseEnter = y + x;
                                this.refreshGridworld();
                                return;
                            }
                            else if (this.cells[y][x].status == 'close') {
                                this.cells[y][x].status = 'open';
                                this.prev_mouseEnter = y + x;
                                this.refreshGridworld();
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
    dragTouchMove(y, x) {
        if (this.dragNode[0] != y && this.dragNode[1] != x) {
            if (this.cells[y][x].status != 'start' || this.cells[y][x].status != 'end') {
                if (this.dragType) {
                    this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
                    this.cells[y][x].status = 'start';
                    this.dragNode = [y, x];
                    this.dragType = true;
                    this.dragged.emit([true, y, x]);
                }
                else {
                    this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
                    this.cells[y][x].status = 'end';
                    this.dragNode = [y, x];
                    this.dragType = false;
                    this.dragged.emit([false, y, x]);
                }
            }
        }
    }
    dragTouchMouseUp(y, x) {
        this.mousePressed = false;
        this.drag_touch = false;
        if (this.cells[y][x].status != 'end' && this.cells[y][x].status != 'start') {
            if (this.dragType) {
                this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
                this.cells[y][x].status = 'start';
                this.dragged.emit([true, y, x]);
            }
            else {
                this.cells[this.dragNode[0]][this.dragNode[1]].status = 'open';
                this.cells[y][x].status = 'end';
                this.dragged.emit([false, y, x]);
            }
        }
    }
}
GridworldComponent.ɵfac = function GridworldComponent_Factory(t) { return new (t || GridworldComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
GridworldComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GridworldComponent, selectors: [["app-gridworld"]], viewQuery: function GridworldComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.cellcomponents = _t);
    } }, hostBindings: function GridworldComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function GridworldComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, inputs: { inProcess: "inProcess", cells: "cells", toll: "toll", is_touch_toll: "is_touch_toll" }, outputs: { iswallClicked: "iswallClicked", dragged: "dragged" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 3, vars: 1, consts: [[1, "grid"], [4, "ngFor", "ngForOf"], [3, "draggable", "contextmenu", "mousedown", "mouseenter", "mouseup", "dragstart", "drop", "dragover", "touchstart", "touchend", "touchcancel", "touchmove", 4, "ngFor", "ngForOf"], [3, "draggable", "contextmenu", "mousedown", "mouseenter", "mouseup", "dragstart", "drop", "dragover", "touchstart", "touchend", "touchcancel", "touchmove"], [1, "responsive-cell", 3, "ngStyle"], [3, "id", "cell"], ["cell", ""]], template: function GridworldComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, GridworldComponent_tr_2_Template, 2, 1, "tr", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.cells);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgStyle"], _gridcell_gridcell_component__WEBPACK_IMPORTED_MODULE_4__["GridcellComponent"]], styles: ["@media (min-width: 320px) and (max-width: 450px) {\n  .grid[_ngcontent-%COMP%] {\n    width: 99vw;\n    height: 180vw;\n  }\n\n  table[_ngcontent-%COMP%] {\n    \n    \n    table-layout: fixed;\n    transform-origin: bottom left;\n    \n    \n    transform: rotate(90deg) translateX(-87vw);\n    margin-left: 5vw;\n  }\n}\n\n@media (min-width: 450px) {\n  table[_ngcontent-%COMP%] {\n    margin: auto;\n    \n    margin-top: 2.5vh;\n  }\n}\n\n@media (max-width: 320px) {\n  table[_ngcontent-%COMP%] {\n    \n    margin-top: 0vh;\n    margin-left: 3vw;\n  }\n}\n\ntable[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  border: 1px solid black;\n  cursor: default;\n}\n\n.grid[_ngcontent-%COMP%] {\n  width: 99vw;\n}\n\ntable[_ngcontent-%COMP%] {\n  \n  \n  table-layout: fixed;\n  transform-origin: bottom left;\n  \n}\n\ntd[_ngcontent-%COMP%] {\n  padding: 0;\n  \n}\n\n.cell_color[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: goldenrod;\n}\n\n.start_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: red;\n}\n\n.end_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: green;\n}\n\n.close_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: black;\n}\n\n.neighbor_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: indianred;\n}\n\n.current_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: yellow;\n}\n\n.path_cell[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-color: blueviolet;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWR3b3JsZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7SUFDRSxXQUFXO0lBQ1gsYUFBYTtFQUNmOztFQUVBO0lBQ0Usd0JBQXdCO0lBQ3hCLHNEQUFzRDtJQUN0RCxtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLGtCQUFrQjtJQUNsQiw0QkFBNEI7SUFDNUIsMENBQTBDO0lBQzFDLGdCQUFnQjtFQUNsQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLGlCQUFpQjtFQUNuQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGdCQUFnQjtFQUNsQjtBQUNGOztBQUVBOzs7RUFHRSx1QkFBdUI7RUFDdkIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFDQTtFQUNFLHdCQUF3QjtFQUN4QixzREFBc0Q7RUFDdEQsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1Y7aUJBQ2U7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLDRCQUE0QjtBQUM5QiIsImZpbGUiOiJncmlkd29ybGQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBtZWRpYSAobWluLXdpZHRoOiAzMjBweCkgYW5kIChtYXgtd2lkdGg6IDQ1MHB4KSB7XG4gIC5ncmlkIHtcbiAgICB3aWR0aDogOTl2dztcbiAgICBoZWlnaHQ6IDE4MHZ3O1xuICB9XG5cbiAgdGFibGUge1xuICAgIC8qIHRyYW5zaXRpb246IGFsbCAzczsgKi9cbiAgICAvKiB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgdHJhbnNsYXRlKDE4MHB4LCAyMDBweCk7ICovXG4gICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b20gbGVmdDtcbiAgICAvKiBtYXJnaW46IGF1dG87ICovXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogcGluazsgKi9cbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgdHJhbnNsYXRlWCgtODd2dyk7XG4gICAgbWFyZ2luLWxlZnQ6IDV2dztcbiAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNDUwcHgpIHtcbiAgdGFibGUge1xuICAgIG1hcmdpbjogYXV0bztcbiAgICAvKiBtYXJnaW4tdG9wOiA1dmg7ICovXG4gICAgbWFyZ2luLXRvcDogMi41dmg7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDMyMHB4KSB7XG4gIHRhYmxlIHtcbiAgICAvKiBtYXJnaW46IGF1dG87ICovXG4gICAgbWFyZ2luLXRvcDogMHZoO1xuICAgIG1hcmdpbi1sZWZ0OiAzdnc7XG4gIH1cbn1cblxudGFibGUsXG50aCxcbnRkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmdyaWQge1xuICB3aWR0aDogOTl2dztcbn1cbnRhYmxlIHtcbiAgLyogdHJhbnNpdGlvbjogYWxsIDNzOyAqL1xuICAvKiB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgdHJhbnNsYXRlKDE4MHB4LCAyMDBweCk7ICovXG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbSBsZWZ0O1xuICAvKiBtYXJnaW46IGF1dG87ICovXG59XG5cbnRkIHtcbiAgcGFkZGluZzogMDtcbiAgLyogd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDsgKi9cbn1cblxuLmNlbGxfY29sb3Ige1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBnb2xkZW5yb2Q7XG59XG5cbi5zdGFydF9jZWxsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uZW5kX2NlbGwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbn1cblxuLmNsb3NlX2NlbGwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbn1cblxuLm5laWdoYm9yX2NlbGwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmRpYW5yZWQ7XG59XG5cbi5jdXJyZW50X2NlbGwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XG59XG5cbi5wYXRoX2NlbGwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GridworldComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-gridworld',
                templateUrl: './gridworld.component.html',
                styleUrls: ['./gridworld.component.css'],
                host: {
                    '(window:resize)': 'onResize($event)'
                }
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, { inProcess: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], cells: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], toll: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], is_touch_toll: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], iswallClicked: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], dragged: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], cellcomponents: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"],
            args: ['cell']
        }] }); })();


/***/ }),

/***/ "aXY2":
/*!*********************************************************************************!*\
  !*** ./src/app/visualizer/walkthrouh-tutorial/walkthrouh-tutorial.component.ts ***!
  \*********************************************************************************/
/*! exports provided: WalkthrouhTutorialComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalkthrouhTutorialComponent", function() { return WalkthrouhTutorialComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");



function WalkthrouhTutorialComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WalkthrouhTutorialComponent_div_0_div_4_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.onTouch(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r1.touch_btn_val, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
function WalkthrouhTutorialComponent_div_0_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WalkthrouhTutorialComponent_div_0_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r8.onPrev(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Previous");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WalkthrouhTutorialComponent_div_0_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WalkthrouhTutorialComponent_div_0_button_9_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r10.onSkip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Skip");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WalkthrouhTutorialComponent_div_0_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WalkthrouhTutorialComponent_div_0_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r12.onNext(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Next");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WalkthrouhTutorialComponent_div_0_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WalkthrouhTutorialComponent_div_0_button_11_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r14.onSkip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "End");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WalkthrouhTutorialComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WalkthrouhTutorialComponent_div_0_div_4_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WalkthrouhTutorialComponent_div_0_Template_div_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.onSkip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, WalkthrouhTutorialComponent_div_0_button_8_Template, 2, 0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WalkthrouhTutorialComponent_div_0_button_9_Template, 2, 0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, WalkthrouhTutorialComponent_div_0_button_10_Template, 2, 0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, WalkthrouhTutorialComponent_div_0_button_11_Template, 2, 0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r0.walkthrough_steps[ctx_r0.walkthrough_page]["title"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.walkthrough_steps[ctx_r0.walkthrough_page]["touch_btn"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r0.walkthrough_steps[ctx_r0.walkthrough_page]["body"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.walkthrough_steps[ctx_r0.walkthrough_page]["prev_btn"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.walkthrough_steps[ctx_r0.walkthrough_page]["skip_btn"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.walkthrough_steps[ctx_r0.walkthrough_page]["next_btn"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.walkthrough_steps[ctx_r0.walkthrough_page]["skip_btn"]);
} }
class WalkthrouhTutorialComponent {
    constructor() {
        this.isShow = true;
        this.reset_tutorial = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.touch_btn_val = 'For Touch Devices';
        this.color_representation = `

  <div class="text-medium-light subtitle-padding">
    Color in grid represents type of Node/Block. Here are the mapping of each color with it\'s meaning.
    <div class="main_color_rep" style="margin-top:20px;">
    <div class="flex-box-item">
        <div class="start_node1 node-box"></div>
        <div class="start_node_txt">Start Node</div>
    </div>
    <div class="flex-box-item-right">
        <div class="gole_node node-box" ></div>
        <div class="gole_node_txt">Gole Node</div>
    </div>
    <div class="flex-box-item">
        <div class="blocked_node node-box"></div>
        <div class="blocked_node_txt">Blocked/Wall Node</div>
    </div>
    <div class="flex-box-item-right">
        <div class="toll_node node-box"></div>
      <div class="toll_node_txt">Toll Node</div>
    </div>

    <div class="flex-box-item">
        <div class="unvisited_node node-box"></div>
        <div class="unvisited_node_txt">Unvisitd Node</div>
    </div>
    <div class="flex-box-item-right">
        <div class="path_node node-box"></div>
      <div class="path_node_txt">Path Node</div>
    </div>
    <div class="flex-box-item2">
        <div class="visited_node visited_node1 node-box"></div>
        <div class="visited_node visited_node2 node-box"></div>
        <div class="visited_node visited_node3 node-box"></div>

        <div class="visited_node_txt">Visited Nodes</div>
    </div>
</div>
  </div>
  `;
        this.wall_block_touch = `
  <div class="text-medium-light touch-screen-wall">
      To create wall block on touch screen devices, follow below steps:
      <ol>
        <li>Uncheck "Touch to Create Toll Node" checkbox under "Advance Options" tab on navbar to enable touch to create wall capability.</li>
        <img src="assets/Screenshot (21).png" width="70%" height="50%" class="center-advance-opt-img">
        <li>Tap on cell to create wall node</li>
      </ol>
  </div> `;
        this.wall_block_click = `
  <div class="text-medium-light subtitle-padding wallnode_txt1">
  Left click on cell to create wall node
  <div class="wallnode_txt2 text-small-light">
  Wall nodes are impossible to pass through, therefore path between start and gole node will never include them.
  </div>
  <div class="text-small-light">
  Mazes and patterns of wall nodes can be generated using the "Maze and Pattern" drop-down menu on navigation bar.
  </div>
  </div>
  <img src="assets/toll_block.gif" width="80%" height="20%">`;
        this.toll_block_touch = `
  <div class="text-medium-light touch-screen-wall">
      To create toll block on touch screen devices, follow below steps:
      <ol>
        <li>Check "Touch to Create Toll Node" checkbox under "Advance Options" tab on navbar to enable touch to create toll capability.</li>
        <img src="assets/Screenshot (21).png" width="70%" height="50%" class="center-advance-opt-img">
        <li>Tap on cell to create toll node</li>
      </ol>
  </div> `;
        this.toll_block_click = `
  <div class="text-medium-light subtitle-padding wallnode_txt1">
      Right click on cell to create toll node in gridworld.
      <div class="tollnode_txt1 text-small-light">
      Unlike Wall nodes, Toll nodes allows path to pass through them,
      but there is extra cost for permission.
      </div>
      <div class="text-small-light">
      Cost of toll node can be set under Options on navbar. Five is selected as default cost. 
      <br>
      Select toll weight before creating toll block. 
      </div> 
  </div>
  <img src="assets/toll_block.gif" width="80%" height="40%">`;
        this.walkthrough_steps = [
            {
                title: 'AlgoVisualizer',
                body: `
    <div class="text-medium-heavy">
        A fun way to visualize algorithms
    </div>
    <div class="text-medium-light subtitle-padding">
        Welcome, Let's Have a walkthrough of this tool
    </div>
    <img src="assets/Visualization_Intro.gif" width="80%" height="50%">`,
                next_btn: true,
                prev_btn: false,
                skip_btn: true,
                touch_btn: false,
            },
            {
                title: 'Visualiztion Buttons',
                body: `
    <img src="assets/algoVisualizer_btns.PNG" width="80%" height="50%">
    <div class="text-medium-light subtitle-padding">
    Use navigation bar buttons to visualize algorithm, clear visualization and reset/remove grid blocks.
    </div>
    `,
                next_btn: true,
                prev_btn: true,
                skip_btn: true,
                touch_btn: false,
            },
            {
                title: "Colors and It's Representations",
                body: this.color_representation,
                next_btn: true,
                prev_btn: true,
                skip_btn: true,
                touch_btn: false,
            },
            {
                title: 'Wall Blocks',
                body: this.wall_block_click,
                next_btn: true,
                prev_btn: true,
                skip_btn: true,
                touch_btn: true,
            },
            {
                title: 'Toll Blocks <span class="toll_subtxt">only effactive for waighted algorithms</span>',
                body: this.toll_block_click,
                next_btn: true,
                prev_btn: true,
                skip_btn: true,
                touch_btn: true,
            },
            {
                title: 'Drag and Drop',
                body: `
    <div class="text-medium-light subtitle-padding">
    Left click on Start or Goal cells and drag to move them and see the instant path change between them. 
    </div>
    <img src="assets/drag_drop.gif" width="100%" height="50%">
    `,
                next_btn: false,
                prev_btn: true,
                skip_btn: false,
                touch_btn: false,
            },
        ];
        this.walkthrough_page = 0;
        this.message = 'hello world';
    }
    ngOnInit() {
        console.log(this.walkthrough_steps);
    }
    onSkip() {
        this.walkthrough_page = 0;
        this.isShow = false;
        this.reset_tutorial.emit(false);
    }
    onPrev() {
        this.walkthrough_page = this.walkthrough_page - 1;
    }
    onNext() {
        this.walkthrough_page = this.walkthrough_page + 1;
    }
    onTouch() {
        if (this.touch_btn_val == 'For Touch Devices') {
            if (this.walkthrough_steps[this.walkthrough_page]['title'] == 'Wall Blocks') {
                this.walkthrough_steps[this.walkthrough_page]['body'] =
                    this.wall_block_touch;
                this.touch_btn_val = 'For Click Devices';
            }
            else {
                this.walkthrough_steps[this.walkthrough_page]['body'] =
                    this.toll_block_touch;
                this.touch_btn_val = 'For Click Devices';
            }
        }
        else {
            if (this.walkthrough_steps[this.walkthrough_page]['title'] == 'Wall Blocks') {
                this.walkthrough_steps[this.walkthrough_page]['body'] =
                    this.wall_block_click;
                this.touch_btn_val = 'For Touch Devices';
            }
            else {
                this.walkthrough_steps[this.walkthrough_page]['body'] =
                    this.toll_block_click;
                this.touch_btn_val = 'For Touch Devices';
            }
        }
        console.log('walkthorough page', this.walkthrough_steps[this.walkthrough_page]['title']);
    }
}
WalkthrouhTutorialComponent.ɵfac = function WalkthrouhTutorialComponent_Factory(t) { return new (t || WalkthrouhTutorialComponent)(); };
WalkthrouhTutorialComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WalkthrouhTutorialComponent, selectors: [["app-walkthrouh-tutorial"]], inputs: { isShow: ["walkthrough_isShow", "isShow"] }, outputs: { reset_tutorial: "reset_tutorial" }, decls: 1, vars: 1, consts: [["class", "main-tutorial-window", 4, "ngIf"], [1, "main-tutorial-window"], [1, "tutorial-subwindow"], [1, "walkthrough-title"], [1, "title-name", 3, "innerHTML"], ["class", "touch_device_btn", 4, "ngIf"], [1, "cancel-button", 3, "click"], [1, "walkthrough-body", 3, "innerHTML"], [1, "walkthrough-footer"], [3, "click", 4, "ngIf"], [1, "touch_device_btn"], [3, "innerHTML", "click"], [3, "click"]], template: function WalkthrouhTutorialComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WalkthrouhTutorialComponent_div_0_Template, 12, 7, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isShow);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"]], styles: [".main_color_rep {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  padding: 10px;\n}\n\n.flex-box-item {\n  flex-basis: 60%;\n  text-align: left;\n  padding: 10px;\n}\n\n.flex-box-item-right {\n  flex-basis: 40%;\n  text-align: left;\n  padding: 10px;\n}\n\n.flex-box-item2 {\n  flex-basis: 100%;\n  text-align: left;\n  padding: 10px;\n}\n\n.main-tutorial-window {\n  width: 40%;\n  top: 5%;\n  left: 30%;\n  /* width: 100vw;\n  height: 100vh; */\n  /* background-color: rgba(0, 0, 0, 0.3); */\n  position: absolute;\n  z-index: 1000;\n  color: rgba(153, 194, 133, 1);\n}\n\n.tutorial-subwindow {\n  overflow: hidden;\n  /* max-width: 500px; */\n  /* width: 400px; */\n  width: 100%;\n  height: auto;\n  background: gray;\n  text-align: center;\n  /* margin: 10% auto; */\n  border-radius: 5%;\n}\n\n.title-name {\n  background-color: transparent;\n  cursor: pointer;\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 500;\n  font-size: 25px;\n  color: rgba(153, 194, 133, 1);\n  text-decoration: none;\n}\n\n.walkthrough-title {\n  background-color: #24252a;\n  padding: 2%;\n  align-items: center;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n}\n\n.walkthrough-body {\n  /* background-color: #343747; */\n  background-color: #343435;\n  padding: 20px;\n}\n\n.walkthrough-footer {\n  background-color: #24252a;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  padding: 10px;\n}\n\n.walkthrough-footer button {\n  padding: 9px 25px;\n  background-color: rgba(153, 194, 133, 1);\n  color: #24252a;\n  border: none;\n  border-radius: 50px;\n  cursor: pointer;\n  transition: all 0.3s ease 0s;\n}\n\n.walkthrough-footer button:hover {\n  background-color: #ad70d7;\n  color: #fff;\n}\n\n.touch_device_btn button {\n  padding: 9px;\n  background-color: rgba(153, 194, 133, 1);\n  color: #24252a;\n  border: none;\n  border-radius: 70px;\n  cursor: pointer;\n  transition: all 0.3s ease 0s;\n}\n\n.touch_device_btn button:hover {\n  background-color: #ad70d7;\n  color: #fff;\n}\n\n.cancel-button {\n  position: relative;\n  /* right: 20px; */\n  top: 10px;\n  width: 32px;\n  height: 32px;\n  opacity: 0.3;\n}\n\n.cancel-button:hover {\n  opacity: 1;\n}\n\n.cancel-button:before,\n.cancel-button:after {\n  position: absolute;\n  left: 15px;\n  content: \" \";\n  /* height: 33px; */\n  height: 20px;\n  width: 2px;\n  background-color: rgba(153, 194, 133);\n}\n\n.cancel-button:before {\n  transform: rotate(45deg);\n}\n\n.cancel-button:after {\n  transform: rotate(-45deg);\n}\n\n/* ======================================================== */\n\n.tutorial_btn {\n  background-color: cornsilk;\n  margin-top: 80px;\n  margin-left: 10px;\n  width: 200px;\n}\n\n.container-fluid {\n  width: 100%;\n  height: 100vh;\n  text-align: center;\n  padding-top: 10px;\n  margin-bottom: 250px;\n  /* padding-bottom: 20px; */\n}\n\n.info {\n  widows: 100%;\n  height: 20vh;\n  background-color: goldenrod;\n}\n\n.droptarget {\n  float: left;\n  width: 100px;\n  height: 35px;\n  margin: 15px;\n  padding: 10px;\n  border: 5px solid red;\n}\n\n.footer {\n  padding: 0;\n  margin: 0;\n  text-align: center;\n  height: 50px;\n\n  /* background-color: #f8f9fa !important; */\n\n  background-color: #24252a !important;\n  bottom: -20px;\n}\n\n.node-box {\n  height: 30px;\n  width: 30px;\n  border: 1px solid black;\n}\n\n.start_node {\n  height: 50px;\n}\n\n.start {\n  float: left;\n  background-color: sandybrown;\n  margin-left: 10px;\n}\n\n.statr_txt {\n  float: left;\n  margin-left: 5px;\n}\n\n.start_node1 {\n  float: left;\n  background-color: #ff005f;\n}\n\n.start_node_txt {\n  float: left;\n  margin-left: 5px;\n}\n\n.gole_node {\n  float: left;\n  background-color: green;\n  /* margin-left: 80px; */\n}\n\n.gole_node_txt {\n  float: left;\n  margin-left: 5px;\n}\n\n.blocked_node {\n  float: left;\n  background-color: #000347;\n}\n\n.blocked_node_txt {\n  float: left;\n  margin-left: 5px;\n}\n\n.toll_node {\n  float: left;\n  background-color: rgb(230, 120, 120);\n}\n\n.toll_node_txt {\n  float: left;\n  margin-left: 5px;\n}\n\n.unvisited_node {\n  float: left;\n  background-color: white;\n  /* margin-left: 10px; */\n}\n\n.unvisited_node_txt {\n  float: left;\n  margin-left: 5px;\n}\n\n.path_node {\n  float: left;\n  background-color: dodgerblue;\n  /* margin-left: 55px; */\n}\n\n.path_node_txt {\n  float: left;\n  margin-left: 5px;\n}\n\n.visited_node {\n  float: left;\n  /* margin-left: 10px; */\n}\n\n.visited_node1 {\n  background-color: #ffd300;\n}\n\n.visited_node2 {\n  background-color: #00ffb6;\n  margin-left: 10px;\n}\n\n.visited_node3 {\n  background-color: #cc00ff;\n  margin-left: 10px;\n}\n\n.visited_node_txt {\n  float: left;\n  margin-left: 5px;\n}\n\n.text-medium-heavy {\n  font-family: \"Montserrat\", sans-serif;\n  font-size: 20px;\n  color: #edf0f1;\n  text-decoration: none;\n}\n\n.text-medium-light {\n  font-family: \"Montserrat\", sans-serif;\n  /* font-weight: 500; */\n  font-size: 16px;\n  color: #edf0f1;\n  text-decoration: none;\n}\n\n.text-small-light {\n  font-family: \"Montserrat\", sans-serif;\n  /* font-weight: 500; */\n  font-size: 13px;\n  color: #edf0f1;\n  text-decoration: none;\n}\n\n.subtitle-padding {\n  padding: 10px;\n}\n\n.touch-screen-wall {\n  text-align: left;\n}\n\n.center-advance-opt-img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.logo {\n  cursor: pointer;\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 500;\n  font-size: 21px;\n  color: rgba(153, 194, 133, 1);\n  text-decoration: none;\n}\n\n.wallnode_txt1 {\n  text-align: left;\n  padding-top: 0px;\n}\n\n.wallnode_txt2 {\n  padding-top: 5px;\n  padding-bottom: 7px;\n}\n\n.tollnode_txt1 {\n  padding-top: 5px;\n  padding-bottom: 3px;\n}\n\n.toll_subtxt {\n  font-family: \"Montserrat\", sans-serif;\n  /* font-weight: 500; */\n  font-size: 10px;\n  color: #edf0f1;\n  text-decoration: none;\n}\n\n@media (max-width: 1024px) {\n  .main-tutorial-window {\n    width: 50%;\n    top: 3%;\n    left: 25%;\n  }\n}\n\n@media (max-width: 820px) {\n  .main-tutorial-window {\n    width: 60%;\n    top: 10%;\n    left: 20%;\n  }\n\n  .node-box {\n    height: 20px;\n    width: 20px;\n    border: 1px solid black;\n  }\n}\n\n@media (max-width: 640px) {\n  .main-tutorial-window {\n    width: 70%;\n    top: 10%;\n    left: 15%;\n  }\n\n  .walkthrough-body {\n    padding: 5px;\n  }\n}\n\n@media (max-width: 505px) {\n  .main-tutorial-window {\n    width: 90%;\n    top: 20%;\n    left: 5%;\n  }\n\n  .flex-box-item {\n    flex-basis: 100%;\n  }\n\n  .flex-box-item-right {\n    flex-basis: 100%;\n  }\n\n  .walkthrough-body {\n    padding: 10px;\n  }\n}\n\n@media (max-width: 320px) {\n  .main-tutorial-window {\n    width: 90%;\n    top: 20%;\n    left: 5%;\n  }\n\n  .walkthrough-body {\n    padding: 0px;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhbGt0aHJvdWgtdHV0b3JpYWwuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFVBQVU7RUFDVixPQUFPO0VBQ1AsU0FBUztFQUNUO2tCQUNnQjtFQUNoQiwwQ0FBMEM7RUFDMUMsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2YscUNBQXFDO0VBQ3JDLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsNkJBQTZCO0VBQzdCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7QUFDckI7O0FBQ0E7RUFDRSwrQkFBK0I7RUFDL0IseUJBQXlCO0VBQ3pCLGFBQWE7QUFDZjs7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsd0NBQXdDO0VBQ3hDLGNBQWM7RUFDZCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGVBQWU7RUFDZiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHdDQUF3QztFQUN4QyxjQUFjO0VBQ2QsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUNBO0VBQ0UsVUFBVTtBQUNaOztBQUNBOztFQUVFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osVUFBVTtFQUNWLHFDQUFxQztBQUN2Qzs7QUFDQTtFQUNFLHdCQUF3QjtBQUMxQjs7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQSw2REFBNkQ7O0FBRTdEO0VBQ0UsMEJBQTBCO0VBQzFCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUNBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQiwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0VBQ2IscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxrQkFBa0I7RUFDbEIsWUFBWTs7RUFFWiwwQ0FBMEM7O0VBRTFDLG9DQUFvQztFQUNwQyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLHVCQUF1QjtBQUN6Qjs7QUFDQTtFQUNFLFlBQVk7QUFDZDs7QUFDQTtFQUNFLFdBQVc7RUFDWCw0QkFBNEI7RUFDNUIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsV0FBVztFQUNYLHVCQUF1QjtFQUN2Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx1QkFBdUI7RUFDdkIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCw0QkFBNEI7RUFDNUIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxxQ0FBcUM7RUFDckMsZUFBZTtFQUNmLGNBQWM7RUFDZCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQ0FBcUM7RUFDckMsc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUNBQXFDO0VBQ3JDLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUNBO0VBQ0UsZUFBZTtFQUNmLHFDQUFxQztFQUNyQyxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLDZCQUE2QjtFQUM3QixxQkFBcUI7QUFDdkI7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxxQ0FBcUM7RUFDckMsc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUNBO0VBQ0U7SUFDRSxVQUFVO0lBQ1YsT0FBTztJQUNQLFNBQVM7RUFDWDtBQUNGOztBQUVBO0VBQ0U7SUFDRSxVQUFVO0lBQ1YsUUFBUTtJQUNSLFNBQVM7RUFDWDs7RUFFQTtJQUNFLFlBQVk7SUFDWixXQUFXO0lBQ1gsdUJBQXVCO0VBQ3pCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFVBQVU7SUFDVixRQUFRO0lBQ1IsU0FBUztFQUNYOztFQUVBO0lBQ0UsWUFBWTtFQUNkO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFVBQVU7SUFDVixRQUFRO0lBQ1IsUUFBUTtFQUNWOztFQUVBO0lBQ0UsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsYUFBYTtFQUNmO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFVBQVU7SUFDVixRQUFRO0lBQ1IsUUFBUTtFQUNWOztFQUVBO0lBQ0UsWUFBWTtFQUNkO0FBQ0YiLCJmaWxlIjoid2Fsa3Rocm91aC10dXRvcmlhbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW5fY29sb3JfcmVwIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleC13cmFwOiB3cmFwO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4uZmxleC1ib3gtaXRlbSB7XG4gIGZsZXgtYmFzaXM6IDYwJTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZzogMTBweDtcbn1cblxuLmZsZXgtYm94LWl0ZW0tcmlnaHQge1xuICBmbGV4LWJhc2lzOiA0MCU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5mbGV4LWJveC1pdGVtMiB7XG4gIGZsZXgtYmFzaXM6IDEwMCU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5tYWluLXR1dG9yaWFsLXdpbmRvdyB7XG4gIHdpZHRoOiA0MCU7XG4gIHRvcDogNSU7XG4gIGxlZnQ6IDMwJTtcbiAgLyogd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoOyAqL1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7ICovXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTAwMDtcbiAgY29sb3I6IHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG59XG5cbi50dXRvcmlhbC1zdWJ3aW5kb3cge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICAvKiBtYXgtd2lkdGg6IDUwMHB4OyAqL1xuICAvKiB3aWR0aDogNDAwcHg7ICovXG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG4gIGJhY2tncm91bmQ6IGdyYXk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgLyogbWFyZ2luOiAxMCUgYXV0bzsgKi9cbiAgYm9yZGVyLXJhZGl1czogNSU7XG59XG5cbi50aXRsZS1uYW1lIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1mYW1pbHk6IFwiTW9udHNlcnJhdFwiLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDI1cHg7XG4gIGNvbG9yOiByZ2JhKDE1MywgMTk0LCAxMzMsIDEpO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi53YWxrdGhyb3VnaC10aXRsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyNDI1MmE7XG4gIHBhZGRpbmc6IDIlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cbi53YWxrdGhyb3VnaC1ib2R5IHtcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogIzM0Mzc0NzsgKi9cbiAgYmFja2dyb3VuZC1jb2xvcjogIzM0MzQzNTtcbiAgcGFkZGluZzogMjBweDtcbn1cbi53YWxrdGhyb3VnaC1mb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjQyNTJhO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgcGFkZGluZzogMTBweDtcbn1cblxuLndhbGt0aHJvdWdoLWZvb3RlciBidXR0b24ge1xuICBwYWRkaW5nOiA5cHggMjVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNTMsIDE5NCwgMTMzLCAxKTtcbiAgY29sb3I6ICMyNDI1MmE7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlIDBzO1xufVxuXG4ud2Fsa3Rocm91Z2gtZm9vdGVyIGJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhZDcwZDc7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4udG91Y2hfZGV2aWNlX2J0biBidXR0b24ge1xuICBwYWRkaW5nOiA5cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGNvbG9yOiAjMjQyNTJhO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDcwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZSAwcztcbn1cblxuLnRvdWNoX2RldmljZV9idG4gYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FkNzBkNztcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5jYW5jZWwtYnV0dG9uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAvKiByaWdodDogMjBweDsgKi9cbiAgdG9wOiAxMHB4O1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBvcGFjaXR5OiAwLjM7XG59XG4uY2FuY2VsLWJ1dHRvbjpob3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG4uY2FuY2VsLWJ1dHRvbjpiZWZvcmUsXG4uY2FuY2VsLWJ1dHRvbjphZnRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMTVweDtcbiAgY29udGVudDogXCIgXCI7XG4gIC8qIGhlaWdodDogMzNweDsgKi9cbiAgaGVpZ2h0OiAyMHB4O1xuICB3aWR0aDogMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE1MywgMTk0LCAxMzMpO1xufVxuLmNhbmNlbC1idXR0b246YmVmb3JlIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xufVxuLmNhbmNlbC1idXR0b246YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4udHV0b3JpYWxfYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogY29ybnNpbGs7XG4gIG1hcmdpbi10b3A6IDgwcHg7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICB3aWR0aDogMjAwcHg7XG59XG4uY29udGFpbmVyLWZsdWlkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwdmg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDI1MHB4O1xuICAvKiBwYWRkaW5nLWJvdHRvbTogMjBweDsgKi9cbn1cblxuLmluZm8ge1xuICB3aWRvd3M6IDEwMCU7XG4gIGhlaWdodDogMjB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ29sZGVucm9kO1xufVxuXG4uZHJvcHRhcmdldCB7XG4gIGZsb2F0OiBsZWZ0O1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMzVweDtcbiAgbWFyZ2luOiAxNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBib3JkZXI6IDVweCBzb2xpZCByZWQ7XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgaGVpZ2h0OiA1MHB4O1xuXG4gIC8qIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmEgIWltcG9ydGFudDsgKi9cblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjQyNTJhICFpbXBvcnRhbnQ7XG4gIGJvdHRvbTogLTIwcHg7XG59XG5cbi5ub2RlLWJveCB7XG4gIGhlaWdodDogMzBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuLnN0YXJ0X25vZGUge1xuICBoZWlnaHQ6IDUwcHg7XG59XG4uc3RhcnQge1xuICBmbG9hdDogbGVmdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogc2FuZHlicm93bjtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5cbi5zdGF0cl90eHQge1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLnN0YXJ0X25vZGUxIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjAwNWY7XG59XG5cbi5zdGFydF9ub2RlX3R4dCB7XG4gIGZsb2F0OiBsZWZ0O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuLmdvbGVfbm9kZSB7XG4gIGZsb2F0OiBsZWZ0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgLyogbWFyZ2luLWxlZnQ6IDgwcHg7ICovXG59XG5cbi5nb2xlX25vZGVfdHh0IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi5ibG9ja2VkX25vZGUge1xuICBmbG9hdDogbGVmdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDM0Nztcbn1cblxuLmJsb2NrZWRfbm9kZV90eHQge1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLnRvbGxfbm9kZSB7XG4gIGZsb2F0OiBsZWZ0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjMwLCAxMjAsIDEyMCk7XG59XG5cbi50b2xsX25vZGVfdHh0IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi51bnZpc2l0ZWRfbm9kZSB7XG4gIGZsb2F0OiBsZWZ0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgLyogbWFyZ2luLWxlZnQ6IDEwcHg7ICovXG59XG5cbi51bnZpc2l0ZWRfbm9kZV90eHQge1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLnBhdGhfbm9kZSB7XG4gIGZsb2F0OiBsZWZ0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBkb2RnZXJibHVlO1xuICAvKiBtYXJnaW4tbGVmdDogNTVweDsgKi9cbn1cblxuLnBhdGhfbm9kZV90eHQge1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLnZpc2l0ZWRfbm9kZSB7XG4gIGZsb2F0OiBsZWZ0O1xuICAvKiBtYXJnaW4tbGVmdDogMTBweDsgKi9cbn1cblxuLnZpc2l0ZWRfbm9kZTEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkMzAwO1xufVxuXG4udmlzaXRlZF9ub2RlMiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGZmYjY7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG4udmlzaXRlZF9ub2RlMyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjYzAwZmY7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG4udmlzaXRlZF9ub2RlX3R4dCB7XG4gIGZsb2F0OiBsZWZ0O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG4udGV4dC1tZWRpdW0taGVhdnkge1xuICBmb250LWZhbWlseTogXCJNb250c2VycmF0XCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgY29sb3I6ICNlZGYwZjE7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLnRleHQtbWVkaXVtLWxpZ2h0IHtcbiAgZm9udC1mYW1pbHk6IFwiTW9udHNlcnJhdFwiLCBzYW5zLXNlcmlmO1xuICAvKiBmb250LXdlaWdodDogNTAwOyAqL1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiAjZWRmMGYxO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi50ZXh0LXNtYWxsLWxpZ2h0IHtcbiAgZm9udC1mYW1pbHk6IFwiTW9udHNlcnJhdFwiLCBzYW5zLXNlcmlmO1xuICAvKiBmb250LXdlaWdodDogNTAwOyAqL1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjZWRmMGYxO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5zdWJ0aXRsZS1wYWRkaW5nIHtcbiAgcGFkZGluZzogMTBweDtcbn1cblxuLnRvdWNoLXNjcmVlbi13YWxsIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmNlbnRlci1hZHZhbmNlLW9wdC1pbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn1cbi5sb2dvIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LWZhbWlseTogXCJNb250c2VycmF0XCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMjFweDtcbiAgY29sb3I6IHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cbi53YWxsbm9kZV90eHQxIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZy10b3A6IDBweDtcbn1cblxuLndhbGxub2RlX3R4dDIge1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogN3B4O1xufVxuXG4udG9sbG5vZGVfdHh0MSB7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG4gIHBhZGRpbmctYm90dG9tOiAzcHg7XG59XG5cbi50b2xsX3N1YnR4dCB7XG4gIGZvbnQtZmFtaWx5OiBcIk1vbnRzZXJyYXRcIiwgc2Fucy1zZXJpZjtcbiAgLyogZm9udC13ZWlnaHQ6IDUwMDsgKi9cbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogI2VkZjBmMTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMjRweCkge1xuICAubWFpbi10dXRvcmlhbC13aW5kb3cge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgdG9wOiAzJTtcbiAgICBsZWZ0OiAyNSU7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDgyMHB4KSB7XG4gIC5tYWluLXR1dG9yaWFsLXdpbmRvdyB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICB0b3A6IDEwJTtcbiAgICBsZWZ0OiAyMCU7XG4gIH1cblxuICAubm9kZS1ib3gge1xuICAgIGhlaWdodDogMjBweDtcbiAgICB3aWR0aDogMjBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNjQwcHgpIHtcbiAgLm1haW4tdHV0b3JpYWwtd2luZG93IHtcbiAgICB3aWR0aDogNzAlO1xuICAgIHRvcDogMTAlO1xuICAgIGxlZnQ6IDE1JTtcbiAgfVxuXG4gIC53YWxrdGhyb3VnaC1ib2R5IHtcbiAgICBwYWRkaW5nOiA1cHg7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDUwNXB4KSB7XG4gIC5tYWluLXR1dG9yaWFsLXdpbmRvdyB7XG4gICAgd2lkdGg6IDkwJTtcbiAgICB0b3A6IDIwJTtcbiAgICBsZWZ0OiA1JTtcbiAgfVxuXG4gIC5mbGV4LWJveC1pdGVtIHtcbiAgICBmbGV4LWJhc2lzOiAxMDAlO1xuICB9XG5cbiAgLmZsZXgtYm94LWl0ZW0tcmlnaHQge1xuICAgIGZsZXgtYmFzaXM6IDEwMCU7XG4gIH1cblxuICAud2Fsa3Rocm91Z2gtYm9keSB7XG4gICAgcGFkZGluZzogMTBweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgLm1haW4tdHV0b3JpYWwtd2luZG93IHtcbiAgICB3aWR0aDogOTAlO1xuICAgIHRvcDogMjAlO1xuICAgIGxlZnQ6IDUlO1xuICB9XG5cbiAgLndhbGt0aHJvdWdoLWJvZHkge1xuICAgIHBhZGRpbmc6IDBweDtcbiAgfVxufVxuIl19 */"], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WalkthrouhTutorialComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-walkthrouh-tutorial',
                templateUrl: './walkthrouh-tutorial.component.html',
                styleUrls: ['./walkthrouh-tutorial.component.css'],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            }]
    }], function () { return []; }, { isShow: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['walkthrough_isShow']
        }], reset_tutorial: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "b2VE":
/*!*********************************************************!*\
  !*** ./src/app/visualizer/nav-bar/nav-bar.component.ts ***!
  \*********************************************************/
/*! exports provided: NavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavBarComponent", function() { return NavBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_models_navInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/models/navInfo */ "T3EP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




class NavBarComponent {
    constructor() {
        this.information = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.grid_size = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.weight_values = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](); //0 index ==> diagonal weight, 1 index ==> toll weight
        this.mazesAndPatterns = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.is_touch_toll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.toVis = new src_app_models_navInfo__WEBPACK_IMPORTED_MODULE_1__["NavInfo"]();
        this.favoriteColor = 5;
        this.diagonal_weight = 1.42;
        this.toll_weight = 5;
        this.maze_pattern = "Blank Grid";
        this.custom_grid_size = 30;
        this.isHamburger_status = false;
        this.is_touch_screen = false;
        this.toVis.algorithm = "Algorithms";
        this.toVis.algorithmSpeed = 50;
        this.advance_setting = false;
    }
    ngOnInit() {
        this.updateWeights();
    }
    RunVisualizer() {
        if (window.innerWidth < 1140) {
            // $('#hamburger_btn').click();
            this.isHamburger_status = false;
        }
        if (this.toVis.algorithm != "Algorithms") {
            this.reset.emit(true);
            // var oldspeed = this.toVis.algorithmSpeed;
            // this.toVis.algorithmSpeed = 400-oldspeed;
            let id = window.setTimeout(() => { this.information.emit(this.toVis); }, 100);
        }
        else {
            this.information.emit(this.toVis);
        }
    }
    changeTouchSetting() {
        this.is_touch_screen = !this.is_touch_screen;
        this.is_touch_toll.emit(this.is_touch_screen);
        console.log("change touch setting");
    }
    RunReset() {
        if (window.innerWidth < 1140) {
            // $('#hamburger_btn').click();
            this.isHamburger_status = false;
        }
        this.reset.emit(true);
    }
    RunResetAll() {
        if (window.innerWidth < 1140) {
            // $('#hamburger_btn').click();
            this.isHamburger_status = false;
        }
        this.reset.emit(false);
    }
    mazesAndPattern(maze_type) {
        if (window.innerWidth < 1140) {
            // $('#hamburger_btn').click();
            this.isHamburger_status = false;
        }
        this.maze_pattern = maze_type;
        this.reset.emit(false);
        this.mazesAndPatterns.emit(this.maze_pattern);
    }
    turn_walkthrough_tutorial() {
        this.reset.emit(false);
        this.mazesAndPatterns.emit('isWalkthrough');
    }
    ResetGridSize(n) {
        this.custom_grid_size = n;
        this.grid_size.emit(n);
    }
    updateWeights() {
        if ((this.diagonal_weight <= 100 && this.diagonal_weight >= 0) && (this.toll_weight <= 100 && this.toll_weight >= 0)) {
            this.weight_values.emit([this.diagonal_weight, this.toll_weight]);
        }
        else {
            if (this.diagonal_weight > 100) {
                this.diagonal_weight = 100;
            }
            else if (this.diagonal_weight <= 0) {
                this.diagonal_weight = 0;
            }
            if (this.toll_weight > 100) {
                this.toll_weight = 100;
            }
            else if (this.toll_weight <= 0) {
                this.toll_weight = 0;
            }
            this.weight_values.emit([this.diagonal_weight, this.toll_weight]);
        }
    }
    increment_num(t) {
        if (t == 0) {
            if (this.toll_weight < 100) {
                this.toll_weight = this.toll_weight + 1;
            }
        }
        else if (t == 1) {
            if (this.diagonal_weight < 100) {
                this.diagonal_weight = this.diagonal_weight + 1;
            }
        }
        this.weight_values.emit([this.diagonal_weight, this.toll_weight]);
        // this.updateWeights();
    }
    decrement_num(t) {
        if (t == 0) {
            if (this.toll_weight > 1) {
                this.toll_weight = this.toll_weight - 1;
            }
        }
        else if (t == 1) {
            if (this.diagonal_weight > 1) {
                this.diagonal_weight = this.diagonal_weight - 1;
            }
        }
        this.weight_values.emit([this.diagonal_weight, this.toll_weight]);
        // this.updateWeights();
    }
}
NavBarComponent.ɵfac = function NavBarComponent_Factory(t) { return new (t || NavBarComponent)(); };
NavBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavBarComponent, selectors: [["app-nav-bar"]], outputs: { information: "information", reset: "reset", grid_size: "grid_size", weight_values: "weight_values", mazesAndPatterns: "mazesAndPatterns", is_touch_toll: "is_touch_toll" }, decls: 124, vars: 42, consts: [[2, "width", "100vw", "z-index", "10", "position", "absolute"], [1, "logo", "navhome", 3, "click"], ["href", "#", "id", "hamburger_btn", 1, "toggle__button", 3, "click"], [1, "toggle__bar"], [1, "nav__links"], ["href", "#"], [2, "width", "250px"], [3, "click"], [2, "width", "500px"], [1, "advanceOpt"], [1, "sub_advanceopt"], ["for", "allow_diagonal", 1, "custom-checkbox"], ["type", "checkbox", "id", "allow_diagonal", 1, "custom-checkbox__input", 3, "change"], [1, "custom-checkbox__box"], ["for", "diagonal_w"], [1, "container"], [1, "next", 3, "click"], [1, "prev", 3, "click"], [1, "box_outer"], ["type", "number", "step", "0.1", "max", "100", "min", "1", 1, "box", 3, "value", "ngModel", "ngModelChange", "focusout"], ["for", "allow_bidirection", 1, "custom-checkbox"], ["type", "checkbox", "id", "allow_bidirection", 1, "custom-checkbox__input", 3, "change"], ["for", "toll_w"], ["id", "toll_w", "type", "number", "step", "0.1", "max", "100", "min", "1", 1, "box", 3, "value", "ngModel", "ngModelChange", "focusout"], [1, "advanceOpt", 2, "background-color", "#24252a"], [2, "text-align", "center"], ["for", "Heuristics_manhattan", 1, "custom-radio-btn"], ["type", "radio", "id", "Heuristics_manhattan", "name", "Heuristics", "checked", "", 1, "radio__input", 3, "click"], [1, "radio__radio"], ["for", "Heuristics_euclidean", 1, "custom-radio-btn"], ["type", "radio", "id", "Heuristics_euclidean", "name", "Heuristics", 1, "radio__input", 3, "click"], [1, "slider-continer"], [1, "slider-bar"], [1, "slider-fill"], ["type", "range", "min", "0", "max", "400", "value", "350", "id", "formControlRange", 1, "custom-slider", 3, "ngModel", "ngModelChange"], ["for", "is_touch_toll", 1, "custom-checkbox"], ["type", "checkbox", "id", "is_touch_toll", 1, "custom-checkbox__input", 3, "change"], [1, "nav__buttons"], ["href", "#", 1, "cta"], ["type", "submit", 3, "click"]], template: function NavBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_div_click_1_listener() { return ctx.turn_walkthrough_tutorial(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " AlgoVisualizer ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_a_click_3_listener() { return ctx.isHamburger_status = !ctx.isHamburger_status; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ul", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Algorithms");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ul", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_12_listener() { return ctx.toVis.algorithm = "BFS"; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " BFS (Breadth First Search) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_14_listener() { return ctx.toVis.algorithm = "DFS"; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " DFS (Depth First Search) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_16_listener() { return ctx.toVis.algorithm = "Dijkstra"; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Dijkstra's ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_18_listener() { return ctx.toVis.algorithm = "A* algorithm"; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " A* Algorithm ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Grid Size");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_24_listener() { return ctx.ResetGridSize(10); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " 10 X 20 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_26_listener() { return ctx.ResetGridSize(20); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " 20 X 40 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_28_listener() { return ctx.ResetGridSize(30); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, " 30 X 60 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_30_listener() { return ctx.ResetGridSize(40); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " 40 X 80 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_32_listener() { return ctx.ResetGridSize(50); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " 50 X 100 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Pattern & Maze");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "ul", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_38_listener() { return ctx.mazesAndPattern("Blank Grid"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " Blank Grid ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_40_listener() { return ctx.mazesAndPattern("Random Pattern"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " Random Pattern ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_42_listener() { return ctx.mazesAndPattern("Recursive Division"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " Recursive Division ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_44_listener() { return ctx.mazesAndPattern("Recursive Division (Verticle skew)"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, " Recursive Division (Verticle Skew) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_li_click_46_listener() { return ctx.mazesAndPattern("Recursive Division (Horizontal skew)"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, " Recursive Division (Horizontal Skew) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Advance Options");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "ul", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function NavBarComponent_Template_input_change_55_listener() { return ctx.toVis.allowDiagonals = !ctx.toVis.allowDiagonals; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, " Allow Diagonals ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "Diagonal Weight ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_span_click_62_listener() { return ctx.increment_num(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_span_click_63_listener() { return ctx.decrement_num(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NavBarComponent_Template_input_ngModelChange_65_listener($event) { return ctx.diagonal_weight = $event; })("focusout", function NavBarComponent_Template_input_focusout_65_listener() { return ctx.updateWeights(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function NavBarComponent_Template_input_change_69_listener() { return ctx.toVis.allowBidirection = !ctx.toVis.allowBidirection; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, " Allow Bidirection ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "label", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Toll Node Weight ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_span_click_76_listener() { return ctx.increment_num(0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_span_click_77_listener() { return ctx.decrement_num(0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NavBarComponent_Template_input_ngModelChange_79_listener($event) { return ctx.toll_weight = $event; })("focusout", function NavBarComponent_Template_input_focusout_79_listener() { return ctx.updateWeights(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "Heuristics");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "span", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "input", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_input_click_85_listener() { return ctx.toVis.heuristics = "manhattan"; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, " Manhattan ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "span", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "input", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_input_click_90_listener() { return ctx.toVis.heuristics = "euclidean"; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, " Euclidean ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, "Speed");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "span", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "span", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "input", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NavBarComponent_Template_input_ngModelChange_99_listener($event) { return ctx.toVis.algorithmSpeed = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, " For Touch Screen Device ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "span", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "label", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "input", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function NavBarComponent_Template_input_change_105_listener() { return ctx.changeTouchSetting(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](106, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, " Touch to Create Toll Node ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "a", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "button", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_button_click_110_listener() { return ctx.RunVisualizer(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, " Visualize ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](112, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](113);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "a", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "button", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_button_click_115_listener() { return ctx.RunReset(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](116, " Reset ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](118, " Visualization ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "a", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "button", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_Template_button_click_120_listener() { return ctx.RunResetAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](121, " Reset ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](123, " All ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("open", ctx.isHamburger_status);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", ctx.isHamburger_status);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.toVis.algorithm == "BFS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.toVis.algorithm == "DFS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.toVis.algorithm == "Dijkstra");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.toVis.algorithm == "A* algorithm");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.custom_grid_size == 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.custom_grid_size == 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.custom_grid_size == 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.custom_grid_size == 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.custom_grid_size == 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.maze_pattern == "Blank Grid");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.maze_pattern == "Random Pattern");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.maze_pattern == "Recursive Division");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.maze_pattern == "Recursive Division (Verticle skew)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("opt-active", ctx.maze_pattern == "Recursive Division (Horizontal skew)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx.diagonal_weight);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.diagonal_weight);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx.toll_weight);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.toll_weight);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.toVis.algorithmSpeed / 4, "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.toVis.algorithmSpeed);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", ctx.isHamburger_status);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.toVis.algorithm, " ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["RangeValueAccessor"]], styles: ["input[type=\"number\"][_ngcontent-%COMP%]::-webkit-inner-spin-button, input[type=\"number\"][_ngcontent-%COMP%]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  \n  \n}\n\nli[_ngcontent-%COMP%], a[_ngcontent-%COMP%], button[_ngcontent-%COMP%], .box[_ngcontent-%COMP%] {\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 500;\n  font-size: 16px;\n  color: #edf0f1;\n  text-decoration: none;\n}\n\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 2%;\n  border-bottom: 2px solid green;\n  background-color: #24252a;\n  padding-top: 5px;\n  padding-left: 25px;\n  padding-right: 25px;\n  padding-bottom: 5px;\n}\n\n.logo[_ngcontent-%COMP%] {\n  background-color: transparent;\n  cursor: pointer;\n  font-family: \"Montserrat\", sans-serif;\n  font-weight: 500;\n  font-size: 21px;\n  color: rgba(153, 194, 133, 1);\n  text-decoration: none;\n}\n\n.logo[_ngcontent-%COMP%]:hover {\n  color: #ad70d7;\n}\n\n.nav__links[_ngcontent-%COMP%] {\n  list-style: none;\n  background-color: transparent;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  \n  background-color: transparent;\n  display: inline-block;\n  padding: 25px 10px;\n  position: relative;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  background-color: transparent;\n  transition: all 0.3s ease 0s;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%] {\n  color: #99c285;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  margin-top: 25px;\n  width: 150px;\n  \n  background-color: #343435;\n  border-radius: 0px 0px 10px 10px;\n  border-top: #99c285 4px solid;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   ul[_ngcontent-%COMP%] {\n  display: block;\n  z-index: 2;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: block;\n  background-color: transparent;\n  padding: 10px 10px;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  display: block;\n  background-color: #ad70d7c2;\n  padding: 10px 10px;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .opt-active[_ngcontent-%COMP%] {\n  display: block;\n  color: rgba(153, 194, 133, 1);\n  \n  padding: 10px 10px;\n}\n\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 9px 25px;\n  background-color: rgba(153, 194, 133, 1);\n  color: #24252a;\n  border: none;\n  border-radius: 50px;\n  cursor: pointer;\n  transition: all 0.3s ease 0s;\n}\n\n.nav__buttons[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n\n.nav__buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin: 5px;\n  background-color: transparent;\n}\n\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #ad70d7;\n  color: #fff;\n}\n\n.toggle__button[_ngcontent-%COMP%] {\n  display: none;\n  flex-direction: column;\n  justify-content: space-between;\n  width: 30px;\n  height: 21px;\n  background-color: transparent;\n}\n\n.toggle__button[_ngcontent-%COMP%]   .toggle__bar[_ngcontent-%COMP%] {\n  height: 3px;\n  width: 100%;\n  background-color: rgba(153, 194, 133, 1);\n  border-radius: 10px;\n  transition: 0.5s;\n}\n\n.advanceOpt[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row !important;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n}\n\n.advanceOpt[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 50%;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.advanceOpt[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row !important;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n}\n\n.nav__links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.advanceOpt[_ngcontent-%COMP%]:hover {\n  background-color: transparent;\n}\n\n\n\n.container[_ngcontent-%COMP%] {\n  position: relative;\n  \n  display: inline-block;\n\n  width: 50px;\n  height: 30px;\n\n  border-radius: 40px;\n  \n  border: 2px solid #edf0f1;\n  transition: 0.5s;\n  margin-left: 15px;\n}\n\n.container[_ngcontent-%COMP%]:hover {\n  width: 80px;\n  border: 2px solid rgba(153, 194, 133, 1);\n}\n\n.container[_ngcontent-%COMP%]   .next[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  \n  right: 50%;\n  display: block;\n  width: 12px;\n  height: 12px;\n  border-top: 2px solid rgba(153, 194, 133, 1);\n  border-left: 2px solid rgba(153, 194, 133, 1);\n  z-index: -10;\n  transform: translateY(-50%) rotate(135deg);\n  cursor: pointer;\n  opacity: 0;\n  transition: 0.5s;\n  font-size: 0px;\n}\n\n.container[_ngcontent-%COMP%]:hover   .next[_ngcontent-%COMP%] {\n  cursor: default;\n  opacity: 1;\n  \n  right: 10%;\n  z-index: 1;\n}\n\n.container[_ngcontent-%COMP%]   .prev[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  \n  left: 50%;\n  display: block;\n  width: 12px;\n  height: 12px;\n  border-top: 2px solid rgba(153, 194, 133, 1);\n  border-left: 2px solid rgba(153, 194, 133, 1);\n  \n  transform: translateY(-50%) rotate(315deg);\n  cursor: pointer;\n  opacity: 0;\n  transition: 0.5s;\n  font-size: 0px;\n  z-index: -10;\n}\n\n.container[_ngcontent-%COMP%]:hover   .prev[_ngcontent-%COMP%] {\n  cursor: default;\n  opacity: 1;\n  \n  left: 10%;\n  z-index: 1;\n}\n\n.box_outer[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n}\n\n.box[_ngcontent-%COMP%] {\n  \n  border: none;\n  background-color: transparent;\n  display: block;\n  cursor: pointer;\n  \n  max-width: 50%;\n  height: 100%;\n  text-align: center;\n  \n  \n  \n  \n  \n  -webkit-user-select: none;\n          user-select: none;\n  \n  \n}\n\n.box[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\n\n\n.slider-continer[_ngcontent-%COMP%]   .custom-slider[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  -webkit-appearance: none;\n  width: 300px;\n  height: 10px;\n  border-radius: 5px;\n  outline: none;\n  background-color: transparent;\n}\n\n.slider-continer[_ngcontent-%COMP%]   .slider-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  margin: 7px 0px;\n  width: 300px;\n  height: 10px;\n  border-radius: 5px;\n  background-color: rgba(153, 194, 133, 0.4);\n  overflow: hidden;\n}\n\n.slider-continer[_ngcontent-%COMP%]   .slider-bar[_ngcontent-%COMP%]   .slider-fill[_ngcontent-%COMP%] {\n  display: block;\n  width: 50%;\n  height: 100%;\n  background-color: rgba(153, 194, 133, 1);\n}\n\n.slider-continer[_ngcontent-%COMP%]   .custom-slider[_ngcontent-%COMP%]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background-color: #99c285;\n  cursor: pointer;\n  outline: none;\n  box-shadow: 0 0 0 0 rgba(98, 0, 238, 0.1);\n  -webkit-transition: 0.3s ease-in-out;\n  transition: 0.3s ease-in-out;\n}\n\n.slider-continer[_ngcontent-%COMP%]   .custom-slider[_ngcontent-%COMP%]::-webkit-slider-thumb:hover {\n  \n  box-shadow: 0 0 0 10px rgba(173, 112, 215, 0.4);\n}\n\n.slider-continer[_ngcontent-%COMP%]   .custom-slider[_ngcontent-%COMP%]:active:-webkit-slider-thumb {\n  box-shadow: 0 0 0 10px rgba(173, 112, 215, 0.4);\n}\n\n\n\n@media (max-width: 1140px) {\n  header[_ngcontent-%COMP%] {\n    padding-left: 10px;\n    padding-right: 10px;\n    flex-wrap: wrap;\n    \n  }\n\n  .logo[_ngcontent-%COMP%] {\n    padding: 25px 10px;\n    background-color: transparent;\n  }\n\n  .toggle__button[_ngcontent-%COMP%] {\n    display: flex;\n    cursor: pointer;\n    order: 1;\n  }\n\n  .nav__buttons[_ngcontent-%COMP%] {\n    order: 3;\n    display: none;\n    width: 100%;\n    flex-direction: row;\n    justify-content: space-around;\n    flex-wrap: wrap;\n  }\n\n  .nav__links[_ngcontent-%COMP%] {\n    order: 2;\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    width: 100%;\n    transition: 2s;\n  }\n\n  .nav__links.active[_ngcontent-%COMP%] {\n    display: flex;\n  }\n\n  .nav__links.active[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    width: 100% !important;\n    text-align: center;\n  }\n\n  .nav__links.active[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n    opacity: 0;\n    transition: all 1s ease-in;\n    display: none;\n  }\n\n  .nav__links.active[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   ul[_ngcontent-%COMP%] {\n    position: static;\n    display: block;\n    width: 100% !important;\n    opacity: 1;\n    \n  }\n\n  .nav__buttons.active[_ngcontent-%COMP%] {\n    display: flex;\n    height: 50vh;\n  }\n\n  \n  .toggle__button.open[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n    transform: translateX(-600px);\n    background: transparent;\n    transition: transform 1s, background 1s;\n  }\n\n  .toggle__button.open[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n    transform: translateY(9px) rotate(135deg);\n  }\n\n  .toggle__button.open[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n    transform: translateY(-9px) rotate(45deg);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdi1iYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFRSx3QkFBd0I7RUFDeEIsU0FBUztBQUNYOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxVQUFVO0VBQ1YsK0JBQStCO0VBQy9CLDZCQUE2QjtBQUMvQjs7QUFFQTs7OztFQUlFLHFDQUFxQztFQUNyQyxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLHlCQUF5QjtFQUN6QixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsZUFBZTtFQUNmLHFDQUFxQztFQUNyQyxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLDZCQUE2QjtFQUM3QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLDhCQUE4QjtFQUM5Qiw2QkFBNkI7RUFDN0IscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWiw0QkFBNEI7RUFDNUIseUJBQXlCO0VBQ3pCLGdDQUFnQztFQUNoQyw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsVUFBVTtBQUNaOztBQUVBO0VBQ0UsY0FBYztFQUNkLDZCQUE2QjtFQUM3QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsMkJBQTJCO0VBQzNCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCw2QkFBNkI7RUFDN0IsOENBQThDO0VBQzlDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQix3Q0FBd0M7RUFDeEMsY0FBYztFQUNkLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQjs7QUFDQTtFQUNFLFdBQVc7RUFDWCw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qiw4QkFBOEI7RUFDOUIsV0FBVztFQUNYLFlBQVk7RUFDWiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsV0FBVztFQUNYLHdDQUF3QztFQUN4QyxtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5Qiw2QkFBNkI7RUFDN0IsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsNkJBQTZCO0VBQzdCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUEsd0JBQXdCOztBQUV4QjtFQUNFLGtCQUFrQjtFQUNsQjttQkFDaUI7RUFDakIscUJBQXFCOztFQUVyQixXQUFXO0VBQ1gsWUFBWTs7RUFFWixtQkFBbUI7RUFDbkIsMENBQTBDO0VBQzFDLHlCQUF5QjtFQUN6QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsV0FBVztFQUNYLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsaUJBQWlCO0VBQ2pCLFVBQVU7RUFDVixjQUFjO0VBQ2QsV0FBVztFQUNYLFlBQVk7RUFDWiw0Q0FBNEM7RUFDNUMsNkNBQTZDO0VBQzdDLFlBQVk7RUFDWiwwQ0FBMEM7RUFDMUMsZUFBZTtFQUNmLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLFVBQVU7RUFDVixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLGdCQUFnQjtFQUNoQixTQUFTO0VBQ1QsY0FBYztFQUNkLFdBQVc7RUFDWCxZQUFZO0VBQ1osNENBQTRDO0VBQzVDLDZDQUE2QztFQUM3QyxnQkFBZ0I7RUFDaEIsMENBQTBDO0VBQzFDLGVBQWU7RUFDZixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixTQUFTO0VBQ1QsVUFBVTtBQUNaOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtBQUMvQjs7QUFDQTtFQUNFLHdCQUF3QjtFQUN4QixZQUFZO0VBQ1osNkJBQTZCO0VBQzdCLGNBQWM7RUFDZCxlQUFlO0VBQ2YscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIseUJBQWlCO1VBQWpCLGlCQUFpQjtFQUNqQiwrQkFBK0I7RUFDL0Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBLGtCQUFrQjs7QUFDbEI7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLHdCQUF3QjtFQUN4QixZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixlQUFlO0VBQ2YsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsMENBQTBDO0VBQzFDLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxVQUFVO0VBQ1YsWUFBWTtFQUNaLHdDQUF3QztBQUMxQzs7QUFDQTtFQUNFLHdCQUF3QjtFQUN4QixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGFBQWE7RUFDYix5Q0FBeUM7RUFDekMsb0NBQTRCO0VBQTVCLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQywrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSwrQ0FBK0M7QUFDakQ7O0FBRUEseUJBQXlCOztBQUN6QjtFQUNFO0lBQ0Usa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2Ysa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLDZCQUE2QjtFQUMvQjs7RUFFQTtJQUNFLGFBQWE7SUFDYixlQUFlO0lBQ2YsUUFBUTtFQUNWOztFQUVBO0lBQ0UsUUFBUTtJQUNSLGFBQWE7SUFDYixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLDZCQUE2QjtJQUM3QixlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsUUFBUTtJQUNSLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLFVBQVU7SUFDViwwQkFBMEI7SUFDMUIsYUFBYTtFQUNmOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxzQkFBc0I7SUFDdEIsVUFBVTtJQUNWOzJCQUN1QjtFQUN6Qjs7RUFFQTtJQUNFLGFBQWE7SUFDYixZQUFZO0VBQ2Q7O0VBRUEsNEJBQTRCO0VBQzVCO0lBQ0UsNkJBQTZCO0lBQzdCLHVCQUF1QjtJQUN2Qix1Q0FBdUM7RUFDekM7O0VBRUE7SUFDRSx5Q0FBeUM7RUFDM0M7O0VBRUE7SUFDRSx5Q0FBeUM7RUFDM0M7QUFDRiIsImZpbGUiOiJuYXYtYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbnB1dFt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuaW5wdXRbdHlwZT1cIm51bWJlclwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xufVxuXG4qIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjMjQyNTJhOyAqL1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBhenVyZTsgKi9cbn1cblxubGksXG5hLFxuYnV0dG9uLFxuLmJveCB7XG4gIGZvbnQtZmFtaWx5OiBcIk1vbnRzZXJyYXRcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogI2VkZjBmMTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG5oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAgMiU7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBncmVlbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI0MjUyYTtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgcGFkZGluZy1sZWZ0OiAyNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAyNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xufVxuXG4ubG9nbyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBcIk1vbnRzZXJyYXRcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAyMXB4O1xuICBjb2xvcjogcmdiYSgxNTMsIDE5NCwgMTMzLCAxKTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG4ubG9nbzpob3ZlciB7XG4gIGNvbG9yOiAjYWQ3MGQ3O1xufVxuXG4ubmF2X19saW5rcyB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4ubmF2X19saW5rcyBsaSB7XG4gIC8qIGJvcmRlcjogMnB4IHNvbGlkIHNhbG1vbjsgKi9cbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZzogMjVweCAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5uYXZfX2xpbmtzIGxpIGEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZSAwcztcbn1cblxuLm5hdl9fbGlua3MgbGk6aG92ZXIgYSB7XG4gIGNvbG9yOiAjOTljMjg1O1xufVxuXG4ubmF2X19saW5rcyBsaSB1bCB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luLXRvcDogMjVweDtcbiAgd2lkdGg6IDE1MHB4O1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5OyAqL1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzQzNDM1O1xuICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDEwcHggMTBweDtcbiAgYm9yZGVyLXRvcDogIzk5YzI4NSA0cHggc29saWQ7XG59XG5cbi5uYXZfX2xpbmtzIGxpOmhvdmVyIHVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHotaW5kZXg6IDI7XG59XG5cbi5uYXZfX2xpbmtzIGxpIHVsIGxpIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAxMHB4IDEwcHg7XG59XG5cbi5uYXZfX2xpbmtzIGxpIHVsIGxpOmhvdmVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhZDcwZDdjMjtcbiAgcGFkZGluZzogMTBweCAxMHB4O1xufVxuXG4ubmF2X19saW5rcyBsaSB1bCAub3B0LWFjdGl2ZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogcmdiYSgxNTMsIDE5NCwgMTMzLCAxKTtcbiAgLyogYm9yZGVyOiAycHggc29saWQgcmdiYSgxNTMsIDE5NCwgMTMzLCAxKTsgKi9cbiAgcGFkZGluZzogMTBweCAxMHB4O1xufVxuXG5oZWFkZXIgYnV0dG9uIHtcbiAgcGFkZGluZzogOXB4IDI1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGNvbG9yOiAjMjQyNTJhO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZSAwcztcbn1cblxuLm5hdl9fYnV0dG9ucyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuLm5hdl9fYnV0dG9ucyBhIHtcbiAgbWFyZ2luOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5oZWFkZXIgYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FkNzBkNztcbiAgY29sb3I6ICNmZmY7XG59XG5cbi50b2dnbGVfX2J1dHRvbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMjFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi50b2dnbGVfX2J1dHRvbiAudG9nZ2xlX19iYXIge1xuICBoZWlnaHQ6IDNweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHRyYW5zaXRpb246IDAuNXM7XG59XG5cbi5hZHZhbmNlT3B0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdyAhaW1wb3J0YW50O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuLmFkdmFuY2VPcHQgc3BhbiB7XG4gIHdpZHRoOiA1MCU7XG59XG5cbi5uYXZfX2xpbmtzIGxpIHVsIGxpLmFkdmFuY2VPcHQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93ICFpbXBvcnRhbnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5uYXZfX2xpbmtzIGxpIHVsIGxpLmFkdmFuY2VPcHQ6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLyogSW5wdXQgc3Bpbm5lciBzdHlsZSAqL1xuXG4uY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAvKiB3aWR0aDogODBweDtcbiAgICBoZWlnaHQ6IDUwcHg7ICovXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XG4gIC8qIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTsgKi9cbiAgYm9yZGVyOiAycHggc29saWQgI2VkZjBmMTtcbiAgdHJhbnNpdGlvbjogMC41cztcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XG59XG5cbi5jb250YWluZXI6aG92ZXIge1xuICB3aWR0aDogODBweDtcbiAgYm9yZGVyOiAycHggc29saWQgcmdiYSgxNTMsIDE5NCwgMTMzLCAxKTtcbn1cblxuLmNvbnRhaW5lciAubmV4dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIC8qIHJpZ2h0OiAzMHB4OyAqL1xuICByaWdodDogNTAlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEycHg7XG4gIGhlaWdodDogMTJweDtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgcmdiYSgxNTMsIDE5NCwgMTMzLCAxKTtcbiAgei1pbmRleDogLTEwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDEzNWRlZyk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogMC41cztcbiAgZm9udC1zaXplOiAwcHg7XG59XG5cbi5jb250YWluZXI6aG92ZXIgLm5leHQge1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIG9wYWNpdHk6IDE7XG4gIC8qIHJpZ2h0OiAyMHB4OyAqL1xuICByaWdodDogMTAlO1xuICB6LWluZGV4OiAxO1xufVxuXG4uY29udGFpbmVyIC5wcmV2IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgLyogbGVmdDogMzBweDsgKi9cbiAgbGVmdDogNTAlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEycHg7XG4gIGhlaWdodDogMTJweDtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgcmdiYSgxNTMsIDE5NCwgMTMzLCAxKTtcbiAgLyogei1pbmRleDogMTsgKi9cbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgzMTVkZWcpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IDAuNXM7XG4gIGZvbnQtc2l6ZTogMHB4O1xuICB6LWluZGV4OiAtMTA7XG59XG5cbi5jb250YWluZXI6aG92ZXIgLnByZXYge1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIG9wYWNpdHk6IDE7XG4gIC8qIGxlZnQ6IDIwcHg7ICovXG4gIGxlZnQ6IDEwJTtcbiAgei1pbmRleDogMTtcbn1cblxuLmJveF9vdXRlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xufVxuLmJveCB7XG4gIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsgKi9cbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLyogbWF4LXdpZHRoOiA2MHB4OyAqL1xuICBtYXgtd2lkdGg6IDUwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIC8qIGxpbmUtaGVpZ2h0OiA0NnB4OyAqL1xuICAvKiBkaXNwbGF5Om5vbmU7ICovXG4gIC8qIGNvbG9yOiAjMDBkZWZmOyAqL1xuICAvKiBmb250LXNpemU6IDI0cHg7ICovXG4gIC8qIGZvbnQtd2VpZ2h0OiA3MDA7ICovXG4gIHVzZXItc2VsZWN0OiBub25lO1xuICAvKiBib3JkZXI6ICM4NjdiN2Igc29saWQgMnB4OyAqL1xuICAvKiBtYXJnaW46IGF1dG87ICovXG59XG5cbi5ib3g6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4vKiBTbGlkZXIgU3R5bGVzICovXG4uc2xpZGVyLWNvbnRpbmVyIC5jdXN0b20tc2xpZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAyO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIHdpZHRoOiAzMDBweDtcbiAgaGVpZ2h0OiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uc2xpZGVyLWNvbnRpbmVyIC5zbGlkZXItYmFyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xuICBtYXJnaW46IDdweCAwcHg7XG4gIHdpZHRoOiAzMDBweDtcbiAgaGVpZ2h0OiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTUzLCAxOTQsIDEzMywgMC40KTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnNsaWRlci1jb250aW5lciAuc2xpZGVyLWJhciAuc2xpZGVyLWZpbGwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDUwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE1MywgMTk0LCAxMzMsIDEpO1xufVxuLnNsaWRlci1jb250aW5lciAuY3VzdG9tLXNsaWRlcjo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5YzI4NTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBvdXRsaW5lOiBub25lO1xuICBib3gtc2hhZG93OiAwIDAgMCAwIHJnYmEoOTgsIDAsIDIzOCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogMC4zcyBlYXNlLWluLW91dDtcbn1cblxuLnNsaWRlci1jb250aW5lciAuY3VzdG9tLXNsaWRlcjo6LXdlYmtpdC1zbGlkZXItdGh1bWI6aG92ZXIge1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjL2FhNmRkMzsgKi9cbiAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDE3MywgMTEyLCAyMTUsIDAuNCk7XG59XG5cbi5zbGlkZXItY29udGluZXIgLmN1c3RvbS1zbGlkZXI6YWN0aXZlOi13ZWJraXQtc2xpZGVyLXRodW1iIHtcbiAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDE3MywgMTEyLCAyMTUsIDAuNCk7XG59XG5cbi8qIE1PQklMRSBERVZJQ0UgTkFWQkFSICovXG5AbWVkaWEgKG1heC13aWR0aDogMTE0MHB4KSB7XG4gIGhlYWRlciB7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIC8qIGhlaWdodDogNzVweDsgKi9cbiAgfVxuXG4gIC5sb2dvIHtcbiAgICBwYWRkaW5nOiAyNXB4IDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAudG9nZ2xlX19idXR0b24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG9yZGVyOiAxO1xuICB9XG5cbiAgLm5hdl9fYnV0dG9ucyB7XG4gICAgb3JkZXI6IDM7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgfVxuXG4gIC5uYXZfX2xpbmtzIHtcbiAgICBvcmRlcjogMjtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0cmFuc2l0aW9uOiAycztcbiAgfVxuXG4gIC5uYXZfX2xpbmtzLmFjdGl2ZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxuXG4gIC5uYXZfX2xpbmtzLmFjdGl2ZSBsaSB7XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAubmF2X19saW5rcy5hY3RpdmUgbGkgdWwge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW47XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIC5uYXZfX2xpbmtzLmFjdGl2ZSBsaTpob3ZlciB1bCB7XG4gICAgcG9zaXRpb246IHN0YXRpYztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgIG9wYWNpdHk6IDE7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICAgIHRyYW5zaXRpb24tZGVsYXk6IDNzOyAqL1xuICB9XG5cbiAgLm5hdl9fYnV0dG9ucy5hY3RpdmUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiA1MHZoO1xuICB9XG5cbiAgLyogSGFtYnVyZ2VyIEJ0biBBbmltYXRpb24gKi9cbiAgLnRvZ2dsZV9fYnV0dG9uLm9wZW4gc3BhbjpudGgtY2hpbGQoMikge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNjAwcHgpO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcywgYmFja2dyb3VuZCAxcztcbiAgfVxuXG4gIC50b2dnbGVfX2J1dHRvbi5vcGVuIHNwYW46bnRoLWNoaWxkKDEpIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoOXB4KSByb3RhdGUoMTM1ZGVnKTtcbiAgfVxuXG4gIC50b2dnbGVfX2J1dHRvbi5vcGVuIHNwYW46bnRoLWNoaWxkKDMpIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTlweCkgcm90YXRlKDQ1ZGVnKTtcbiAgfVxufVxuIl19 */", ".dropdown_title[_ngcontent-%COMP%] {\n  font-family: \"Times New Roman\", Times, serif;\n  font-weight: bold;\n  background-color: pink;\n}\n\n.dropdown-item[_ngcontent-%COMP%] {\n  font-family: \"Times New Roman\", Times, serif;\n}\n\n.text_style[_ngcontent-%COMP%] {\n  font-family: \"Times New Roman\", Times, serif;\n}\n\n.dropdown-item_selected[_ngcontent-%COMP%] {\n  border: 1px solid green;\n  background-color: lightgreen;\n  opacity: 0.5;\n}\n\n\n\n.custom-checkbox[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  cursor: pointer;\n}\n\n.custom-checkbox__input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.custom-checkbox__box[_ngcontent-%COMP%] {\n  width: 1em;\n  height: 1em;\n\n  border: 2px solid #2a2d49;\n  box-sizing: border-box;\n  border-radius: 2px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 10px;\n  flex-shrink: 0;\n\n  transition: background 0.15s, border-color 0.15s;\n}\n\n.custom-checkbox__box[_ngcontent-%COMP%]::after {\n  content: \"\\2714\";\n  color: #ffffff;\n  transform: scale(0);\n  transition: transform 0.15s;\n}\n\n.custom-checkbox__input[_ngcontent-%COMP%]:checked    + .custom-checkbox__box[_ngcontent-%COMP%] {\n  background: #2a2d49;\n  border: 2px solid #2a2d49;\n  box-sizing: border-box;\n  border-radius: 2px;\n}\n\n.custom-checkbox__input[_ngcontent-%COMP%]:checked    + .custom-checkbox__box[_ngcontent-%COMP%]::after {\n  transform: scale(1);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbV9zdHlsZXMuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNENBQTRDO0VBQzVDLGlCQUFpQjtFQUNqQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsNEJBQTRCO0VBQzVCLFlBQVk7QUFDZDs7QUFFQSwyQkFBMkI7O0FBQzNCO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFdBQVc7O0VBRVgseUJBQXlCO0VBQ3pCLHNCQUFzQjtFQUN0QixrQkFBa0I7O0VBRWxCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixjQUFjOztFQUVkLGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsbUJBQW1CO0VBQ25CLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJjdXN0b21fc3R5bGVzLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kcm9wZG93bl90aXRsZSB7XG4gIGZvbnQtZmFtaWx5OiBcIlRpbWVzIE5ldyBSb21hblwiLCBUaW1lcywgc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xufVxuXG4uZHJvcGRvd24taXRlbSB7XG4gIGZvbnQtZmFtaWx5OiBcIlRpbWVzIE5ldyBSb21hblwiLCBUaW1lcywgc2VyaWY7XG59XG5cbi50ZXh0X3N0eWxlIHtcbiAgZm9udC1mYW1pbHk6IFwiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZjtcbn1cblxuLmRyb3Bkb3duLWl0ZW1fc2VsZWN0ZWQge1xuICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmVlbjtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4vKiBDdXN0b20gQ2hlY2tib3ggc3R5bGVzICovXG4uY3VzdG9tLWNoZWNrYm94IHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmN1c3RvbS1jaGVja2JveF9faW5wdXQge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uY3VzdG9tLWNoZWNrYm94X19ib3gge1xuICB3aWR0aDogMWVtO1xuICBoZWlnaHQ6IDFlbTtcblxuICBib3JkZXI6IDJweCBzb2xpZCAjMmEyZDQ5O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgYm9yZGVyLWNvbG9yIDAuMTVzO1xufVxuXG4uY3VzdG9tLWNoZWNrYm94X19ib3g6OmFmdGVyIHtcbiAgY29udGVudDogXCJcXDI3MTRcIjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cztcbn1cblxuLmN1c3RvbS1jaGVja2JveF9faW5wdXQ6Y2hlY2tlZCArIC5jdXN0b20tY2hlY2tib3hfX2JveCB7XG4gIGJhY2tncm91bmQ6ICMyYTJkNDk7XG4gIGJvcmRlcjogMnB4IHNvbGlkICMyYTJkNDk7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLmN1c3RvbS1jaGVja2JveF9faW5wdXQ6Y2hlY2tlZCArIC5jdXN0b20tY2hlY2tib3hfX2JveDo6YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xufVxuIl19 */", ".custom-radio-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  cursor: pointer;\n  \n}\n.radio__input[_ngcontent-%COMP%] {\n  display: none;\n}\n.radio__radio[_ngcontent-%COMP%] {\n  min-width: 18px;\n  height: 18px;\n  border: 2px solid rgba(153, 194, 133, 1);\n  border-radius: 50%;\n  margin-right: 15px;\n  box-sizing: border-box;\n  padding: 2px;\n}\n.radio__radio[_ngcontent-%COMP%]::after {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: rgba(153, 194, 133, 1);\n  border-radius: 50%;\n  transform: scale(0);\n  transition: transform 0.15s;\n}\n.radio__input[_ngcontent-%COMP%]:checked    + .radio__radio[_ngcontent-%COMP%]::after {\n  transform: scale(1);\n}\n.radio__input[_ngcontent-%COMP%]:disabled    + .radio__radio[_ngcontent-%COMP%] {\n  border: 2px solid #d8d9db;\n}\n\n.custom-checkbox[_ngcontent-%COMP%] {\n  padding-top: 5px;\n  display: inline-flex;\n  align-items: center;\n  cursor: pointer;\n}\n.custom-checkbox__input[_ngcontent-%COMP%] {\n  display: none;\n}\n.custom-checkbox__box[_ngcontent-%COMP%] {\n  width: 1em;\n  height: 1em;\n  border: 2px solid rgba(153, 194, 133, 1);\n  box-sizing: border-box;\n  border-radius: 2px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 15px;\n  flex-shrink: 0;\n  transition: background 0.15s, border-color 0.15s;\n}\n.custom-checkbox__box[_ngcontent-%COMP%]::after {\n  content: \"\\2714\";\n  color: #ffffff;\n  transform: scale(0);\n  transition: transform 0.15s;\n}\n.custom-checkbox__input[_ngcontent-%COMP%]:checked    + .custom-checkbox__box[_ngcontent-%COMP%] {\n  background: rgba(153, 194, 133, 1);\n  border: 2px solid rgba(153, 194, 133, 1);\n  box-sizing: border-box;\n  border-radius: 2px;\n}\n.custom-checkbox__input[_ngcontent-%COMP%]:checked    + .custom-checkbox__box[_ngcontent-%COMP%]::after {\n  transform: scale(1);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrYm94X3JhZGlvLWlucHV0LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQkFBcUI7QUFDckI7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZjs0QkFDMEI7QUFDNUI7QUFFQTtFQUNFLGFBQWE7QUFDZjtBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7RUFDWix3Q0FBd0M7RUFDeEMsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsWUFBWTtBQUNkO0FBRUE7RUFDRSxXQUFXO0VBQ1gsV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0VBQ2Qsa0NBQWtDO0VBQ2xDLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsMkJBQTJCO0FBQzdCO0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUVBLG9CQUFvQjtBQUNwQjtFQUNFLGdCQUFnQjtFQUNoQixvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7QUFFQTtFQUNFLGFBQWE7QUFDZjtBQUVBO0VBQ0UsVUFBVTtFQUNWLFdBQVc7RUFDWCx3Q0FBd0M7RUFDeEMsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGdEQUFnRDtBQUNsRDtBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxtQkFBbUI7RUFDbkIsMkJBQTJCO0FBQzdCO0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsd0NBQXdDO0VBQ3hDLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJjaGVja2JveF9yYWRpby1pbnB1dC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDdXN0b20gUmFkaW8gYnRuICovXG4uY3VzdG9tLXJhZGlvLWJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIC8qIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE5cHg7ICovXG59XG5cbi5yYWRpb19faW5wdXQge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4ucmFkaW9fX3JhZGlvIHtcbiAgbWluLXdpZHRoOiAxOHB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBwYWRkaW5nOiAycHg7XG59XG5cbi5yYWRpb19fcmFkaW86OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzO1xufVxuXG4ucmFkaW9fX2lucHV0OmNoZWNrZWQgKyAucmFkaW9fX3JhZGlvOjphZnRlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG5cbi5yYWRpb19faW5wdXQ6ZGlzYWJsZWQgKyAucmFkaW9fX3JhZGlvIHtcbiAgYm9yZGVyOiAycHggc29saWQgI2Q4ZDlkYjtcbn1cblxuLyogQ3VzdG9tIENoZWNrYm94ICovXG4uY3VzdG9tLWNoZWNrYm94IHtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmN1c3RvbS1jaGVja2JveF9faW5wdXQge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uY3VzdG9tLWNoZWNrYm94X19ib3gge1xuICB3aWR0aDogMWVtO1xuICBoZWlnaHQ6IDFlbTtcbiAgYm9yZGVyOiAycHggc29saWQgcmdiYSgxNTMsIDE5NCwgMTMzLCAxKTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xuICBmbGV4LXNocmluazogMDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgYm9yZGVyLWNvbG9yIDAuMTVzO1xufVxuXG4uY3VzdG9tLWNoZWNrYm94X19ib3g6OmFmdGVyIHtcbiAgY29udGVudDogXCJcXDI3MTRcIjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cztcbn1cblxuLmN1c3RvbS1jaGVja2JveF9faW5wdXQ6Y2hlY2tlZCArIC5jdXN0b20tY2hlY2tib3hfX2JveCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMTUzLCAxOTQsIDEzMywgMSk7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLmN1c3RvbS1jaGVja2JveF9faW5wdXQ6Y2hlY2tlZCArIC5jdXN0b20tY2hlY2tib3hfX2JveDo6YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-nav-bar',
                templateUrl: './nav-bar.component.html',
                styleUrls: ['./nav-bar.component.css', './custom_styles.css', './checkbox_radio-input.css']
            }]
    }], function () { return []; }, { information: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], reset: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], grid_size: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], weight_values: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], mazesAndPatterns: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], is_touch_toll: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "ifSg":
/*!***********************************!*\
  !*** ./src/app/algorithms/BFS.ts ***!
  \***********************************/
/*! exports provided: BFS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BFS", function() { return BFS; });
/* harmony import */ var _algo_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./algo-helper */ "Y3ol");

class BFS {
    constructor() {
        this.gridcells = [];
        this.visited = [];
        this.isPathAvail = false;
        this.start_mid = [];
        this.end_mid = [];
    }
    runBFS(cells, start, end, navinformation) {
        this.gridcells = cells;
        this.navigation = navinformation;
        if (this.navigation.allowBidirection) {
            this.start_mid = [];
            this.end_mid = [];
            this.isPathAvail = this.BFS_Bidirection_Path(start, end);
        }
        else {
            this.isPathAvail = this.BFS_Path(start, end);
        }
    }
    generatePath(start, end) {
        if (this.navigation.allowBidirection) {
            return _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].generateBidirectionPath(start, end, this.gridcells, this.start_mid, this.end_mid);
        }
        else {
            return _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].generatePath(start, end, this.gridcells);
        }
    }
    BFS_Path(start, end) {
        var q = [];
        this.visited = [];
        q.push(start);
        while (q.length != 0) {
            var current = q.shift();
            if (current) {
                if (this.gridcells[current[0]][current[1]].status == 'end') {
                    return true;
                }
                this.gridcells[current[0]][current[1]].vertex_status = 'current';
                if (this.navigation.allowDiagonals) {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                }
                else {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                }
                while (neighbors.length != 0) {
                    var n = neighbors.shift();
                    if (n) {
                        if (this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' &&
                            this.gridcells[n[0]][n[1]].status != 'close') {
                            this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                            q.push(n);
                            this.gridcells[n[0]][n[1]].prev = current;
                        }
                    }
                }
                this.visited.push(current);
                this.gridcells[current[0]][current[1]].vertex_status = 'visited';
            }
            else {
                throw new Error('Current node is undefined');
            }
        }
        return false;
    }
    BFS_Bidirection_Path(start, end) {
        this.visited = [];
        var q_start = [];
        q_start.push(start);
        var q_goal = [];
        q_goal.push(end);
        while (q_start.length != 0 && q_goal.length != 0) {
            if (q_start.length != 0) {
                var current = q_start.shift();
                if (current) {
                    if (this.gridcells[current[0]][current[1]].status == 'end' ||
                        this.gridcells[current[0]][current[1]].vertex_status ==
                            'visited_goal') {
                        return true;
                    }
                    this.gridcells[current[0]][current[1]].vertex_status = 'current';
                    if (this.navigation.allowDiagonals) {
                        var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                    }
                    else {
                        var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                    }
                    while (neighbors.length != 0) {
                        var n = neighbors.shift();
                        if (n) {
                            if ((this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' ||
                                this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal') &&
                                this.gridcells[n[0]][n[1]].status != 'close') {
                                if (this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal') {
                                    this.visited.push(current);
                                    this.gridcells[current[0]][current[1]].vertex_status =
                                        'visited_start';
                                    this.start_mid = current;
                                    this.end_mid = n;
                                    if (this.gridcells[n[0]][n[1]].status != 'start' &&
                                        this.gridcells[n[0]][n[1]].status != 'end') {
                                        this.gridcells[n[0]][n[1]].status = 'mid';
                                        this.gridcells[n[0]][n[1]].vertex_status = 'unvisited';
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
                    this.gridcells[current[0]][current[1]].vertex_status =
                        'visited_start';
                    // console.log("If visited included in current or not ",  this.visited.includes(current));
                }
            }
            else {
                throw new Error('Current node is undefined');
            }
            if (q_goal.length != 0) {
                var current = q_goal.shift();
                if (current) {
                    if (this.gridcells[current[0]][current[1]].status == 'start' ||
                        this.gridcells[current[0]][current[1]].vertex_status ==
                            'visited_start') {
                        return true;
                    }
                    this.gridcells[current[0]][current[1]].vertex_status = 'current';
                    if (this.navigation.allowDiagonals) {
                        var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                    }
                    else {
                        var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                    }
                    while (neighbors.length != 0) {
                        var n = neighbors.shift();
                        if (n) {
                            if ((this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' ||
                                this.gridcells[n[0]][n[1]].vertex_status ==
                                    'visited_start') &&
                                this.gridcells[n[0]][n[1]].status != 'close') {
                                if (this.gridcells[n[0]][n[1]].vertex_status == 'visited_start') {
                                    this.visited.push(current);
                                    this.gridcells[current[0]][current[1]].vertex_status =
                                        'visited_goal';
                                    this.start_mid = n;
                                    this.end_mid = current;
                                    if (this.gridcells[n[0]][n[1]].status != 'start' &&
                                        this.gridcells[n[0]][n[1]].status != 'end') {
                                        this.gridcells[n[0]][n[1]].status = 'mid';
                                        this.gridcells[n[0]][n[1]].vertex_status = 'unvisited';
                                    }
                                    return true;
                                }
                                this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                                q_goal.push(n);
                                this.gridcells[n[0]][n[1]].prev = current;
                            }
                        }
                    }
                    this.visited.push(current);
                    this.gridcells[current[0]][current[1]].vertex_status = 'visited_goal';
                }
            }
            else {
                throw new Error('Current node is undefined');
            }
        }
        return false;
    }
}


/***/ }),

/***/ "kgqt":
/*!***********************************************************************!*\
  !*** ./src/app/visualizer/algovisualizer/algovisualizer.component.ts ***!
  \***********************************************************************/
/*! exports provided: AlgovisualizerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlgovisualizerComponent", function() { return AlgovisualizerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_algorithms_a_star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/algorithms/a-star */ "1Jg+");
/* harmony import */ var src_app_algorithms_BFS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/algorithms/BFS */ "ifSg");
/* harmony import */ var src_app_algorithms_DFS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/algorithms/DFS */ "oI3j");
/* harmony import */ var src_app_algorithms_Dijkstra__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/algorithms/Dijkstra */ "2Trt");
/* harmony import */ var _models_cell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/cell */ "RViY");
/* harmony import */ var angular_shepherd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-shepherd */ "wfSS");
/* harmony import */ var angular2_notifications__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular2-notifications */ "Lm38");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _walkthrouh_tutorial_walkthrouh_tutorial_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../walkthrouh-tutorial/walkthrouh-tutorial.component */ "aXY2");
/* harmony import */ var _nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../nav-bar/nav-bar.component */ "b2VE");
/* harmony import */ var _gridworld_gridworld_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../gridworld/gridworld.component */ "aLal");













const _c0 = ["grid"];
function AlgovisualizerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 12);
} }
class AlgovisualizerComponent {
    constructor(shepherdService, notificationService) {
        this.shepherdService = shepherdService;
        this.notificationService = notificationService;
        this.isWalkthrough = false;
        this.sizeOfGrid = [30, 60];
        this.cells = [];
        this.isVisualizing = false;
        this.inProcess = false;
        this.is_touch_toll = false;
        this.startNode = [15, 10];
        this.endNode = [15, 50];
        this.options = {
            position: ["top", "left"],
            // lastOnBottom: true,
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventDuplicates: true
        };
    }
    ;
    ngOnInit() {
        for (let y = 0; y < this.sizeOfGrid[0]; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.sizeOfGrid[1]; x++) {
                this.cells[y][x] = new _models_cell__WEBPACK_IMPORTED_MODULE_5__["Cell"]();
            }
        }
        this.cells[this.startNode[0]][this.startNode[1]].status = 'start';
        this.cells[this.endNode[0]][this.endNode[1]].status = 'end';
        this.bfs = new src_app_algorithms_BFS__WEBPACK_IMPORTED_MODULE_2__["BFS"]();
        this.dfs = new src_app_algorithms_DFS__WEBPACK_IMPORTED_MODULE_3__["DFS"]();
        this.dijksta = new src_app_algorithms_Dijkstra__WEBPACK_IMPORTED_MODULE_4__["Dijksta"]();
        this.astar = new src_app_algorithms_a_star__WEBPACK_IMPORTED_MODULE_1__["Astar"]();
        // this.shapherds_tour();
        // if(window.innerWidth>700 && window.innerHeight>500){
        //   this.shepherdService.start();
        // }
        //// this.shepherdService.start();
        this.isWalkthrough = true;
    }
    onSuccess() {
        this.notificationService.success('Item created!', 'Click to undo...', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
        });
    }
    noPath() {
        this.notificationService.remove();
        this.notificationService.error('No Path', 'Path not available between start and end node', {
            timeOut: 5000
        });
    }
    // availPath(){
    //   this.notificationService.remove();
    // }
    // resetWalkthrough(event:any){
    //   this.isWalkthrough = event;
    // }
    resetWalkthrough(event) {
        console.log("walkthrough reset", event);
        this.isWalkthrough = event;
    }
    ChangeGridSize(event) {
        console.log("Change Grid Size");
        this.cells = [];
        this.sizeOfGrid = [event, 2 * event];
        // this.startNode = [this.randomInteger(0,event-1),this.randomInteger(0,(2*event)-1)];
        // this.endNode = [(this.startNode[0]+1)%event ,this.randomInteger(0,(2*event)-1)];
        this.startNode = [Math.floor(event / 2), Math.floor((event * 2) * .20)];
        this.endNode = [Math.floor(event / 2), 2 * event - Math.floor(((event * 2) * .20))];
        for (let y = 0; y < this.sizeOfGrid[0]; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.sizeOfGrid[1]; x++) {
                this.cells[y][x] = new _models_cell__WEBPACK_IMPORTED_MODULE_5__["Cell"]();
            }
        }
        this.cells[this.startNode[0]][this.startNode[1]].status = 'start';
        this.cells[this.endNode[0]][this.endNode[1]].status = 'end';
        this.resetEverything(false);
    }
    randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // NavBar Functions
    infoFromNav(event) {
        if (event.algorithm != "Algorithms") {
            this.navigation = event;
            if (event.algorithm == "BFS") {
                // this.generateRandomPatterns();
                // console.log("Run Sucess");
                this.runBFSPath();
            }
            else if (event.algorithm == "DFS") {
                this.runDFSPath();
            }
            else if (event.algorithm == "Dijkstra") {
                this.runDijkstraPath();
            }
            else if (event.algorithm == "A* algorithm") {
                this.runAstarPath();
            }
        }
        else {
            this.notificationService.warn('Select Algorithm', 'select algorithm to visualize');
        }
    }
    changeTouchSetting(event) {
        console.log("algovisualizer touch screen", event);
        this.is_touch_toll = event;
    }
    resetEverything(event) {
        this.isVisualizing = false;
        this.inProcess = false;
        let id = window.setTimeout(() => { }, 0);
        while (id) {
            window.clearTimeout(id);
            id--;
        }
        if (event) {
            // Remove visualization not the walls
            this.child.resetGridworld();
        }
        else {
            //remove everything from gridworld, including walls
            // console.log("Reset Everything");
            this.child.clearGridWorld();
        }
    }
    changeWeightValues(event) {
        this.diagonal_weight = event[0];
        this.toll_weight = event[1];
        // console.log("Change Weght Values", event);
    }
    change_mazes_pattern(event) {
        if (event == 'isWalkthrough') {
            // this.shepherdService.start();
            this.isWalkthrough = true;
        }
        else if (event == 'Random Pattern') {
            this.child.generateRandomPatterns();
        }
        else if (event == 'Recursive Division') {
            this.child.generateRecursiveDivisionMaze(0);
        }
        else if (event == 'Recursive Division (Verticle skew)') {
            this.child.generateRecursiveDivisionMaze(-1);
        }
        else if (event == 'Recursive Division (Horizontal skew)') {
            this.child.generateRecursiveDivisionMaze(1);
        }
    }
    generateRandomPatterns() {
        for (let y = 0; y < this.sizeOfGrid[0]; y++) {
            for (let x = 0; x < this.sizeOfGrid[1]; x++) {
                this.cells[y][x].status = 'close';
            }
        }
    }
    // new reset visualizer function to just stop visualizing for just few seconds and start over
    // Drag and drop when visulaization is in process
    resetDragDropVisualizer(event) {
        this.isVisualizing = false;
        // this.inProcess = false;
        let id = window.setTimeout(() => { }, 0);
        while (id) {
            window.clearTimeout(id);
            id--;
        }
        if (event) {
            // Remove visualization not the walls
            this.child.resetGridworld();
        }
        else {
            //remove everything from gridworld, including walls
            // console.log("Reset Everything");
            this.child.clearGridWorld();
        }
    }
    // _______________________________________________________
    // Function runs when start and end node is dragged by user and refreshes the gridworld
    startOrEndDragged(event) {
        if (event[0] == true) {
            this.startNode = [event[1], event[2]];
            this.updateAfterDrag();
        }
        else {
            this.endNode = [event[1], event[2]];
            this.updateAfterDrag();
        }
    }
    // Update the gridworld after start or dragged is moved:
    // if path is already visualizing --> upadate everything at same time
    // if path is in process of visualizing --> start visualization process from begining
    // if no path is  visualizing --> reset everything
    updateAfterDrag() {
        if (this.isVisualizing == true) {
            if (this.navigation.algorithm == "BFS") {
                this.runBFSReset();
            }
            else if (this.navigation.algorithm == "DFS") {
                this.runDFSReset();
            }
            else if (this.navigation.algorithm == "Dijkstra") {
                this.runDijkstaReset();
            }
            else if (this.navigation.algorithm == "A* algorithm") {
                this.runAstarReset();
            }
        }
        else if (this.inProcess == true) {
            // this.resetEverything(true);
            this.resetDragDropVisualizer(true);
            let id = window.setTimeout(() => {
                if (this.navigation.algorithm == "BFS") {
                    this.runBFSPath();
                }
                else if (this.navigation.algorithm == "DFS") {
                    this.runDFSPath();
                }
                else if (this.navigation.algorithm == "Dijkstra") {
                    this.runDijkstraPath();
                }
                else if (this.navigation.algorithm == "A* algorithm") {
                    this.runAstarPath();
                }
            }, 100);
        }
        else {
            this.resetEverything(true);
        }
    }
    //Provied path array it will simulate path on gridworld
    runPathSimulation(path) {
        for (let i = 0; i < path.length; i++) {
            let p = path[path.length - i - 1];
            this.child.cellcomponents.forEach((cmp) => {
                if (cmp.cell == this.cells[p[0]][p[1]]) {
                    setTimeout(() => {
                        cmp.runChangeDetector();
                    }, this.navigation.algorithmSpeed * i);
                }
            });
        }
    }
    // when wall is created this function reset the grid world if path is not visualizing,
    // If path is visualizing then depending on algorithm type it update new path
    oniswallClicked(event) {
        if (event == true) {
            if (this.isVisualizing == true) {
                if (this.navigation.algorithm == "BFS") {
                    this.runBFSReset();
                }
                else if (this.navigation.algorithm == "DFS") {
                    this.runDFSReset();
                }
                else if (this.navigation.algorithm == "Dijkstra") {
                    this.runDijkstaReset();
                }
                else if (this.navigation.algorithm == "A* algorithm") {
                    this.runAstarReset();
                }
            }
        }
        else {
            this.resetEverything(true);
        }
    }
    // ******************************** BFS **************************************************
    runBFSPath() {
        this.inProcess = true;
        this.bfs.runBFS(this.cells, this.startNode, this.endNode, this.navigation);
        this.runBFSSimulation();
        let path = [];
        setTimeout(() => {
            if (this.bfs.isPathAvail == true) {
                this.notificationService.remove();
                path = this.bfs.generatePath(this.startNode, this.endNode);
                this.runPathSimulation(path);
            }
            else {
                this.noPath();
            }
        }, this.navigation.algorithmSpeed * (this.bfs.visited.length - 1));
        setTimeout(() => {
            this.isVisualizing = true;
            this.inProcess = false;
        }, this.navigation.algorithmSpeed * (this.bfs.visited.length - 1) + this.navigation.algorithmSpeed * (path.length - 1));
    }
    runBFSSimulation() {
        for (let i = 0; i < this.bfs.visited.length; i++) {
            this.child.cellcomponents.forEach((cmp) => {
                var c = this.bfs.visited[i];
                if (cmp.cell == this.cells[c[0]][c[1]]) {
                    setTimeout(() => {
                        cmp.runChangeDetector();
                    }, this.navigation.algorithmSpeed * i);
                }
            });
        }
    }
    runBFSReset() {
        let id = window.setTimeout(() => { }, 0);
        while (id) {
            window.clearTimeout(id);
            id--;
        }
        this.child.resetGridworld();
        this.bfs.runBFS(this.cells, this.startNode, this.endNode, this.navigation);
        if (this.bfs.isPathAvail == true) {
            this.notificationService.remove();
            this.bfs.generatePath(this.startNode, this.endNode);
        }
        else {
            this.noPath();
        }
        this.child.refreshGridworld();
    }
    // ******************************* DFS ****************************************************
    runDFSPath() {
        this.inProcess = true;
        this.dfs.runDFS(this.cells, this.startNode, this.endNode, this.navigation);
        this.runDFSSimulation();
        let path = [];
        setTimeout(() => {
            if (this.dfs.isPathAvail == true) {
                this.notificationService.remove();
                path = this.dfs.generatePath(this.startNode, this.endNode);
                this.runPathSimulation(path);
            }
            else {
                this.noPath();
            }
        }, this.navigation.algorithmSpeed * (this.dfs.visited.length - 1));
        setTimeout(() => {
            this.isVisualizing = true;
            this.inProcess = false;
        }, this.navigation.algorithmSpeed * (this.dfs.visited.length - 1) + this.navigation.algorithmSpeed * (path.length - 1));
    }
    runDFSSimulation() {
        for (let i = 0; i < this.dfs.visited.length; i++) {
            this.child.cellcomponents.forEach((cmp) => {
                var c = this.dfs.visited[i];
                if (cmp.cell == this.cells[c[0]][c[1]]) {
                    setTimeout(() => {
                        cmp.runChangeDetector();
                    }, this.navigation.algorithmSpeed * i);
                }
            });
        }
    }
    runDFSReset() {
        let id = window.setTimeout(() => { }, 0);
        while (id) {
            window.clearTimeout(id);
            id--;
        }
        this.child.resetGridworld();
        this.dfs.runDFS(this.cells, this.startNode, this.endNode, this.navigation);
        if (this.dfs.isPathAvail == true) {
            this.notificationService.remove();
            this.dfs.generatePath(this.startNode, this.endNode);
        }
        else {
            this.noPath();
        }
        this.child.refreshGridworld();
    }
    // ***************************** Dijkstra's algorithm ***********************************88
    runDijkstraPath() {
        this.inProcess = true;
        this.dijksta.runDijksta(this.cells, this.startNode, this.endNode, this.navigation, this.diagonal_weight);
        this.runDijkstaSimulation();
        let path = [];
        setTimeout(() => {
            if (this.dijksta.isPathAvail == true) {
                this.notificationService.remove();
                path = this.dijksta.generatePath(this.startNode, this.endNode);
                this.runPathSimulation(path);
            }
            else {
                this.noPath();
            }
        }, this.navigation.algorithmSpeed * (this.dijksta.visited.length - 1));
        setTimeout(() => {
            this.isVisualizing = true;
            this.inProcess = false;
        }, this.navigation.algorithmSpeed * (this.dijksta.visited.length - 1) + this.navigation.algorithmSpeed * (path.length - 1));
    }
    runDijkstaSimulation() {
        // console.log("Visited length: ", this.dijksta.visited.length);
        for (let i = 0; i < this.dijksta.visited.length; i++) {
            this.child.cellcomponents.forEach((cmp) => {
                var c = this.dijksta.visited[i];
                if (cmp.cell == this.cells[c[0]][c[1]]) {
                    setTimeout(() => {
                        cmp.runChangeDetector();
                    }, this.navigation.algorithmSpeed * i);
                }
            });
        }
    }
    runDijkstaReset() {
        let id = window.setTimeout(() => { }, 0);
        while (id) {
            window.clearTimeout(id);
            id--;
        }
        this.child.resetGridworld();
        this.dijksta.runDijksta(this.cells, this.startNode, this.endNode, this.navigation, this.diagonal_weight);
        if (this.dijksta.isPathAvail == true) {
            this.notificationService.remove();
            this.dijksta.generatePath(this.startNode, this.endNode);
        }
        else {
            this.noPath();
        }
        this.child.refreshGridworld();
    }
    // ***************************** A* Algorithm ****************************************
    runAstarPath() {
        this.inProcess = true;
        this.astar.runAstar(this.cells, this.startNode, this.endNode, this.navigation, this.diagonal_weight);
        this.runAstarSimulation();
        let path = [];
        setTimeout(() => {
            if (this.astar.isPathAvail == true) {
                this.notificationService.remove();
                path = this.astar.generatePath(this.startNode, this.endNode);
                this.runPathSimulation(path);
            }
            else {
                this.noPath();
            }
        }, this.navigation.algorithmSpeed * (this.astar.visited.length - 1));
        setTimeout(() => {
            this.isVisualizing = true;
            this.inProcess = false;
        }, this.navigation.algorithmSpeed * (this.astar.visited.length - 1) + this.navigation.algorithmSpeed * (path.length - 1));
    }
    runAstarSimulation() {
        for (let i = 0; i < this.astar.visited.length; i++) {
            this.child.cellcomponents.forEach((cmp) => {
                var c = this.astar.visited[i];
                if (cmp.cell == this.cells[c[0]][c[1]]) {
                    setTimeout(() => {
                        cmp.runChangeDetector();
                    }, this.navigation.algorithmSpeed * i);
                }
            });
        }
    }
    runAstarReset() {
        let id = window.setTimeout(() => { }, 0);
        while (id) {
            window.clearTimeout(id);
            id--;
        }
        this.child.resetGridworld();
        this.astar.runAstar(this.cells, this.startNode, this.endNode, this.navigation, this.diagonal_weight);
        if (this.astar.isPathAvail == true) {
            this.notificationService.remove();
            this.astar.generatePath(this.startNode, this.endNode);
        }
        else {
            this.noPath();
        }
        this.child.refreshGridworld();
    }
    shapherds_tour() {
        var color_representation = `
    <h5>Color in grid represents type of Node/Block. Here are the mapping of each color with it\'s portrayal. </h5>
        <div class="main_color_rep" style="margin-top:20px;">
        <div class="start_node" style="height: 50px;">
            <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #ff005f; margin-left: 10px;"></div>
            <div class="statr_txt" style="float: left; margin-left: 5px;">Start Node</div>

            <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: green; margin-left: 80px;"></div>
            <div class="statr_txt" style="float: left; margin-left: 5px;">Gole Node</div>
        </div>


        <div class="start_node" style="height: 50px;">
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #000347; margin-left: 10px;"></div>
          <div class="statr_txt" style="float: left; margin-left: 5px;">Blocked/Wall Node</div>

          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: rgb(230, 120, 120); margin-left: 20px;"></div>
          <div class="statr_txt" style="float: left; margin-left: 5px;"v>Toll Node</div>
        </div>


        <div class="start_node" style="height: 50px;">
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: white; margin-left: 10px;"></div>
          <div class="statr_txt" style="float: left; margin-left: 5px;">Unvisitd Node</div>

          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: dodgerblue; margin-left: 55px;"></div>
          <div class="statr_txt" style="float: left; margin-left: 5px;">Path Node</div>
        </div>

        <div class="start_node" style="height: 50px;">
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #ffd300; margin-left: 10px;"></div>
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #00ffb6; margin-left: 10px;"></div>
          <div class="start" style="float: left; height: 30px; border: 1px solid black; width: 30px; background-color: #cc00ff; margin-left: 10px;"></div>

          <div class="statr_txt" style="float: left; margin-left: 5px;">Visited Nodes</div>
        </div>
    </div>
    `;
        this.shepherdService.defaultStepOptions = {
            scrollTo: true,
            cancelIcon: {
                enabled: true
            }
        };
        this.shepherdService.modal = true;
        this.shepherdService.confirmCancel = false;
        this.shepherdService.addSteps([
            {
                id: 'step0',
                title: '<h1><strong><code>Algo Visualizer</code></strong></h1>',
                text: ['<h5><strong>A fun way to visualize algorithms</strong></h5> <h6> Welcome, Let Have a walkthrough of this tool </h6>',
                    // color_representation,
                    '<img src="assets/Visualization_Intro.gif" width="100%" height="50%">'
                ],
                classes: 'example-step-extra-class',
                buttons: [
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Skip',
                        type: 'cancel'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ]
            },
            {
                id: 'step1',
                text: '<h6> Click on this <code>Algo Visualizer</code>, to get the walkthrough tutorial anytime </h6>',
                attachTo: {
                    element: '.navhome'
                },
                classes: 'example-step-extra-class',
                buttons: [
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Skip',
                        type: 'cancel'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Back',
                        type: 'back'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ]
            },
            {
                id: 'step2',
                text: ['<h6>Use these navbar dropdowns and options to select algorithms, grid size, create patterns/mazes and many more </h6>'],
                title: '<h3><strong><code>Algorithms and Options</code></strong></h3>',
                attachTo: {
                    element: '.navbar-nav'
                    // on: 'bottom'
                },
                classes: 'example-step-extra-class',
                buttons: [
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Skip',
                        type: 'cancel'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Back',
                        type: 'back'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ]
            },
            {
                id: 'step3',
                text: ['<h6>Use these buttons to visualize algorithm, clear visualization and reset/remove grid blocks</h6>'],
                title: '<h3><strong><code>Visualiztion Buttons</code></strong></h3>',
                attachTo: {
                    element: '.btn_navbar'
                },
                classes: 'example-step-extra-class',
                buttons: [
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Skip',
                        type: 'cancel'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Back',
                        type: 'back'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ]
            },
            {
                id: 'step4',
                text: [color_representation],
                title: '<h3><strong><code>Colors and It\'s <br> Representations</code></strong></h3>',
                classes: 'example-step-extra-class',
                buttons: [
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Skip',
                        type: 'cancel'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Back',
                        type: 'back'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ]
            },
            {
                id: 'step5',
                text: [`<h5>Left click on cell to to create blocked node and right click to crate toll nodes.<h5> 
              <h6>Walls or Blocked nodes are impssible to pass through, 
              therfore path between start and gole node can not pass through them. 
              <div style="margin-top:8px; margin-bottom:8px">
                Unlike Wall nodes, Toll nodes allows path to pass through them,
                but it a charge extra cost for permission to use a particular node.
              </div>
                Cost of toll node can be set under Options dropdown menu in navbar. 
                Five is selected as default cost for toll node. 
                change toll weight before creating toll block in grid to reflect thoes changes in for toll. 
               </h6> 
              <img src="assets/toll_block.gif" width="80%" height="40%">`],
                title: '<h3><strong><code>Wall and Toll Blocks</code></strong></h3>',
                classes: 'example-step-extra-class',
                buttons: [
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Skip',
                        type: 'cancel'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Back',
                        type: 'back'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Next',
                        type: 'next'
                    }
                ]
            },
            {
                id: 'step6',
                text: ['<div style="margin-bottom:20px;"><h5>Left click on Start or Goal cells and drag to move them and see the instant path change between them. </h5></div> <img src="assets/drag_drop.gif" width="100%" height="50%">'
                ],
                title: '<h3><strong><code>Drag and Drop</code></strong></h3>',
                classes: 'example-step-extra-class',
                buttons: [
                    {
                        classes: 'shepherd-button-primary',
                        text: 'Back',
                        type: 'back'
                    },
                    {
                        classes: 'shepherd-button-primary',
                        text: 'End',
                        type: 'cancel'
                    }
                ]
            }
        ]);
    }
}
AlgovisualizerComponent.ɵfac = function AlgovisualizerComponent_Factory(t) { return new (t || AlgovisualizerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](angular_shepherd__WEBPACK_IMPORTED_MODULE_6__["ShepherdService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](angular2_notifications__WEBPACK_IMPORTED_MODULE_7__["NotificationsService"])); };
AlgovisualizerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AlgovisualizerComponent, selectors: [["app-algovisualizer"]], viewQuery: function AlgovisualizerComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.child = _t.first);
    } }, decls: 12, vars: 7, consts: [[1, "main_component"], ["class", "walkthrough-overlay", 4, "ngIf"], [1, "app-walkthrouh-tutorial", 3, "walkthrough_isShow", "reset_tutorial"], [2, "position", "absolute", 3, "information", "reset", "is_touch_toll", "grid_size", "weight_values", "mazesAndPatterns"], [1, "main-window", 2, "z-index", "-20"], [1, "grid", 2, "margin-top", "100px"], ["disable", "", 3, "toll", "is_touch_toll", "cells", "inProcess", "iswallClicked", "dragged"], ["grid", ""], [1, "btn_navbar"], [3, "options"], [1, "footer"], [1, "footer_info"], [1, "walkthrough-overlay"]], template: function AlgovisualizerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AlgovisualizerComponent_div_1_Template, 1, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-walkthrouh-tutorial", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("reset_tutorial", function AlgovisualizerComponent_Template_app_walkthrouh_tutorial_reset_tutorial_2_listener($event) { return ctx.resetWalkthrough($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-nav-bar", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("information", function AlgovisualizerComponent_Template_app_nav_bar_information_3_listener($event) { return ctx.infoFromNav($event); })("reset", function AlgovisualizerComponent_Template_app_nav_bar_reset_3_listener($event) { return ctx.resetEverything($event); })("is_touch_toll", function AlgovisualizerComponent_Template_app_nav_bar_is_touch_toll_3_listener($event) { return ctx.changeTouchSetting($event); })("grid_size", function AlgovisualizerComponent_Template_app_nav_bar_grid_size_3_listener($event) { return ctx.ChangeGridSize($event); })("weight_values", function AlgovisualizerComponent_Template_app_nav_bar_weight_values_3_listener($event) { return ctx.changeWeightValues($event); })("mazesAndPatterns", function AlgovisualizerComponent_Template_app_nav_bar_mazesAndPatterns_3_listener($event) { return ctx.change_mazes_pattern($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "app-gridworld", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("iswallClicked", function AlgovisualizerComponent_Template_app_gridworld_iswallClicked_6_listener($event) { return ctx.oniswallClicked($event); })("dragged", function AlgovisualizerComponent_Template_app_gridworld_dragged_6_listener($event) { return ctx.startOrEndDragged($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "simple-notifications", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isWalkthrough);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("walkthrough_isShow", ctx.isWalkthrough);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("toll", ctx.toll_weight)("is_touch_toll", ctx.is_touch_toll)("cells", ctx.cells)("inProcess", ctx.inProcess);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.options);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _walkthrouh_tutorial_walkthrouh_tutorial_component__WEBPACK_IMPORTED_MODULE_9__["WalkthrouhTutorialComponent"], _nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_10__["NavBarComponent"], _gridworld_gridworld_component__WEBPACK_IMPORTED_MODULE_11__["GridworldComponent"], angular2_notifications__WEBPACK_IMPORTED_MODULE_7__["SimpleNotificationsComponent"]], styles: [".main-window[_ngcontent-%COMP%] {\n  margin-right: 0px;\n  margin-left: 0px;\n  padding-left: 0px;\n  padding-right: 0px;\n  width: 100vw;\n  height: 100%;\n}\n.grid[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 auto;\n  \n  \n  width: 100vw;\n  padding-left: 0px;\n  padding-right: 0px;\n  padding-bottom: 50px;\n  \n}\n.btn_navbar[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 80px;\n  width: 450px;\n  top: 0;\n  right: 10px;\n  z-index: -2;\n}\n.walkthrough_tutorial[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 100vh;\n  width: 100vw;\n  top: 0;\n  overflow: hidden;\n  text-align: center;\n}\n.center_div[_ngcontent-%COMP%] {\n  margin: auto;\n  position: fixed;\n  width: 50%;\n  margin-top: 20%;\n  margin-left: 25%;\n  border: 3px solid green;\n  background-color: aquamarine;\n  padding: 10px;\n}\n.tutorial_btn[_ngcontent-%COMP%] {\n  background-color: cornsilk;\n  margin-top: 80px;\n  margin-left: 10px;\n  width: 200px;\n}\n.container-fluid[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100vh;\n  text-align: center;\n  padding-top: 10px;\n  margin-bottom: 250px;\n  \n}\n.info[_ngcontent-%COMP%] {\n  widows: 100%;\n  height: 20vh;\n  background-color: goldenrod;\n}\n.droptarget[_ngcontent-%COMP%] {\n  float: left;\n  width: 100px;\n  height: 35px;\n  margin: 15px;\n  padding: 10px;\n  border: 5px solid red;\n}\n.footer[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: 0;\n  text-align: center;\n  height: 50px;\n\n  \n\n  background-color: #24252a !important;\n  bottom: -20px;\n}\n.start_node[_ngcontent-%COMP%] {\n  height: 50px;\n  background: red;\n}\n.start[_ngcontent-%COMP%] {\n  float: left;\n  height: 30px;\n  width: 30px;\n  background-color: sandybrown;\n\n  margin-left: 10px;\n}\n.statr_txt[_ngcontent-%COMP%] {\n  float: left;\n  margin-left: 5px;\n}\n.walkthrough-overlay[_ngcontent-%COMP%] {\n  height: 100vh;\n  opacity: 0.5;\n  transition: all 0.3s ease-out, height 0s 0s, opacity 0.3s 0s;\n  position: fixed;\n  top: 0;\n  width: 100vw;\n  z-index: 11;\n  background: rgba(153, 194, 133);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZ292aXN1YWxpemVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0dBUUc7QUFDSDtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osWUFBWTtBQUNkO0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLDJCQUEyQjtBQUM3QjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixZQUFZO0VBQ1osTUFBTTtFQUNOLFdBQVc7RUFDWCxXQUFXO0FBQ2I7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsWUFBWTtFQUNaLE1BQU07RUFDTixnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osZUFBZTtFQUNmLFVBQVU7RUFDVixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLHVCQUF1QjtFQUN2Qiw0QkFBNEI7RUFDNUIsYUFBYTtBQUNmO0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7QUFDQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsMEJBQTBCO0FBQzVCO0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLDJCQUEyQjtBQUM3QjtBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixZQUFZO0VBQ1osWUFBWTtFQUNaLGFBQWE7RUFDYixxQkFBcUI7QUFDdkI7QUFFQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsa0JBQWtCO0VBQ2xCLFlBQVk7O0VBRVosMENBQTBDOztFQUUxQyxvQ0FBb0M7RUFDcEMsYUFBYTtBQUNmO0FBRUE7RUFDRSxZQUFZO0VBQ1osZUFBZTtBQUNqQjtBQUNBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixXQUFXO0VBQ1gsNEJBQTRCOztFQUU1QixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osNERBQTREO0VBQzVELGVBQWU7RUFDZixNQUFNO0VBQ04sWUFBWTtFQUNaLFdBQVc7RUFDWCwrQkFBK0I7QUFDakMiLCJmaWxlIjoiYWxnb3Zpc3VhbGl6ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBtZWRpYSAobWF4LXdpZHRoOiA0NTBweCkge1xuICAubWFpbi13aW5kb3cge1xuICAgIGhlaWdodDogMjI1dnc7XG4gICAgYm9yZGVyOiAycHggc29saWQgcmVkO1xuICB9XG59XG4uY29udGFpbmVyLWZsdWlkIHtcbiAgaGVpZ2h0OiAxMDAlO1xufSAqL1xuLm1haW4td2luZG93IHtcbiAgbWFyZ2luLXJpZ2h0OiAwcHg7XG4gIG1hcmdpbi1sZWZ0OiAwcHg7XG4gIHBhZGRpbmctbGVmdDogMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZ3JpZCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luOiAwIGF1dG87XG4gIC8qIG1hcmdpbi10b3A6IDEwMHB4OyAqL1xuICAvKiBwYWRkaW5nOiAxMHB4OyAqL1xuICB3aWR0aDogMTAwdnc7XG4gIHBhZGRpbmctbGVmdDogMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XG4gIHBhZGRpbmctYm90dG9tOiA1MHB4O1xuICAvKiBwYWRkaW5nLWJvdHRvbTogMi41dmg7ICovXG59XG5cbi5idG5fbmF2YmFyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBoZWlnaHQ6IDgwcHg7XG4gIHdpZHRoOiA0NTBweDtcbiAgdG9wOiAwO1xuICByaWdodDogMTBweDtcbiAgei1pbmRleDogLTI7XG59XG5cbi53YWxrdGhyb3VnaF90dXRvcmlhbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMHZ3O1xuICB0b3A6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5jZW50ZXJfZGl2IHtcbiAgbWFyZ2luOiBhdXRvO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHdpZHRoOiA1MCU7XG4gIG1hcmdpbi10b3A6IDIwJTtcbiAgbWFyZ2luLWxlZnQ6IDI1JTtcbiAgYm9yZGVyOiAzcHggc29saWQgZ3JlZW47XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi50dXRvcmlhbF9idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBjb3Juc2lsaztcbiAgbWFyZ2luLXRvcDogODBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIHdpZHRoOiAyMDBweDtcbn1cbi5jb250YWluZXItZmx1aWQge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMjUwcHg7XG4gIC8qIHBhZGRpbmctYm90dG9tOiAyMHB4OyAqL1xufVxuXG4uaW5mbyB7XG4gIHdpZG93czogMTAwJTtcbiAgaGVpZ2h0OiAyMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBnb2xkZW5yb2Q7XG59XG5cbi5kcm9wdGFyZ2V0IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiAzNXB4O1xuICBtYXJnaW46IDE1cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJvcmRlcjogNXB4IHNvbGlkIHJlZDtcbn1cblxuLmZvb3RlciB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBoZWlnaHQ6IDUwcHg7XG5cbiAgLyogYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYSAhaW1wb3J0YW50OyAqL1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNDI1MmEgIWltcG9ydGFudDtcbiAgYm90dG9tOiAtMjBweDtcbn1cblxuLnN0YXJ0X25vZGUge1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJhY2tncm91bmQ6IHJlZDtcbn1cbi5zdGFydCB7XG4gIGZsb2F0OiBsZWZ0O1xuICBoZWlnaHQ6IDMwcHg7XG4gIHdpZHRoOiAzMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBzYW5keWJyb3duO1xuXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG4uc3RhdHJfdHh0IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi53YWxrdGhyb3VnaC1vdmVybGF5IHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgb3BhY2l0eTogMC41O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dCwgaGVpZ2h0IDBzIDBzLCBvcGFjaXR5IDAuM3MgMHM7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwdnc7XG4gIHotaW5kZXg6IDExO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDE1MywgMTk0LCAxMzMpO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AlgovisualizerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-algovisualizer',
                templateUrl: './algovisualizer.component.html',
                styleUrls: ['./algovisualizer.component.css']
            }]
    }], function () { return [{ type: angular_shepherd__WEBPACK_IMPORTED_MODULE_6__["ShepherdService"] }, { type: angular2_notifications__WEBPACK_IMPORTED_MODULE_7__["NotificationsService"] }]; }, { child: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['grid']
        }] }); })();


/***/ }),

/***/ "oI3j":
/*!***********************************!*\
  !*** ./src/app/algorithms/DFS.ts ***!
  \***********************************/
/*! exports provided: DFS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DFS", function() { return DFS; });
/* harmony import */ var _algo_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./algo-helper */ "Y3ol");

class DFS {
    constructor() {
        this.gridcells = [];
        this.visited = [];
        this.isPathAvail = false;
        this.start_mid = [];
        this.end_mid = [];
    }
    runDFS(cells, start, end, navinformation) {
        this.gridcells = cells;
        this.navigation = navinformation;
        // this.isPathAvail = this.DFS_Path(start, end);   
        if (this.navigation.allowBidirection) {
            this.start_mid = [];
            this.end_mid = [];
            this.isPathAvail = this.DFS_Bidirection_Path(start, end);
        }
        else {
            this.isPathAvail = this.DFS_Path(start, end);
        }
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
    generatePath(start, end) {
        if (this.navigation.allowBidirection) {
            return _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].generateBidirectionPath(start, end, this.gridcells, this.start_mid, this.end_mid);
        }
        else {
            return _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].generatePath(start, end, this.gridcells);
        }
    }
    DFS_Path(start, end) {
        var q = [];
        this.visited = [];
        q.push(start);
        while (q.length != 0) {
            var current = q.pop();
            if (current) {
                if (this.gridcells[current[0]][current[1]].status == 'end') {
                    return true;
                }
                this.gridcells[current[0]][current[1]].vertex_status = 'current';
                if (this.navigation.allowDiagonals) {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                }
                else {
                    var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                }
                while (neighbors.length != 0) {
                    var n = neighbors.shift();
                    if (n) {
                        if (this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' && this.gridcells[n[0]][n[1]].status != 'close') {
                            this.gridcells[n[0]][n[1]].vertex_status = 'neighbors';
                            q.push(n);
                            this.gridcells[n[0]][n[1]].prev = current;
                        }
                    }
                }
                this.visited.push(current);
                this.gridcells[current[0]][current[1]].vertex_status = 'visited';
            }
            else {
                throw new Error('Current node is undefined');
            }
        }
        return false;
    }
    DFS_Bidirection_Path(start, end) {
        this.visited = [];
        var q_start = [];
        q_start.push(start);
        var q_goal = [];
        q_goal.push(end);
        while (q_start.length != 0 && q_goal.length != 0) {
            if (q_start.length != 0) {
                var current = q_start.pop();
                if (current) {
                    if (this.gridcells[current[0]][current[1]].status == 'end' || this.gridcells[current[0]][current[1]].vertex_status == 'visited_goal') {
                        return true;
                    }
                    this.gridcells[current[0]][current[1]].vertex_status = 'current';
                    if (this.navigation.allowDiagonals) {
                        var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                    }
                    else {
                        var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                    }
                    while (neighbors.length != 0) {
                        var n = neighbors.shift();
                        if (n) {
                            if ((this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors_end' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal') && this.gridcells[n[0]][n[1]].status != 'close') {
                                if (this.gridcells[n[0]][n[1]].vertex_status == 'visited_goal') {
                                    this.visited.push(current);
                                    this.gridcells[current[0]][current[1]].vertex_status = 'visited_start';
                                    this.start_mid = current;
                                    this.end_mid = n;
                                    if (this.gridcells[n[0]][n[1]].status != 'start' && this.gridcells[n[0]][n[1]].status != 'end') {
                                        this.gridcells[n[0]][n[1]].status = 'mid';
                                        this.gridcells[n[0]][n[1]].vertex_status = 'unvisited';
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
            }
            else {
                throw new Error('Current node is undefined');
            }
            if (q_goal.length != 0) {
                var current = q_goal.pop();
                if (current) {
                    if (this.gridcells[current[0]][current[1]].status == 'start' || this.gridcells[current[0]][current[1]].vertex_status == 'visited_start') {
                        return true;
                    }
                    this.gridcells[current[0]][current[1]].vertex_status = 'current';
                    if (this.navigation.allowDiagonals) {
                        var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findAllNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                    }
                    else {
                        var neighbors = _algo_helper__WEBPACK_IMPORTED_MODULE_0__["AlgoHelper"].findNeighbors(current[0], current[1], this.gridcells.length, this.gridcells[0].length);
                    }
                    while (neighbors.length != 0) {
                        var n = neighbors.shift();
                        if (n) {
                            if ((this.gridcells[n[0]][n[1]].vertex_status == 'unvisited' || this.gridcells[n[0]][n[1]].vertex_status == 'neighbors' || this.gridcells[n[0]][n[1]].vertex_status == 'visited_start') && this.gridcells[n[0]][n[1]].status != 'close') {
                                if (this.gridcells[n[0]][n[1]].vertex_status == 'visited_start') {
                                    this.visited.push(current);
                                    this.gridcells[current[0]][current[1]].vertex_status = 'visited_goal';
                                    this.start_mid = n;
                                    this.end_mid = current;
                                    if (this.gridcells[n[0]][n[1]].status != 'start' && this.gridcells[n[0]][n[1]].status != 'end') {
                                        this.gridcells[n[0]][n[1]].status = 'mid';
                                        this.gridcells[n[0]][n[1]].vertex_status = 'unvisited';
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
            }
            else {
                throw new Error('Current node is undefined');
            }
        }
        return false;
    }
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map