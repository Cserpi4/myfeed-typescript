```md
# MyReddit (Demo)

A Reddit-style demo application built with **React**, **Redux Toolkit**, and a custom **Express backend**.  
The app uses the **Reddit JSON API** through a backend proxy and displays posts, subreddits, search results, and comments in a clean, responsive UI.

🚧 Live Demo: *Coming soon*  
📦 GitHub Repo: https://github.com/Cserpi4/myreddit-demo

---

## 🚀 Features

- Browse popular posts and subreddits
- Subreddit sidebar with icons
- Search posts with live suggestions
- View and toggle post comments
- Recursive Reddit comments flattened for UI rendering
- Markdown rendering for comments
- Client-side voting UI (demo)
- Clean Redux architecture with normalized state

---

## 🧠 Architecture Overview

This project uses a **full-stack setup**:

### Frontend
- **React**
- **Redux Toolkit**
- Async state handling with `createAsyncThunk`
- Feature-based folder structure
- UI-only components separated from data logic

### Backend
- **Node.js + Express**
- Acts as a **proxy** to the Reddit JSON API
- Handles CORS and centralizes API calls
- Keeps the frontend clean and secure

```

Frontend (React)
↓ axios
Backend (Express)
↓ fetch
Reddit JSON API

```

---

## 🛠️ Tech Stack

### Frontend
- React
- Redux Toolkit
- JavaScript (ES6+)
- CSS
- react-markdown

### Backend
- Node.js
- Express
- Reddit JSON API

---

## 📁 Project Structure (Simplified)

```

myreddit/
├── server/                # Express backend
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── utils/
│
├── src/
│   ├── api/               # axios + API layer
│   ├── components/        # reusable UI components
│   ├── features/          # Redux slices + feature components
│   └── app/               # store configuration

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Cserpi4/myreddit-demo.git
cd myreddit-demo
````

---

### 2️⃣ Install dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd server
npm install
```

---

### 3️⃣ Run the application

#### Start backend (Express)

```bash
cd server
npm start
```

Backend runs on:

```
http://localhost:3000
```

#### Start frontend (React)

```bash
npm start
```

Frontend runs on:

```
http://localhost:3001
```

---

## ⚠️ Notes

* This is a **demo project**, not an official Reddit client
* Authentication is **not implemented**
* Voting is UI-only (no persistence)
* Some Reddit posts may have comments disabled

---

## 📌 Goals of the Project

* Practice **Redux Toolkit** in a real-world scenario
* Learn how to normalize and flatten complex API responses
* Separate UI and data-fetching responsibilities
* Build a clean, scalable React + Redux architecture

---

## 📄 License

This project is for **educational purposes only**.

```

---

## ✅ Következő lépés GitHubon

1. Cseréld le a régi `README.md`-t erre
2. `git add README.md`
3. `git commit -m "Update README for full-stack architecture"`
4. `git push`

---

Ha szeretnéd, a következő lépésben:
- 📦 **külön frontend / backend deploy stratégia (Netlify + Render / Railway)**  
- 🧠 **README badge-ek + screenshot**  
- 🎯 **CV-barát projektleírás**

Csak mondd 👌
```
