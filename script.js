// Get the tbody where the results will appear
const output = document.getElementById("output");


const loadingRow = document.createElement("tr");
loadingRow.id = "loading-row";
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
output.appendChild(loadingRow);


function createTimedPromise(index) {
  const timeInSeconds = (Math.random() * 2 + 1).toFixed(3); // 1 to 3 seconds

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: `Promise ${index}`, time: Number(timeInSeconds) });
    }, timeInSeconds * 1000);
  });
}


const promises = [
  createTimedPromise(1),
  createTimedPromise(2),
  createTimedPromise(3),
];

// Track total time using performance.now()
const startTime = performance.now();

Promise.all(promises).then((results) => {
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

 
  output.innerHTML = "";


  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}</td>
  `;
  output.appendChild(totalRow);
});
