// script.js

// Function to generate a random number between min (inclusive) and max (inclusive)
function getRandomTime(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise(name) {
    const minDelay = 1; // seconds
    const maxDelay = 3; // seconds
    const delay = getRandomTime(minDelay, maxDelay); // delay in seconds
    const delayMs = delay * 1000; // delay in milliseconds

    // The promise resolves with the time it took (in seconds)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(delay);
        }, delayMs);
    });
}

// Get the table body element
const outputBody = document.getElementById('output');

// 1. Initial HTML Table Structure: Display "Loading..." row
function showLoading() {
    outputBody.innerHTML = `
        <tr id="loading-row">
            <td colspan="2" class="text-center">Loading...</td>
        </tr>
    `;
}

// 2. Create Promises
const promise1 = createPromise('Promise 1');
const promise2 = createPromise('Promise 2');
const promise3 = createPromise('Promise 3');

const allPromises = [promise1, promise2, promise3];
const promiseNames = ['Promise 1', 'Promise 2', 'Promise 3'];

// Main function to run the process
async function runPromiseResolutionTracker() {
    // Display loading message before promises start
    showLoading();
    
    // Record the start time
    const startTime = performance.now();

    try {
        // Wait for all promises to resolve
        const results = await Promise.all(allPromises);
        
        // Record the end time for Promise.all()
        const endTime = performance.now();
        
        // Calculate the total time taken (time for the slowest promise)
        // Note: performance.now() is in milliseconds, convert to seconds
        const totalTimeSeconds = (endTime - startTime) / 1000;

        // 3. Populating the Table: Remove loading and display results
        
        // Clear the loading row
        outputBody.innerHTML = ''; 

        // Add rows for each individual promise
        for (let i = 0; i < results.length; i++) {
            const timeTaken = results[i]; // already in seconds
            const name = promiseNames[i];

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${timeTaken.toFixed(3)}</td>
            `;
            outputBody.appendChild(row);
        }

        // Add the Total row
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td><strong>Total</strong></td>
            <td><strong>${totalTimeSeconds.toFixed(3)}</strong></td>
        `;
        outputBody.appendChild(totalRow);

    } catch (error) {
        // Handle any promise rejections (though not expected with this setup)
        console.error("One of the promises failed:", error);
        outputBody.innerHTML = `
            <tr>
                <td colspan="2" class="text-danger text-center">Error: Failed to resolve all promises.</td>
            </tr>
        `;
    }
}

// Execute the main function
runPromiseResolutionTracker();