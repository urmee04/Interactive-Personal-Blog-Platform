### SBA 5: Interactive Personal Blog Platform

---

#### Overview

This project is an **Interactive Personal Blog Platform** built with HTML, CSS, and JavaScript. It demonstrates DOM manipulation, event handling, form validation and persistent data storage using `localStorage`. Users can create, edit, and delete posts entirely client‑side, with custom error messages and timestamps.

#### Features

- **Create New Posts**
  - Title and content inputs
  - Required‑field validation with user‑friendly error messages
  - “Post” button to add entries to the list
- **Display Posts**
  - Dynamic rendering of all saved posts
  - Shows title, content and “Posted on” timestamp
- **Edit Posts**
  - “✏️ Edit” button on each post
  - Loads existing title/content into the form, changes button to “Update”
  - Updates timestamp to “Last edited on …”
- **Delete Posts**
  - “🗑️ Delete” button prompts confirmation
  - Removes post from display and from `localStorage`
- **Data Persistence**
  - All posts are stored as an array in `localStorage`
  - Page reloads automatically load and render saved posts

#### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/urmee04/Interactive-Personal-Blog-Platform
   ```
2. Open `index.html` in your browser

#### Usage

- Fill in Title and Content fields.

- Click Post. If fields are empty or invalid, an inline error appears for 3 seconds.

- Your post appears at the top of the list with timestamp.

- Click ✏️ Edit to modify a post—form changes to “Update.”

- Click 🗑️ Delete and confirm to remove a post.

- All changes are saved in your browser—refresh to verify persistence.

#### Development Process & Reflection

I structured the HTML semantically and wrote modular JavaScript functions for rendering, validation, and storage. Real‑time validation and custom error messaging improved UX. Implementing edit mode required tracking the current post index and swapping form behavior dynamically. Handling edge cases (empty inputs, invalid JSON in localStorage) helped harden the app.

#### Known Issues

- localStorage data must be manually cleared if it becomes corrupted. For example, I encountered en error `Uncaught TypeError: posts is not iterable` while developing the app

**Solution**

1. Open DevTools → Application (or Storage) → Local Storage → your page’s origin.

2. Find the posts entry, right‑click it, and choose Delete.

3. Reload the page

- No server‑side backup—clearing browser data erases all posts.

- Styling is basic; further enhancements (responsive design, themes) could be added.

#### References

[document.addEventListener()](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

- Attaches an event handler to the document (or any EventTarget).

[Element.prototype.getElementById()](https://developer.mozilla.org/docs/Web/API/Document/getElementById)

- Retrieves an element by its id from the document.

[Node.insertBefore()](https://developer.mozilla.org/docs/Web/API/Node/insertBefore)

- Inserts a node in the DOM before a reference node. You use this when showing error messages just after the form.

[Element.remove()] (https://developer.mozilla.org/docs/Web/API/ChildNode/remove)
Removes a node from the DOM. Used both for deleting posts and clearing error messages.
MDN:

[Array.prototype.splice()] ( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

- Changes the contents of an array by removing or replacing existing elements. You splice out deleted posts.

[localStorage.getItem() / localStorage.setItem()] (https://developer.mozilla.org/docs/Web/API/Window/localStorage)

- Reads from and writes to the browser’s key/value storage.

[JSON.parse() / JSON.stringify()] ( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON)

- Converts between JavaScript objects/arrays and their JSON string representations for storage.

[setTimeout()] (https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)

- Schedules a function to run after a specified delay (used here to auto‑clear error messages).

[Element.createElement()] (https://developer.mozilla.org/docs/Web/API/Document/createElement)
Creates new DOM elements (e.g. <li>, <button>, <p>, etc.).

[Node.append() / Node.appendChild()] (https://developer.mozilla.org/docs/Web/API/Node/append)

- Appends nodes or strings to a parent node.
