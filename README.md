# Django + React Full Stack Project

A full-stack web application built with **Django (REST API)** on the backend and **React.js** on the frontend. The app supports user registration, authentication (JWT), and item management (CRUD).

---

## 📁 Project Structure

```
djangoReact/
├── backend/                 # Django backend (API)
│   ├── manage.py
│   ├── backend/            # Django project settings
│   └── api/                # Django app (models, views, serializers)
├── frontend/               # React frontend
│   └── src/
│       ├── components/
│       └── App.js
└── README.md
```

---

## ⚙️ Features

- ✅ User registration with password validation
- 🔐 JWT authentication using `djangorestframework-simplejwt`
- 📦 Item CRUD per user
- 🔄 React frontend with fetch-based API calls
- 🧠 CORS handling with `django-cors-headers`

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/your-username/your-repo.git
cd djangoReact
```

### 2. Backend Setup (Django)

#### 📦 Requirements
- Python 3.8+
- pip

#### ▶️ Run Django backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # On Windows
# source venv/bin/activate   # On Linux/macOS
pip install -r requirements.txt
```

#### Create `.env` file (optional)

```env
DEBUG=True
SECRET_KEY=your-secret-key
```

#### Migrate and run server

```bash
python manage.py migrate
python manage.py runserver
```

The backend API runs on http://localhost:8000

### 3. Frontend Setup (React)

#### 📦 Requirements
- Node.js (LTS)
- npm

#### ▶️ Run React frontend

```bash
cd ../frontend
npm install
npm start
```

The frontend runs on http://localhost:3000

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register/` | User registration |
| POST | `/api/token/` | Get JWT token |
| POST | `/api/token/refresh/` | Refresh JWT token |
| GET | `/api/items/` | Get user's items |
| POST | `/api/items/` | Create new item |
| PUT | `/api/items/{id}/` | Update item |
| DELETE | `/api/items/{id}/` | Delete item |

---

## 🛠️ Technologies Used

### Backend
- Django
- Django REST Framework
- djangorestframework-simplejwt
- django-cors-headers

### Frontend
- React.js
- JavaScript (ES6+)
- CSS3

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

Your Name - ibrahim.cherbib@sesame.com.tn

Project Link: (https://github.com/ibrahimchr5/examen-django.git)
