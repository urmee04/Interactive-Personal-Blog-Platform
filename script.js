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
  });
});
