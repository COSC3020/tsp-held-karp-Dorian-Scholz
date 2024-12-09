function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;

    if (n === 0) return 0;

    // Reset memoization cache for every call
    const memo = new Map();

    const VISITED_ALL = (1 << n) - 1;

    function dp(mask, pos) {
        const key = `${mask}-${pos}`;

        // Check if the result is already in the cache
        if (memo.has(key)) {
            return memo.get(key);
        }

        // Base case: all cities visited, return cost to return to the start
        if (mask === VISITED_ALL) {
            return distance_matrix[pos][0] || 0; // Cost to return to start
        }

        let minCost = Infinity;

        // Try visiting every unvisited city
        for (let city = 0; city < n; city++) {
            if ((mask & (1 << city)) === 0) {
                const newCost = (distance_matrix[pos][city] || 0) + dp(mask | (1 << city), city);
                minCost = Math.min(minCost, newCost);
            }
        }

        // Save the result in the memo and return
        memo.set(key, minCost);
        return minCost;
    }

    // Start the recursion from the first city and visiting only it
    return dp(1, 0);
}

// Test cases
const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js') + '');

let dm;

dm = [[]];
assert(tsp_hk(dm) == 0);

dm = [[0]];
assert(tsp_hk(dm) == 0);

dm = [[0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]];
assert(tsp_hk(dm) == 0);

dm = [[0, 1, 2],
      [1, 0, 2],
      [2, 2, 0]];
assert(tsp_hk(dm) == 3);

// https://people.sc.fsu.edu/~jburkardt/datasets/tsp/tsp.html
dm = [[0, 3, 4, 2, 7],
      [3, 0, 4, 6, 3],
      [4, 4, 0, 5, 8],
      [2, 6, 5, 0, 6],
      [7, 3, 8, 6, 0]];
assert(tsp_hk(dm) == 13);

console.log("All tests passed!");
