# 🧠 Mood2Emoji — Kid-Safe Text-Mood Detector

**Live Demo:** [https://harsha-c-mood2emoji.vercel.app/](https://harsha-c-mood2emoji.vercel.app/)

---

## 🧭 How to Use the Live App

1. Visit the live site: [https://harsha-c-mood2emoji.vercel.app/](https://harsha-c-mood2emoji.vercel.app/)
2. Type a simple **happy, sad, or angry** sentence in the input box.  
3. Click the **Detect Mood** button.  
4. ⏳ Wait for **around 50 seconds** for the first response — since the backend is hosted on **Render (free version)**, it takes some time to start the server from sleep.  
5. Once ready, the emoji and explanation will appear! 🎉

---

## 📘 Project Overview

**Mood2Emoji** is a simple, kid-safe web app that detects the mood of a short sentence and returns an emoji along with a friendly explanation.
It’s designed for **students aged 12–16** to learn about text sentiment analysis, safe text handling, and how frontend and backend systems communicate.

---

## ⚙️ Features
- 🧑‍💻 Input box for typing a short sentence
- 😀 😐 😞 Emoji output showing the detected mood
- 🗣️ One-line explanation (e.g., “Sounds happy!”)
- 🚫 Safe text filtering to block inappropriate words
- 🧩 “Teacher Mode” (optional) — shows a diagram of how the app works
- 🌐 Frontend (React + Next.js) and Backend (Django REST API) separation

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (Next.js), TailwindCSS |
| Backend | Django, Django REST Framework |
| Mood Detection | TextBlob / Rule-based logic |
| Deployment | Frontend → Vercel <br> Backend → Render |
| Safety | Simple bad-word filter for age-appropriate text |

---

## 🧩 Folder Structure

```
repo/
 ├── frontend/          # React + Next.js frontend
 │    ├── pages/
 │    ├── components/
 │    └── public/
 │
 ├── backend/           # Django backend
 │    ├── mood2emoji/
 │    ├── api/
 │    └── manage.py
 │
 ├── README.md
 ├── requirements.txt
 └── lesson_plan.pdf
```

---

## 🚀 How to Run Locally

### 🖥 Backend Setup (Django)
```bash
# clone repo
git clone https://github.com/Harsha-032/Harsha-c-mood2emoji.git
cd Harsha-c-mood2emoji/backend

# create virtual environment
python -m venv venv
source venv/bin/activate   # for Mac/Linux
venv\Scripts\activate      # for Windows

# install dependencies
pip install -r requirements.txt

# run server
python manage.py runserver
```

### 🌐 Frontend Setup (React + Next.js)
```bash
cd ../frontend
npm install
npm run dev
```

Then open:  
**Frontend:** http://localhost:3000  
**Backend:** http://127.0.0.1:8000  

---


## 📦 API Endpoint

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/detect/` | Takes `{ "text": "your sentence" }` and returns `{ "emoji": "😀", "message": "Sounds happy!" }` |

---

## ⚠️ Known Limitations
- Simple word-based sentiment logic (not AI-powered)
- Limited emotion range (Happy, Neutral, Sad)
- Not designed for complex grammar or slang
- Requires active backend server connection

---

## 💡 Credits
Created by **Harsha C** 

