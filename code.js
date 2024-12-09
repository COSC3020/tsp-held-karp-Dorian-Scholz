function tsp_hk(distance_matrix) 
{
    if (!Array.isArray(distance_matrix) || distance_matrix.length === 0)
    {
        throw new Error("Invalid distance matrix");
    }

    const n = distance_matrix.length;
    const VISITED_ALL = (1 << n) - 1;
    let memo = {};

    function tsp_dp(mask, pos) 
    {
        
        if (mask === VISITED_ALL)
        {
            return distance_matrix[pos][0] || Infinity; 
        }

        
        const key = `${mask}-${pos}`;
        if (memo[key] !== undefined)
        {
            return memo[key];
        }

        
        let minCost = Infinity;
        for (let city = 0; city < n; city++) 
        {
            if ((mask & (1 << city)) === 0)
            { 
                const newMask = mask | (1 << city);
                const cost = distance_matrix[pos][city] || Infinity; 
                const totalCost = cost + tsp_dp(newMask, city);
                minCost = Math.min(minCost, totalCost);
            }
        }

        
        memo[key] = minCost;
        return minCost;
    }

    
    memo = {};
    return tsp_dp(1, 0); // Start the TSP from the first city (index 0) with only that city visited
}
