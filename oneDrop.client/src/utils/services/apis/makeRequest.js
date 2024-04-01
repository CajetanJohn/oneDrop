async function MakeRequest(data) {
    // Log the received data

    // Return a Promise that resolves after a timeout of 10 seconds
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            // Simulate successful API call by resolving the Promise with some data
            resolve({ message: 'Signup successful', data });
        }, 10000); // Timeout of 10 seconds (10000 milliseconds)
    });
}

export default MakeRequest;
