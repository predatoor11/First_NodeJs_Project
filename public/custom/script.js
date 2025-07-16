const form = document.getElementById("postForm");
const container = document.getElementById("postsContainer");

const API_URL = "/api/posts";

// Yazıları getir
async function loadPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();
  container.innerHTML = "";
  posts.posts.reverse().forEach((post) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Blog Resmi: ${post.blogImage || ""}</small><br><br>
      <small>Yazar: ${post.author || "Anonim"}</small><br><br>
      <small>Kategori: ${post.category || "Anonim"}</small><br><br>
      <button onclick="deletePost('${post._id}')">Sil</button>
      <button onclick="editPost('${post._id}', '${post.title}', '${post.blogImage}', \`${post.content}\`, '${post.category}')">Düzenle</button>
    `;
    container.appendChild(div);
  });
}

// Yeni yazı ekle
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const blogImage = document.getElementById("blogImage").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, blogImage, author, category }),
  });

  form.reset();
  loadPosts();
});

// Yazıyı sil
async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadPosts();
}

// Yazıyı düzenle
function editPost(id, oldTitle, oldContent, oldCategory, oldBlogImage) {
  const newTitle = prompt("Yeni başlık:", oldTitle);
  const newContent = prompt("Yeni içerik:", oldContent);
  const newBlogImage = prompt("Yeni içerik:", oldBlogImage);
  const newCategory = prompt("Yeni kategori:", oldCategory)
  if (newTitle && newContent && newCategory) {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, content: newContent, blogImage: newBlogImage, category: newCategory}),
    }).then(loadPosts);
  }
}

// Sayfa yüklendiğinde yazıları getir
loadPosts();
