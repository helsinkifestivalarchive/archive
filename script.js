// URL to your CSV file (update with the actual path to your CSV file)
const csvUrl = 'Years.csv';

// Function to fetch CSV data and remove duplicates
async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

    const text = await response.text();
    const rows = text.split("\n").slice(1); // Remove the header row

    // Use Set to remove duplicate years and return only unique values
    const uniqueYears = new Set(
      rows
        .map(row => row.trim())
        .filter(row => row !== "" && /^\d+$/.test(row)) // Keep only valid numeric years
    );

    return [...uniqueYears];  // Convert the Set back to an array
  } catch (error) {
    console.error("Error fetching CSV:", error);
    return [];
  }
}

// Function to populate the years list on the landing page
async function populateYears() {
  const years = await fetchCSV(csvUrl);
  const yearsList = document.getElementById('years');

  // Clear previous list (in case of duplicates)
  yearsList.innerHTML = '';

  years.forEach(year => {
    const listItem = document.createElement('li');
    listItem.textContent = year;
    yearsList.appendChild(listItem);
  });
}

// Handle filter change and show appropriate category options
function handleFilterChange() {
  const filterValue = document.getElementById('filter').value;
  const categoryOptionsDiv = document.getElementById('category-options');
  const filterOptionsSection = document.getElementById('filter-options');

  if (filterValue === 'year') {
    categoryOptionsDiv.innerHTML = '';  // Clear previous options
    filterOptionsSection.style.display = 'none'; // Hide filter options section
  } else {
    filterOptionsSection.style.display = 'block'; // Show filter options section

    // Here, you can add more logic to fetch other categories like genre, venue, or type of art
    categoryOptionsDiv.innerHTML = `
      <p>Sorry, this part is not implemented yet. You can filter by Year.</p>
    `;
  }
}

// Ensure we only call populateYears once
document.addEventListener('DOMContentLoaded', function() {
  populateYears();
});

