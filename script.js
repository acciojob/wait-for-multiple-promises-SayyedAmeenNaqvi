const output = document.getElementById("output");

// Step 1: show the default "Loading..." row
const loadingRow = document.createElement("tr");
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

// Step 2: function to create a promise with random delay between 1 and 3 seconds
function createRandomPromise(promiseNumber) {
  return new Promise((resolve) => {
    const delay = Math.random() * 2000 + 1000; // 1000ms to 3000ms
    const startTime = performance.now();

    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(3); // seconds with 3 decimals
      resolve({ name: `Promise ${promiseNumber}`, time: timeTaken });
    }, delay);
  });
}

// Step 3: create 3 promises
const promises = [
  createRandomPromise(1),
  createRandomPromise(2),
  createRandomPromise(3),
];

// Step 4: wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Remove "Loading..." row
  output.innerHTML = "";

  // Populate each promise result
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${res.name}</td><td>${res.time}</td>`;
    output.appendChild(row);
  });

  // Calculate total (longest time)
  const totalTime = Math.max(...results.map((r) => parseFloat(r.time))).toFixed(3);
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td><b>Total</b></td><td>${totalTime}</td>`;
  output.appendChild(totalRow);
});
