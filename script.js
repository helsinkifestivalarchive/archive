// Function to fetch and parse CSV data
async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    
    const text = await response.text();
    const rows = text.split("\n").slice(1); // Split by line and skip the header row

    return rows.map(row => row.trim()); // Remove extra whitespace and return the rows as an array
  } catch (error) {
    console.error("Error fetching or parsing CSV data:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dataDisplay = document.getElementById("data-display");

  // Function to fetch and parse CSV
  async function fetchCSV(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    return text.split("\n").map((line) => line.trim()).filter((line) => line);
  }

  // Function to display data
  function displayData(data) {
    dataDisplay.innerHTML = ""; // Clear previous content
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      dataDisplay.appendChild(li);
    });
  }

 // Add event listeners for categories
  document.getElementById("filter-years").addEventListener("click", async () => {
    const years = await fetchCSV("data/Years.csv");
    displayData(years);
  });

  document.getElementById("filter-genres").addEventListener("click", async () => {
    const genres = await fetchCSV("data/Genres.csv");
    displayData(genres);
  });

  document.getElementById("filter-venues").addEventListener("click", async () => {
    const venues = await fetchCSV("data/Venues.csv");
    displayData(venues);
  });

  document.getElementById("filter-artforms").addEventListener("click", async () => {
    const artforms = await fetchCSV("data/Artforms.csv");
    displayData(artforms);
  });
});

// Function to display the list of years
async function displayYears() {
  const yearsListDiv = document.getElementById("years-list");
  if (!yearsListDiv) {
    console.error("Element with ID 'years-list' not found.");
    return;
  }


  // Fetch the years from the CSV file
  const years = await fetchCSV("data/Years.csv");

  // Check if any years were fetched
  if (years.length === 0) {
    yearsListDiv.innerHTML += "<p>No data available</p>";

  document.addEventListener("DOMContentLoaded", function () {
  const filterDropdown = document.getElementById("filter");
  const displayList = document.getElementById("years");
  const errorMessage = document.getElementById("error-message");

  // Load CSV files based on filter
  async function loadData(filter) {
    try {
      // Clear any existing list items
      displayList.innerHTML = "";

      // Load data from the appropriate CSV file
      let response = await fetch(`data/${filter}.csv`);
      if (!response.ok) throw new Error(`Failed to load ${filter}.csv`);

      let data = await response.text();
      let rows = data.split("\n").map(row => row.trim()).filter(row => row);

      // Remove header if present and display items
      if (rows[0].toLowerCase().includes(filter)) rows.shift();
      rows.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = item;
        displayList.appendChild(listItem);
      });
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  }

  // Initial load with "Year" as the default filter
  loadData("year");

  // Update displayed data when the filter changes
  filterDropdown.addEventListener("change", () => {
    const selectedFilter = filterDropdown.value;
    loadData(selectedFilter);
  });
});

    return;
  }

  // Create an unordered list element
  const ul = document.createElement("ul");
  ul.id = "years-list-ul";

  years.forEach(year => {
    if (year) { // Skip any empty rows
      const li = document.createElement("li");
      li.textContent = year;
      li.className = "year-item";

      // Add a click event to each year item (for future navigation functionality)
      li.addEventListener("click", () => {
        // For now, this just logs the selected year to the console
        console.log(`Year selected: ${year}`);
      });

      ul.appendChild(li); // Append each year to the unordered list
    }
  });

  yearsListDiv.appendChild(ul); // Append the list to the yearsListDiv
}

// Call displayYears when the page loads
document.addEventListener("DOMContentLoaded", displayYears);
