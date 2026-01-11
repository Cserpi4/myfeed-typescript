MyReddit (Demo)

A Reddit-style demo application built with React, Redux Toolkit, and a custom Express backend.  
The app uses the Reddit JSON API through a backend proxy and displays posts, subreddits, search results, and comments in a clean, responsive UI.

Features
- Browse popular posts and subreddits
- Subreddit sidebar with icons
- Search posts with live suggestions
- View and toggle post comments
- Recursive Reddit comments flattened for UI rendering
- Markdown rendering for comments
- Client-side voting UI (demo)
- Clean Redux architecture with normalized state

Tech stack

Frontend
- React
- Redux Toolkit
- Async state handling with `createAsyncThunk`
- Feature-based folder structure
- UI-only components separated from data logic

Backend
- Node.js
- Express
- Acts as a proxy to the Reddit JSON API
- Handles CORS and centralizes API calls
- Keeps the frontend clean and secure

Frontend (React)
↓ axios
Backend (Express)
↓ fetch
Reddit JSON API

Author

Name: Dániel Cserpák
Portfolio: https://daniel-cserpak-portfolio.netlify.app/  
LinkedIn: https://www.linkedin.com/in/d%C3%A1niel-cserp%C3%A1k-109057283/
