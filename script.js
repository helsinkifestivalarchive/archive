const csvUrl = 'Years.csv';

// Function to fetch CSV data and handle any potential issues
async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

    const text = await response.text();
    const rows = text.split("\n").slice(1); // Remove header row if present

    // Filter for unique years, removing any non-numeric entries
    const uniqueYears = new Set(
      rows
        .map(row => row.trim())
        .filter(row => /^\d+$/.test(row)) // Only keep numeric years
    );

    return [...uniqueYears];  // Convert Set to array
  } catch (error) {
    document.getElementById("error-message").textContent = `Error fetching CSV: ${error.message}`;
    console.error("Error fetching CSV:", error);
    return [];
  }
}

// Function to populate the years list
async function populateYears() {
  const years = await fetchCSV(csvUrl);
  const yearsList = document.getElementById('years');

  // Clear previous list
  yearsList.innerHTML = '';

  if (years.length === 0) {
    document.getElementById("error-message").textContent = "No years data found.";
    return;
  }

  // Populate list with unique years
  years.forEach(year => {
    const listItem = document.createElement('li');
    listItem.textContent = year;
    yearsList.appendChild(listItem);
  });
}

// Handle filter change (for future implementation)
function handleFilterChange() {
  const filterValue = document.getElementById('filter').value;
  const categoryOptionsDiv = document.getElementById('category-options');
  const filterOptionsSection = document.getElementById('filter-options');

  if (filterValue === 'year') {
    categoryOptionsDiv.innerHTML = '';
    filterOptionsSection.style.display = 'none';
  } else {
    filterOptionsSection.style.display = 'block';
    categoryOptionsDiv.innerHTML = `<p>Filtering by ${filterValue} is not implemented yet.</p>`;
  }
}

// Run populateYears once page is loaded
document.addEventListener('DOMContentLoaded', function() {
  populateYears();
});
