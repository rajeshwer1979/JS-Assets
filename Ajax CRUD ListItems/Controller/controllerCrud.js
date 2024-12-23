// Move the functions out of the DOMContentLoaded listener to make them globally accessible
async function fetchPosts() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const dataContainer = document.getElementById('data-container');

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayPosts(data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Display posts on the page
function displayPosts(posts) {
    const dataContainer = document.getElementById('data-container');
    if (!dataContainer) {
        console.error("data-container element not found!");
        return;
    }

    dataContainer.innerHTML = ''; // Clear current posts
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button class="edit-btn" data-id="${post.id}" data-title="${post.title}" data-body="${post.body.trim()}">Edit</button>
            <button class="delete-btn" data-id="${post.id}">Delete</button>
        `;
        dataContainer.appendChild(postDiv);
    });

    // Add event listeners to the buttons after posts are rendered
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const title = e.target.dataset.title;
            const body = e.target.dataset.body;
            editPost(id, title, body);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            deletePost(id);
        });
    });
}

// Create a new post
async function createPost(title, body) {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const newPost = {
        title: title,
        body: body,
        userId: 1 // Static user ID for the example
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        const data = await response.json();
        console.log('Created post:', data);
        fetchPosts(); // Refresh the post list
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function () {
    const createForm = document.getElementById('createForm');

    createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        if (title && body) {
            createPost(title, body);
            createForm.reset(); // Clear the form after submission
        }
    });

    // Initial fetch to load posts when the page loads
    fetchPosts();
});

// Update an existing post
async function updatePost(id, title, body) {
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const updatedPost = {
        title: title,
        body: body,
        userId: 1
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        });

        const data = await response.json();
        console.log('Updated post:', data);
        fetchPosts(); // Refresh the post list
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

// Delete a post
async function deletePost(id) {
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE'
        });

        if (response.status === 200) {
            console.log(`Post with ID ${id} deleted`);
            fetchPosts(); // Refresh the post list
        } else {
            console.error('Error deleting post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// Edit post functionality
function editPost(id, currentTitle, currentBody) {
    const newTitle = prompt('Enter new title', currentTitle);
    const newBody = prompt('Enter new body', currentBody);

    if (newTitle && newBody) {
        updatePost(id, newTitle, newBody);
    }
}
