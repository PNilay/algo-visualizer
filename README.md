# AlgoVisulalizer

## Description

The web application “Algo-Visualizer” is designed to visualize various types of path finding algorithms in graph data structure. Use link https://pnilay.github.io/algo-visualizer/ to access “Algo-Visualizer” pathfinding application.

A graph is a set of nodes where some pairs of nodes are connected using directed or undirected links/edges. A graph may be weighted (numerical value associated with connection between two nodes) or unweighted (all connection have unit weight or all connections have the same constant weight)

Pathfinding is a way to identify the path from a source to a destination avoiding obstacles and minimizing the costs. Pathfinding is a practical variant on solving mazes, which explores routes between nodes, starting at source and traversing through graph networks until the goal node has been reached. Pathfinding algorithms apply to a huge range of applications, such as google maps, routing packets over the internet, satellite navigation system, games, road building, and many more.

Below are a few popular pathfinding algorithms.

## Algorithms

### Breadth First Search (BFS)

Breadth First Search (BFS) is one of the most fundamental graph/tree traversal algorithm. BFS starts traversing from a selected source node and explores the graph layerwise thus exploring neighbor nodes (nodes which are directly connected to current node), then it examines all the neighbors of neighbor, and so on, until it reaches the goal node. It is a remarkable algorithm which guarantees the shortest path between two nodes for unweighted (all the connections have the same weight) graph. 

Time Complexity: O(V+E) where V is number of nodes and E is the edges in the graph
Space Complexity:  O(V) 
