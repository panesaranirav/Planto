const autocannon = require('autocannon');

// Function to format results
const formatResults = (result, serverType) => {
    console.log(`\n${serverType} Test Results:`);
    console.log('----------------------------------------');
    console.log(`Total Requests: ${result.requests.total}`);
    console.log(`Requests/sec: ${result.requests.average}`);
    console.log(`Average Latency: ${result.latency.average}ms`);
    console.log(`Max Latency: ${result.latency.max}ms`);
    console.log(`Total Errors: ${result.errors}`);
    console.log(`Non-2xx Responses: ${result.non2xx}`);
    if (result.errors > 0 || result.non2xx > 0) {
        console.log('Warning: Some requests failed or returned non-2xx responses');
    }
};

// Track requests per route
const routeStats = {
    home: 0,
    plants: 0,
    more: 0,
    contact: 0,
    cart: 0,
    profile: 0,
    userProfile: 0
};

// Create multiple instances for different URLs
const instances = [
    autocannon({
        url: 'http://localhost:5000',
        connections: 10,
        duration: 30,
        requests: [
            {
                method: 'GET',
                path: '/'
            },
            {
                method: 'GET',
                path: '/user-profile?email=dom%40gmail.com',
                onResponse: (status) => {
                    if (status === 200) routeStats.userProfile++;
                    if (status !== 200) console.log(`User Profile route returned status ${status}`);
                }
            }
        ]
    }, (err, result) => {
        if (err) {
            console.error('Backend test error:', err);
            return;
        }
        formatResults(result, 'Backend');
    }),
    autocannon({
        url: 'http://localhost:5173',
        connections: 10,
        duration: 30,
        timeout: 10,
        requests: [
            {
                method: 'GET',
                path: '/home',
                onResponse: (status) => {
                    if (status === 200) routeStats.home++;
                    if (status !== 200) console.log(`Home route returned status ${status}`);
                }
            },
            {
                method: 'GET',
                path: '/plants',
                onResponse: (status) => {
                    if (status === 200) routeStats.plants++;
                    if (status !== 200) console.log(`Plants route returned status ${status}`);
                }
            },
            {
                method: 'GET',
                path: '/more',
                onResponse: (status) => {
                    if (status === 200) routeStats.more++;
                    if (status !== 200) console.log(`More route returned status ${status}`);
                }
            },
            {
                method: 'GET',
                path: '/contact',
                onResponse: (status) => {
                    if (status === 200) routeStats.contact++;
                    if (status !== 200) console.log(`Contact route returned status ${status}`);
                }
            },
            {
                method: 'GET',
                path: '/cart',
                onResponse: (status) => {
                    if (status === 200) routeStats.cart++;
                    if (status !== 200) console.log(`Cart route returned status ${status}`);
                }
            },
            {
                method: 'GET',
                path: '/profile',
                onResponse: (status) => {
                    if (status === 200) routeStats.profile++;
                    if (status !== 200) console.log(`Profile route returned status ${status}`);
                }
            }
        ]
    }, (err, result) => {
        if (err) {
            console.error('Frontend test error:', err);
            return;
        }
        formatResults(result, 'Frontend (React.js)');
        
        // Print route-specific statistics
        console.log('\nRoute-wise Statistics:');
        console.log('----------------------------------------');
        console.log(`Home route: ${routeStats.home} requests`);
        console.log(`Plants route: ${routeStats.plants} requests`);
        console.log(`More route: ${routeStats.more} requests`);
        console.log(`Contact route: ${routeStats.contact} requests`);
        console.log(`Cart route: ${routeStats.cart} requests`);
        console.log(`Profile route: ${routeStats.profile} requests`);
        console.log(`User Profile route: ${routeStats.userProfile} requests`);
        
        // Calculate percentage distribution
        const total = routeStats.home + routeStats.plants + routeStats.more + 
                     routeStats.contact + routeStats.cart + routeStats.profile + 
                     routeStats.userProfile;
        console.log('\nRequest Distribution:');
        console.log('----------------------------------------');
        console.log(`Home: ${((routeStats.home/total)*100).toFixed(2)}%`);
        console.log(`Plants: ${((routeStats.plants/total)*100).toFixed(2)}%`);
        console.log(`More: ${((routeStats.more/total)*100).toFixed(2)}%`);
        console.log(`Contact: ${((routeStats.contact/total)*100).toFixed(2)}%`);
        console.log(`Cart: ${((routeStats.cart/total)*100).toFixed(2)}%`);
        console.log(`Profile: ${((routeStats.profile/total)*100).toFixed(2)}%`);
        console.log(`User Profile: ${((routeStats.userProfile/total)*100).toFixed(2)}%`);
    })
];

// Track progress for all instances
instances.forEach(instance => {
    autocannon.track(instance, { 
        renderProgressBar: true,
        renderLatencyTable: true,
        renderResultsTable: true
    });
});

// Handle CTRL+C
process.on('SIGINT', () => {
    console.log('Stopping tests...');
    instances.forEach(instance => instance.stop());
});