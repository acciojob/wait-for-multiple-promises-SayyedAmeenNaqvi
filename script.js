// script.js

// Function to create a promise that resolves after a random delay (1–3 seconds)
function createPromise(index) {
  const delay = Math.floor(Math.random() * 3) + 1; // 1 to 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: `Promise ${index}`, time: delay.toFixed(3) });
    }, delay * 1000);
  });
}

const promises = [
  createPromise(1),
  createPromise(2),
  createPromise(3),
];

const output = document.getElementById("output");
const loadingRow = document.getElementById("loading-row");

// Use Promise.all to wait for all promises
Promise.all(promises).then((results) => {
  // Remove the loading row
  if (loadingRow) {
    output.removeChild(loadingRow);
  }

  // Add rows for each resolved promise
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time}</td>
    `;
    output.appendChild(row);
  });

  // Calculate total (max time among promises)
  const times = results.map((r) => parseFloat(r.time));
  const totalTime = Math.max(...times).toFixed(3);

  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}</td>
  `;
  output.appendChild(totalRow);
});
