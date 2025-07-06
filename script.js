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
  let currentEditingIndex = -1; // use -1 to indicate no post is being edited
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  // function to load all posts from 'posts'
  function loadPosts() {
    postList.innerHTML = ""; // Clear the list before re-rendering
    // reverse the array for display to show newest first without altering the original array
    [...posts].reverse().forEach((post, index) => {
      // calculate the correct index in the original 'posts' array
      const originalIndex = posts.length - 1 - index;
      createPostElement(post, originalIndex);
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

    // remove error after 3 seconds
    setTimeout(() => {
      errorElement.remove();
    }, 3000);
  }
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
      document.querySelector("button[type='submit']").textContent = "Update";
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
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(postItem));
        // re-index all posts after deletion
        loadPosts();
      }
    });
    const postActions = document.createElement("div");
    postActions.classList.add("post-actions");
    postActions.append(editButton, deleteBtn);

    // append all elements to the list item
    postItem.append(titleElement, contentElement, dateElement, postActions);

    // add new post at the top of the list
    if (isNew) {
      postList.insertBefore(postItem, postList.firstChild);
    } else {
      postList.appendChild(postItem);
    }
  }
  //  prevent the browser's default behavior, which is to reload the page on form submission
  // listen for the 'submit' event on the form, like when the user clicks the POST button
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = pageTitle.value.trim();
    const content = pageContent.value.trim();
    // create a new Date object for the current moment and format it as a readable string
    const dateTime = new Date().toLocaleString();

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

    if (currentEditingPost) {
      // update existing post
      posts[currentEditingIndex] = { title, content, date: dateTime };
      localStorage.setItem("posts", JSON.stringify(posts));
      loadPosts(); // reload all posts to ensure proper indexing
      currentEditingPost = null;
      currentEditingIndex = -1;
      submitBtn.textContent = "Post";
    } else {
      // Create new post
      const newPost = { title, content, date: dateTime };
      posts.unshift(newPost); // Add to beginning of array
      localStorage.setItem("posts", JSON.stringify(posts));
      createPostElement(title, content, dateTime, 0, true);
    }

    form.reset();
  });
});
