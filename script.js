// Wait until the entire HTML document is fully loaded and ready

document.addEventListener("DOMContentLoaded", function () {
  // Find the form element on the page by its ID and store it in a variable
  const form = document.getElementById("createPostForm");
  // Find the list element where posts will be displayed
  const postList = document.getElementById("postList");
  // Listen for the 'submit' event on the form, like when the user clicks the POST button
  form.addEventListener("submit", function (e) {
    //  Prevent the browser's default behavior, which is to reload the page on form submission
    e.preventDefault();
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    // Create a new Date object for the current moment and format it as a readable string
    const dateTime = new Date().toLocaleString();

    // Render new post with title, content, and timestamp
    if (title && content) {
      // create list item
      const postItem = document.createComment("li");
      // create title element
      const titleElement = document.createElement("h4");
      titleElement.classList.add("post-title");
      titleElement.textContent = title;
      // create content element
      const contentElement = document.createElement("p");
      contentElement.classList.add("post-content");
      contentElement.textContent = content;

      //create date element
      const dateElement = document.createElement("p");
      dateElement.classList.add("post-date");
      dateElement.textContent = `Posted on ${date}`;

      // append all elements to the list item
      postItem.appendChild(titleElement, contentElement, dateElement);

      // Add new post at the top of the list
      if (postList.firstChild) {
        postList.insertBefore(postItem, postList.firstChild);
      } else {
        postList.appendChild(postItem);
      }
    } else {
      // create error container
      const errorElement = document.createElement("div");
      errorElement.classList.add("error-msg");

      // set error message based on missing fields
      if (!title && !content) {
        errorElement.textContent = "please enter title and content";
      } else if (!title) {
        errorElement.textContent = "please enter a title";
      } else {
        errorElement.textContent = "please enter content";
      }
    }
  });
});
