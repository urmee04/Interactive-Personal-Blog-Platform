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
    [...posts].reverse().forEach((post, reverseIndex) => {
      // calculate the correct index in the original 'posts' array
      const originalIndex = posts.length - 1 - reverseIndex;
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

  // function to create a single post element in the dom
  function createPostElement(post, index) {
    const postItem = document.createElement("li");
    postItem.classList.add("post-card"); //added for styling consistency

    // Determine if this is the newest post
    const isNew = index === posts.length - 1;

    // create title element
    const titleElement = document.createElement("h4");
    titleElement.textContent = post.title;

    // create content element
    const contentElement = document.createElement("p");
    contentElement.textContent = post.content;

    //create date element
    const dateElement = document.createElement("p");
    dateElement.classList.add("post-date");
    dateElement.textContent = `Posted on ${post.date}`;

    // Create edit button with pen icon
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = "✏️"; // Pen icon
    editButton.title = "Edit post";

    // add edit functionality
    editButton.addEventListener("click", function () {
      pageTitle.value = titleElement.textContent;
      pageContent.value = contentElement.textContent;
      submitBtn.textContent = "Update";

      pageTitle.focus();
      // set both the element and its index for editing
      currentEditingPost = postItem;
      currentEditingIndex = index;
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
        //  save the updated posts array
        localStorage.setItem("posts", JSON.stringify(posts));
        // re-index all posts after deletion
        loadPosts();
      }
    });

    const postActions = document.createElement("div");
    postActions.classList.add("post-actions");
    postActions.append(editButton, deleteBtn);

    // append all elements to the list item
    postItem.append(titleElement, contentElement, dateElement, postActions);

    // Insert at top if new, otherwise append
    if (isNew) {
      postList.insertBefore(postItem, postList.firstChild);
    } else {
      postList.appendChild(postItem);
    }
  }

  //  prevent the browser's default behavior, which is to reload the page on form submission
  // listen for the 'submit' event on the form, like when the user clicks the Post button
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
    } else if (!content) {
      showError("please enter content");
      return;
    }

    // check the index for edit mode
    if (currentEditingIndex > -1) {
      // update existing post
      posts[currentEditingIndex] = { title, content, date: dateTime };
      localStorage.setItem("posts", JSON.stringify(posts));
      loadPosts(); // reload all posts to ensure proper indexing

      currentEditingIndex = -1;
      submitBtn.textContent = "Post";
    } else {
      //create new post
      const newPost = { title, content, date: dateTime };
      posts.push(newPost); // Add to the end of array
      localStorage.setItem("posts", JSON.stringify(posts));
    }

    //save the updated array and refresh the list
    loadPosts();
    form.reset();
  });

  //initial load of posts when the page is ready
  loadPosts();
});
