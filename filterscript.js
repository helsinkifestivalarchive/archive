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
