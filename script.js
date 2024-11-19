// Function to fetch and parse CSV data
async function fetchCSV(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    
    const text = await response.text();
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line); // Remove empty rows
  } catch (error) {
    console.error("Error fetching or parsing CSV data:", error);
    return [];
  }
}

// Function to display data in a list
function displayData(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Element with ID '${containerId}' not found.`);
    return;
  }

  // Clear previous content
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No data available</p>";
    return;
  }

  // Create and populate a list
  const ul = document.createElement("ul");
  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

// Function to handle category button clicks
async function handleCategoryClick(fileName, containerId) {
  const data = await fetchCSV(`data/${fileName}`);
  displayData(data, containerId);
}

// Function to display the years list on load
async function displayYears() {
  const years = await fetchCSV("data/Years.csv");
  displayData(years, "years-list");
}

// Event listeners for category buttons
document.addEventListener("DOMContentLoaded", () => {
  // Display the years list on load
  displayYears();

  // Attach event listeners to buttons
  document.getElementById("filter-years").addEventListener("click", () => {
    handleCategoryClick("Years.csv", "data-display");
  });

  document.getElementById("filter-genres").addEventListener("click", () => {
    handleCategoryClick("Genres.csv", "data-display");
  });

  document.getElementById("filter-venues").addEventListener("click", () => {
    handleCategoryClick("Venues.csv", "data-display");
  });

  document.getElementById("filter-artforms").addEventListener("click", () => {
    handleCategoryClick("Artforms.csv", "data-display");
  });
});
