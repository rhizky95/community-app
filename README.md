<!DOCTYPE html>
<html lang="en">
<body>
  <h1>🌐 Community App</h1>
  <p>Aplikasi Komunitas Fullstack menggunakan <b>NestJS (Backend)</b>, 
     <b>Next.js (Frontend)</b>, <b>TailwindCSS</b> untuk UI, dan <b>MySQL</b> untuk database.</p>
  <p>Dilengkapi fitur: <b>Authentication, Posts, Comments, Likes, Admin Dashboard</b>.</p>

  <div class="section">
    <h2>🚀 Setup Instructions</h2>
    <h3>Clone Repository</h3>
    <pre><code>git clone https://github.com/username/community-app.git
cd community-app</code></pre>

<h3>Backend (NestJS)</h3><pre><code>cd backend
npm install
npm run start:dev</code></pre>

<p>Konfigurasi DB di <code>app.module.ts</code>:</p>
    <pre><code>TypeOrmModule.forRoot({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'community',
  autoLoadEntities: true,
  synchronize: true, // hanya untuk DEV
})</code></pre>
    <p>Akses backend: <b>http://localhost:3000</b></p>

<h3>Setting Database (MySql)</h3>
    <pre><code>1. Import file community.sql
2. Buka Aplikasi Server MySql (Contoh Xammp)
3. Buka Nyalakan Server Xampp
4. Buka Phpmyadmin di Browser
5. Buat Database Baru 'community'
6. Lalu Import community.sql ke Database community</code></pre>

<h3>Frontend (Next.js)</h3>
    <pre><code>cd frontend
npm install
npm run dev</code></pre>
    <p>Akses frontend: <b>http://localhost:3001</b></p>
  </div>

  <div class="section">
    <h2>📡 API Documentation</h2>
    <h3>🔐 Authentication</h3>
    <ul>
      <li><code>POST /auth/register</code> → Register user</li>
      <li><code>POST /auth/login</code> → Login user (return JWT)</li>
      <li><code>POST /auth/register-admin</code> → Register admin</li>
    </ul>
    <h3>📝 Posts</h3>
    <ul>
      <li><code>GET /posts</code> → ambil semua posts</li>
      <li><code>GET /posts/:id</code> → detail post</li>
      <li><code>POST /posts</code> → create post</li>
    </ul>
    <h3>💬 Comments</h3>
    <ul>
      <li><code>GET /comments/:postId</code></li>
      <li><code>POST /comments/:postId</code></li>
    </ul>
    <h3>👍 Likes</h3>
    <ul>
      <li><code>POST /likes/post/:id</code></li>
      <li><code>POST /likes/comment/:id</code></li>
    </ul>
    <h3>👑 Admin</h3>
    <ul>
      <li><code>GET /admin/analytics</code> → statistik global</li>
      <li><code>DELETE /admin/posts/:id</code></li>
      <li><code>DELETE /admin/comments/:id</code></li>
    </ul>
  </div>

  <div class="section">
    <h2>✅ Implemented Features</h2>
    <h3>Backend</h3>
    <ul>
      <li>Authentication (JWT)</li>
      <li>Posts CRUD + filter</li>
      <li>Comments</li>
      <li>Likes toggle</li>
      <li>Admin analytics & moderation</li>
    </ul>
    <h3>Frontend</h3>
    <ul>
      <li>Modern UI dengan TailwindCSS</li>
      <li>Responsive Navbar + Hamburger Menu</li>
      <li>Post list dengan card grid</li>
      <li>Post detail + bubble comments</li>
      <li>Form New Post</li>
      <li>Admin Dashboard dengan stat cards</li>
    </ul>
  </div>

  <div class="section">
    <h2>👨‍💻 Tech Stack</h2>
    <ul>
      <li><b>Backend:</b> NestJS, TypeORM, MySQL</li>
      <li><b>Frontend:</b> Next.js, SWR, Axios, TailwindCSS</li>
      <li><b>Auth:</b> JWT</li>
    </ul>
  </div>

  <footer>
    <hr/>
    <p>✍️ Dibuat untuk keperluan Fullstack Coding Test (NestJS + Next.js + Tailwind + MySQL)</p>
  </footer>
</body>
</html>
