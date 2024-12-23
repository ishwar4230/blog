const categories = document.getElementById("categories");
const blogTitle = document.getElementById("blog-title");
const blogContent = document.getElementById("blog-content");

// Load categories and blogs from JSON
function loadCategories() {
    fetch("blogStructure.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch blog structure");
            }
            return response.json();
        })
        .then(blogStructure => {
            for (const [category, blogs] of Object.entries(blogStructure)) {
                const categoryItem = document.createElement("li");
                categoryItem.textContent = category;

                const blogsList = document.createElement("ul");
                blogs.forEach(blog => {
                    const blogItem = document.createElement("li");
                    blogItem.textContent = blog.replace(".md", ""); // Display name without extension
                    blogItem.addEventListener("click", () => loadBlog(category, blog));
                    blogsList.appendChild(blogItem);
                });

                categories.appendChild(categoryItem);
                categories.appendChild(blogsList);
            }
        })
        .catch(error => {
            console.error("Error loading categories:", error);
        });
}

// Load the selected blog
function loadBlog(category, blogFile) {
    const filePath = `blogs/${category}/${blogFile}`;
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}`);
            }
            return response.text();
        })
        .then(content => {
            blogTitle.textContent = blogFile.replace(".md", ""); // Set the title
            blogContent.innerHTML = marked.parse(content); // Render markdown to HTML
        })
        .catch(error => {
            blogTitle.textContent = "Error";
            blogContent.textContent = error.message;
        });
}

// Initialize the app
loadCategories();
