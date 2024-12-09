function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;

    // Memoization cache
    const memo = {};

    /**
     * Helper function to calculate the TSP solution using recursion and memoization.
     * @param {number} pos - Current city index.
     * @param {number} visited - Bitmask representing visited cities.
     * @returns {number} - Minimum cost to complete the tour from the current state.
     */
    function heldKarp(pos, visited) {
        // Base case: all cities have been visited, return cost to return to start
        if (visited === (1 << n) - 1) {
            return distance_matrix[pos][0]; // Return to start city
        }

        // Check memoization cache
        const key = `${pos},${visited}`;
        if (key in memo) {
            return memo[key];
        }

        let minCost = Infinity;

        // Try visiting all unvisited cities
        for (let next = 0; next < n; next++) {
            // Check if the city `next` has been visited
            if (!(visited & (1 << next))) {
                // Mark the city as visited and recurse
                const newVisited = visited | (1 << next);
                const cost = distance_matrix[pos][next] + heldKarp(next, newVisited);
                minCost = Math.min(minCost, cost);
            }
        }

        // Store result in memoization cache
        memo[key] = minCost;
        return minCost;
    }

    // Start the recursion from the first city, with only the first city visited
    const result = heldKarp(0, 1);

    // Clear the memoization cache for a fresh start for subsequent calls
    Object.keys(memo).forEach(key => delete memo[key]);

    return result;
}
