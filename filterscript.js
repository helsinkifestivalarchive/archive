document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("filter");
  const contentDiv = document.getElementById("content");

  // Function to fetch data from JSON
  async function fetchData(category) {
    const response = await fetch(`data/${category}.json`);
    const data = await response.json();
    return data;
  }

  // Populate content based on filter
  async function updateContent() {
    const filter = filterSelect.value;
    const data = await fetchData(filter);

    // Clear previous content
    contentDiv.innerHTML = "";

    // Create a list of items for the selected filter
    const list = document.createElement("ul");
    data.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = item; // Adjust this based on your data structure
      listItem.addEventListener("click", () => displayDetails(item));
      list.appendChild(listItem);
    });
    contentDiv.appendChild(list);
  }

  function displayDetails(item) {
    // Load specific data related to the selected item
    // Display it in the contentDiv or redirect to a detailed page
    contentDiv.innerHTML = `<h2>${item.name}</h2><p>Details: ${item.details}</p>`;
  }

  // Event Listener for filter change
  filterSelect.addEventListener("change", updateContent);

  // Initial load
  updateContent();
});

// Helper function to fetch CSV data and parse it
async function fetchCSV(url) {
  const response = await fetch(url);
  const text = await response.text();
  const rows = text.split("\n").slice(1); // Skip header row

  return rows.map(row => row.trim());
}

// Function to load and display years
async function displayYears() {
  const yearsListDiv = document.getElementById("years-list");
  yearsListDiv.innerHTML = "<h2>Festival Years</h2>";

  // Fetch years from the CSV file
  const years = await fetchCSV("data/Years.csv");

  // Create an unordered list for the years
  const ul = document.createElement("ul");
  years.forEach(year => {
    if (year) { // Avoid empty rows
      const li = document.createElement("li");
      li.textContent = year;
      li.className = "year-item";

      // Add a click event to each year item
      li.addEventListener("click", () => {
        // This is where you would load the specific year's data
        // For now, just log the year to confirm it works
        console.log(`Year selected: ${year}`);
      });

      ul.appendChild(li);
    }
  });

  yearsListDiv.appendChild(ul);
}

// Call displayYears on page load
document.addEventListener("DOMContentLoaded", displayYears);

