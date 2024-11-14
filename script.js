// Function to fetch CSV data
// Function to fetch CSV data and handle duplicates and whitespace
async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

    const text = await response.text();
    const rows = text.split("\n").slice(1); // Skip header row

    // Clean up rows to remove whitespace and empty entries
    const years = rows
      .map(row => row.trim())         // Remove whitespace
      .filter(row => row !== "")      // Remove any empty rows
      .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

    return years;
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

  // Fetch the years from the CSV file
  const years = await fetchCSV("data/Years.csv");

  if (years.length === 0) {
    yearsListDiv.innerHTML += "<p>No years found in the data.</p>";
    return;
  }

  const ul = document.createElement("ul");
  years.forEach(year => {
    const li = document.createElement("li");
    li.textContent = year;
    li.className = "year-item";

    li.addEventListener("click", () => {
      console.log(`Clicked on year: ${year}`);
    });

    ul.appendChild(li);
  });

  yearsListDiv.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", displayYears);




// Function to display the years
async function displayYears() {
  const yearsListDiv = document.getElementById("years-list");

  if (!yearsListDiv) {
    console.error("No element with ID 'years-list' found.");
    return;
  }

  yearsListDiv.innerHTML = "<h2>Festival Years</h2>";

  // Fetch the years from the CSV file
  const years = await fetchCSV("data/Years.csv");

  // Deduplicate years by using a Set
  const uniqueYears = [...new Set(years.filter(year => year))]; // Filter out any empty rows

  if (uniqueYears.length === 0) {
    yearsListDiv.innerHTML += "<p>No years found in the data.</p>";
    return;
  }

  const ul = document.createElement("ul");
  uniqueYears.forEach(year => {
    const li = document.createElement("li");
    li.textContent = year;
    li.className = "year-item";

    li.addEventListener("click", () => {
      console.log(`Clicked on year: ${year}`);
    });

    ul.appendChild(li);
  });

  yearsListDiv.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", displayYears);

document.addEventListener("DOMContentLoaded", () => {
  displayYears();
});
