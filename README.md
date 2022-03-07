# AlgoVisulalizer

## Description

The web application “Algo-Visualizer” is designed to visualize various types of path finding algorithms in graph data structure. Use link https://pnilay.github.io/algo-visualizer/ to access “Algo-Visualizer” pathfinding application.

A graph is a set of nodes where some pairs of nodes are connected using directed or undirected links/edges. A graph may be weighted (numerical value associated with connection between two nodes) or unweighted (all connection have unit weight or all connections have the same constant weight)

Pathfinding is a way to identify the path from a source to a destination avoiding obstacles and minimizing the costs. Pathfinding is a practical variant on solving mazes, which explores routes between nodes, starting at source and traversing through graph networks until the goal node has been reached. Pathfinding algorithms apply to a huge range of applications, such as google maps, routing packets over the internet, satellite navigation system, games, road building, and many more.

Below are a few popular pathfinding algorithms.

## Algorithms

### Breadth First Search (BFS)

Breadth First Search (BFS) is one of the most fundamental graph/tree traversal algorithm. BFS starts traversing from a selected source node and explores the graph layerwise thus exploring neighbor nodes (nodes which are directly connected to current node), then it examines all the neighbors of neighbor, and so on, until it reaches the goal node. It is a remarkable algorithm which **guarantees the shortest path between two nodes for unweighted (all the connections have the same weight) graph**. 

 - Time Complexity: O(V+E) where V is number of nodes and E is the edges in the graph
 - Space Complexity:  O(V) 

### Depth First Search (DFS)

Depth First Search (DFS) is the other fundamental graph traversal algorithm, which starts at the source node and explores as far as possible along each branch before going back, therefore this algorithm is also known as Backtracking. Due to this backtracking feature, the DFS algorithm can be implemented in both iterative and recursive ways. The DFS algorithm is widely used to find connected components, topological sorting, maze generation, to detect cycles in a graph and many more. However, **the DFS algorithm does not guarantee the shortest path between two nodes**.

 - Time Complexity: O(V+E) where, V is number of nodes and E is the edges in the graph
 - Space Complexity:  O(V) 
 
 ### Dijkstra's Algorithm
 
Dijkstra’s algorithm is used to find the shortest path from a root node to not only gole node but every other node in the graph. In was developed by computer scientists Edsger W. Dijkstra in 1956. Dijkstra’s algorithm eliminates useless traversal and uses heuristics to determine optimal paths between the start node to every other node. Due to its capability to **find shortest distance between all other nodes from source node**, it is widely used in internet routing protocols, geographical maps (google maps), social networking applications, telephone networks and many more. 

 - Time Complexity: O(ElogV) where, E is the number of edges and V is the number of vertices
 - Space Complexity: O(V)
 
### A* Algorithm (Modified Dijkstra)

A* algorithm is a very popular path finding and graph traversal algorithm based on heuristic search. This algorithm finds the shortest path between source node and destination node, and avoids obstacles between those nodes. Many real time video games, robotics, and web based maps use this algorithm to find the shortest path between initial and final state very efficiently. A* is a modified version of Dijksta’s algorithm, which is optimized to find a path to a single final state, instead of multiple locations. This algorithm prioritizes paths which appear to be leading closer to a final state.

  - A* algorithm works based on following three main parameter:
      - g-value [g(s)] (Smallest cost-to-come): The length of the shortest path from the start state to s found by the A* search. It is the sum of all cells that have been visited before state s.
      - h-value [h(s)] (Heuristic value): The estimated distance between the current state s and final state.
      - f-value [f(s)] : f(s) = g(s) + h(s), estimates the distance from the start state to the gole state via state s.
    
The A* algorithm finds a shortest path, by taking the f-value into account. The algorithm selects the smallest f-value node and moves to that node. The process continues until the algorithm reaches its destination node.
