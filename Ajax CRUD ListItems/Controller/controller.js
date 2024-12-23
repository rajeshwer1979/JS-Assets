// Function to fetch data from the API and display it on the webpage
async function fetchAndDisplayData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API URL

    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the response is successful (status 200)
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse the response as JSON
        const data = await response.json();

        // Find the container where we will display the data
        const container = document.getElementById('data-container');

        // Create HTML to display the data
        let htmlContent = '';
        data.forEach(item => {
            htmlContent += `
        <div class="post">
          <h2>${item.title}</h2>
          <p>${item.body}</p>
        </div>
      `;
        });

        // Insert the generated HTML into the container
        container.innerHTML = htmlContent;
    } catch (error) {
        // Display an error message if something goes wrong
        const container = document.getElementById('data-container');
        container.innerHTML = '<p>Failed to load data. Please try again later.</p>';
        console.error(error);
    }
}

// Call the function to fetch and display the data
fetchAndDisplayData();
