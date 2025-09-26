📄 README.md
# 🌐 Community App

Community App adalah aplikasi sederhana berbasis **NestJS (Backend)** & **Next.js (Frontend)** dengan fitur **auth, post, comment, like system, admin dashboard**.  
Tujuan project ini sebagai contoh implementasi fullstack modern (TypeScript, REST API, Tailwind).

---

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/username/community-app.git
cd community-app
2. Setup Backend (NestJS)
Bash

cd backend
npm install
Konfigurasi database di app.module.ts (pakai MySQL dengan XAMPP):

TypeScript

TypeOrmModule.forRoot({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'community',
  autoLoadEntities: true,
  synchronize: true, // Hati2 gunakan di production
})
Run backend:

Bash

npm run start:dev
API jalan di: http://localhost:3000

3. Setup Frontend (Next.js)
Bash

cd ../frontend
npm install
Setup TailwindCSS:

Pastikan ada tailwind.config.js & postcss.config.js
Import globals.css di _app.tsx
Run frontend:

Bash

npm run dev
Frontend jalan di: http://localhost:3001

📡 API Documentation
🔐 Auth
POST /auth/register → Register user
JSON

{ "email": "user@mail.com", "password": "12345" }
POST /auth/login → Login user, return JWT
JSON

{ "access_token": "..." }
POST /auth/register-admin → Register admin (role=admin)
📝 Posts
GET /posts → Ambil semua posts (ada likeCount)
GET /posts?tag=nestjs → Ambil posts dengan filter tag
GET /posts/:id → Ambil detail post (title, content, comments, likeCount)
POST /posts [auth required]
JSON

{ "title": "Judul", "content": "Konten...", "tags": ["tag1","tag2"] }
💬 Comments
GET /comments/:postId → Ambil semua komentar satu post
POST /comments/:postId [auth required]
JSON

{ "content": "Komentar baru" }
👍 Likes
POST /likes/post/:id → Toggle like/unlike pada sebuah post
POST /likes/comment/:id → Toggle like/unlike pada sebuah comment
👑 Admin
(Admin harus login dengan role admin)

GET /admin/analytics → Statistik global
JSON

{
  "users": 10,
  "posts": 20,
  "comments": 50,
  "postLikes": 30,
  "commentLikes": 20
}
DELETE /admin/posts/:id → Hapus post
DELETE /admin/comments/:id → Hapus comment
✅ Explanation of Implemented Features
1. Authentication (JWT)
Register & Login menggunakan JWT auth.
Setiap request protected (create post, comments, likes) butuh token.
Role user & admin.
2. Posts
User bisa membuat post dengan title, content, tags.
Post dapat difilter berdasarkan tag.
Relasi dengan user dan comments.
3. Comments
User bisa menambahkan komentar pada post.
Comment tersimpan dengan relasi post & user.
4. Likes
Sistem like/unlike (toggle) pada post & comment.
Like dihitung (likeCount) pada response API.
5. Admin Panel
User dengan role admin punya akses dashboard.
Fitur analytics: total users, posts, comments, likes.
Fitur moderation: delete posts & comments.
6. Frontend (Next.js + TailwindCSS)
Register/Login page styled dengan Tailwind.
Posts List dalam bentuk grid card modern.
Post Detail dengan comments bubble + tombol like 👍.
New Post page form modern.
Admin Dashboard dengan stat cards warna-warni.
Navbar modern dengan responsive hamburger menu.
📸 Screenshots
Login Page
Posts List with Cards
Post Detail + Comments
Admin Dashboard (Stats Cards)
👨‍💻 Tech Stack
Backend: NestJS, TypeORM, MySQL
Frontend: Next.js, SWR, Axios, TailwindCSS
Auth: JWT (passport-jwt)
UI: TailwindCSS utility + responsive navbar
⚠️ Notes
Setting synchronize: true hanya untuk development (OTOMATIS CREATE TABLE baru bisa reset data!).
Untuk production sebaiknya gunakan migration.
✍️ Dibuat dengan ❤️: contoh project testing untuk posisi Fullstack / React + NestJS Developer.

text


---

👉 Jadi file `README.md` ini tinggal kamu taruh di root project (`community-app/README.md`).  
Mau aku tambahkan juga **contoh screenshot (markdown image placeholder)** di README biar lebih keren?



