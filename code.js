function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;

    if (n === 0) return 0;

    
    const memo = new Map();

    const VISITED_ALL = (1 << n) - 1;

    function dp(mask, pos) {
        const key = `${mask}-${pos}`;

        
        if (memo.has(key)) {
            return memo.get(key);
        }

        
        if (mask === VISITED_ALL) {
            return distance_matrix[pos][0] || 0; 
        }

        let minCost = Infinity;

        
        for (let city = 0; city < n; city++) {
            if ((mask & (1 << city)) === 0) {
                const newCost = (distance_matrix[pos][city] || 0) + dp(mask | (1 << city), city);
                minCost = Math.min(minCost, newCost);
            }
        }

        
        memo.set(key, minCost);
        return minCost;
    }

    return dp(1, 0);
}

