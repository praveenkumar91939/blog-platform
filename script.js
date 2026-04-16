let posts = JSON.parse(localStorage.getItem("posts")) || [];

const currentUser = "Praveen";

function addPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) return;

  posts.unshift({
    id: Date.now(),
    title,
    content,
    votes: 0,
    comments: [],
    user: currentUser,
    time: new Date().toLocaleString()
  });

  save();
  render();
}

function render() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <div class="vote">
        <button onclick="vote(${post.id}, 1)">⬆️</button>
        <div>${post.votes}</div>
        <button onclick="vote(${post.id}, -1)">⬇️</button>
      </div>

      <div class="content">
        <div class="meta">u/${post.user} • ${post.time}</div>
        <h3>${post.title}</h3>
        <p>${post.content}</p>

        <button onclick="toggleComments(${post.id})">💬 Comments</button>
        <button onclick="deletePost(${post.id})">Delete</button>

        <div id="cbox-${post.id}" style="display:none;" class="comment-box">
          <input id="c-${post.id}" placeholder="Write a comment">
          <button onclick="addComment(${post.id})">Add</button>

          <div>
            ${post.comments.map(c => `
              <div class="comment">
                <b>u/${c.user}</b><br>${c.text}
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

function vote(id, val) {
  const post = posts.find(p => p.id === id);
  post.votes += val;
  save();
  render();
}

function deletePost(id) {
  posts = posts.filter(p => p.id !== id);
  save();
  render();
}

function toggleComments(id) {
  const box = document.getElementById(`cbox-${id}`);
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function addComment(id) {
  const input = document.getElementById(`c-${id}`);
  const text = input.value;

  if (!text) return;

  const post = posts.find(p => p.id === id);

  post.comments.push({
    user: currentUser,
    text
  });

  save();
  render();
}

function save() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

render();