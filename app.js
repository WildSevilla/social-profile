// Social Git — Profile template JS
// Loads posts from posts/index.json if it exists

async function loadPosts() {
  const container = document.getElementById('posts-list');
  if (!container) return;

  try {
    const res = await fetch('posts/index.json');
    if (!res.ok) return; // no posts yet

    const posts = await res.json();
    if (!posts.length) return;

    container.innerHTML = posts.map(post => `
      <div class="post-item">
        <a class="post-title" href="posts/${escHtml(post.file)}">${escHtml(post.title)}</a>
        <div class="post-date">${escHtml(post.date)}</div>
        ${post.preview ? `<div class="post-preview">${escHtml(post.preview)}</div>` : ''}
      </div>
    `).join('');
  } catch {
    // posts/index.json doesn't exist yet — fine
  }
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadPosts();
