// Function to fetch CSV data
async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

    const text = await response.text();
    const rows = text.split("\n").slice(1); // Skip header row
    return rows.map(row => row.trim()); // Remove whitespace
  } catch (error) {
    console.error("Error fetching CSV:", error);
    return [];
  }
}



// Function to display the years
async function displayYears() {
  const yearsListDiv = document.getElementById("years-list");

  if (!yearsListDiv) {
    console.error("No element with ID 'years-list' found.");
    return;
  }

  yearsListDiv.innerHTML = "<h2>Festival Years</h2>";

  const years = await fetchCSV("data/Years.csv");

  if (years.length === 0) {
    yearsListDiv.innerHTML += "<p>No years found in the data.</p>";
    return;
  }

  const ul = document.createElement("ul");
  years.forEach(year => {
    if (year) {
      const li = document.createElement("li");
      li.textContent = year;
      li.className = "year-item";

      li.addEventListener("click", () => {
        console.log(`Clicked on year: ${year}`);
      });

      ul.appendChild(li);
    }
  });

  yearsListDiv.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", displayYears);

document.addEventListener("DOMContentLoaded", () => {
  displayYears();
});
