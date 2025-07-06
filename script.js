// wait until the entire HTML document is fully loaded and ready

document.addEventListener("DOMContentLoaded", function () {
  // find the form element on the page by its ID and store it in a variable
  const form = document.getElementById("createPostForm");
  // find the list element where posts will be displayed
  const postList = document.getElementById("postList");
  const pageTitle = document.getElementById("postTitle");
  const pageContent = document.getElementById("postContent");
  const submitBtn = document.querySelector("button[type='submit']");
  let currentEditingPost = null;
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  // Load saved posts on page load
  function loadPosts() {
    postList.innerHTML = "";
    posts.forEach((post) => {
      createPostElement(post.title, post.content, post.date, false);
    });
  }

  // function to show error messages
  function showError(message) {
    // clear any existing errors
    const existingError = document.querySelector(".error-msg");
    if (existingError) existingError.remove();

    // create error container
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-msg");
    errorElement.textContent = message;

    // insert error messages after the form
    form.parentNode.insertBefore(errorElement, form.nextSibling);

    // remove error after 5 seconds
    setTimeout(() => {
      errorElement.remove();
    }, 5000);
  }
  //  prevent the browser's default behavior, which is to reload the page on form submission
  // listen for the 'submit' event on the form, like when the user clicks the POST button
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = pageTitle.value.trim();
    const content = pageContent.value.trim();
    // create a new Date object for the current moment and format it as a readable string
    const dateTime = new Date().toLocaleString();

    // render new post with title, content, and timestamp
    if (title && content) {
      if (currentEditingPost) {
        // update existing post
        const postItem = currentEditingPost;
        postItem.querySelector(".post-title").textContent = title;
        postItem.querySelector(".post-content").textContent = content;
        postItem.querySelector(
          ".post-date"
        ).textContent = `Updated on ${dateTime}`;
        currentEditingPost = null;
        // Change button text back to "Post"
        document.querySelector("button[type='submit']").textContent = "Post";
      } else {
        // function to create list item
        function createPostElement(title, content, date, isNew = true) {
          const postItem = document.createElement("li");
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
          dateElement.textContent = `Posted on ${dateTime}`;
          // Create edit button with pen icon
          const editButton = document.createElement("button");
          editButton.classList.add("edit-btn");
          editButton.innerHTML = "✏️"; // Pen icon
          editButton.title = "Edit post";

          // add edit functionality
          editButton.addEventListener("click", function () {
            pageTitle.value = titleElement.textContent;
            pageContent.value = contentElement.textContent;
            currentEditingPost = postItem;
            document.querySelector("button[type='submit']").textContent =
              "Update";
            pageTitle.focus();
          });
          // add delete functionality
          const deleteBtn = document.createElement("button");
          deleteBtn.classList.add("delete-btn");
          deleteBtn.innerHTML = "🗑️"; // Trash icon
          deleteBtn.title = "Delete post";
          deleteBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this post?")) {
              postItem.remove();
              // remove from localstorage
              posts = posts.filter(
                (P) =>
                  P.title !== title || P.content !== content || P.date !== date
              );
              localStorage.setItem("posts", JSON.stringify(postItem));
            }
          });
          const postActions = document.createElement("div");
          postActions.classList.add("post-actions");
          postActions.append(editButton, deleteBtn);

          // append all elements to the list item
          postItem.append(
            titleElement,
            contentElement,
            dateElement,
            postActions
          );

          // add new post at the top of the list
          if (isNew) {
            postList.insertBefore(postItem, postList.firstChild);
          } else {
            postList.appendChild(postItem);
          }
        }
        // clear the form
        form.reset();
      }
      // set error message based on missing fields
      if (!title && !content) {
        showError("please enter title and content");
        return;
      } else if (!title) {
        showError("please enter a title");
        return;
      } else {
        showError("please enter content");
        return;
      }
    }
  });
});
