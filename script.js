// Function to fetch and parse CSV data
async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    
    const text = await response.text();
    return text
      .split("\n")
      .map(row => row.trim())
      .filter(row => row); // Remove empty rows
  } catch (error) {
    console.error("Error fetching or parsing CSV data:", error);
    return [];
  }
}

// Function to display data in a target container
function displayData(data, targetId) {
  const container = document.getElementById(targetId);
  if (!container) {
    console.error(`Element with ID "${targetId}" not found.`);
    return;
  }

  container.innerHTML = ""; // Clear previous content
  const ul = document.createElement("ul");

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    
    if (index < data.length - 1) {
      li.textContent += ".";
    }
    
    li.addEventListener("click", () => {
      console.log(`Item clicked: ${item}`);
    });
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

// Function to display the list of years on page load
async function displayYears() {
  const years = await fetchCSV("data/Years.csv");
  if (years.length > 0) {
    displayData(years, "years-list");
  } else {
    const container = document.getElementById("years-list");
    if (container) container.innerHTML = "<p>No data available</p>";
  }
}

// Functions for category buttons
async function handleYearsClick() {
  const years = await fetchCSV("data/Years.csv");
  displayData(years, "years-list");
}

async function handleGenresClick() {
  const genres = await fetchCSV("data/Genres.csv");
  displayData(genres, "years-list");
}

async function handleVenuesClick() {
  const venues = await fetchCSV("data/Venues.csv");
  displayData(venues, "years-list");
}

async function handleArtformsClick() {
  const artforms = await fetchCSV("data/Artforms.csv");
  displayData(artforms, "years-list");
}

// Event listeners for category buttons
document.addEventListener("DOMContentLoaded", () => {
  displayYears(); // Display years on page load

  document.getElementById("filter-years").addEventListener("click", handleYearsClick);
  document.getElementById("filter-genres").addEventListener("click", handleGenresClick);
  document.getElementById("filter-venues").addEventListener("click", handleVenuesClick);
  document.getElementById("filter-artforms").addEventListener("click", handleArtformsClick);
});
