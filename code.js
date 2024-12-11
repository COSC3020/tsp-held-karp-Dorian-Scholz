function tsp_hk(distance_matrix) 
{
    const n = distance_matrix.length;
    const memo = new Map();

    
    function heldKarp(mask, current) 
    {
        
        if (mask === (1 << current)) 
        {
            return 0; 
        }

        
        const key = `${mask}-${current}`;
        if (memo.has(key))
        {
            return memo.get(key);
        }

        let minDistance = Infinity;

        
        for (let prev = 0; prev < n; prev++) 
        {
            if (prev !== current && (mask & (1 << prev))) 
            {
                
                const distance = 
                    heldKarp(mask ^ (1 << current), prev) + distance_matrix[prev][current];
                minDistance = Math.min(minDistance, distance);
            }
        }

        
        memo.set(key, minDistance);
        return minDistance;
    }

    
    let result = Infinity;
    for (let start = 0; start < n; start++)
    {
        
        memo.clear();
        
        const allVisitedMask = (1 << n) - 1;
        result = Math.min(result, heldKarp(allVisitedMask, start));
    }
