# 🛠️ Backend – Life Insurance Recommendation API

This is the backend of the Life Insurance Recommendation MVP, built with **Django REST Framework** and **PostgreSQL**. It exposes a secure REST API that accepts user profile data and returns a personalized life insurance recommendation based on rules-based logic — with the future in mind for ML/AI extensibility.

---

## ⚙️ Tech Stack & Versions

- **Python**: 3.10
- **Django**: 5.2.4
- **Django REST Framework**: 3.16
- **PostgreSQL**: 13+
- **Docker**: For development and deployment
- **Elastic Beanstalk**: Deployment-ready (optional)

---

## 📁 Project Structure (simplified)
```plaintext
backend/
├── config/                  # Django project settings (base/dev/prod)
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base_settings.py
│   │   ├── dev.py
│   │   └── prod.py
│   │   └── .env             # Environment variables (not committed)
│   ├── urls.py
│   └── wsgi.py
│
├── core/                    # Shared models and common utilities
│   ├── __init__.py
│   ├── models.py
│   ├── utils/
│   │   └── logger.py
│   └── ...
│
├── insurance/               # App containing recommendation logic
│   ├── __init__.py
│   ├── apis/
│   │   └── recommendation/
│   │       ├── views.py
│   │       └── serializers.py
│   ├── services/
│   │   └── recommendation.py
│   ├── urls.py
│   └── ...
│
├── manage.py
└── requirements.txt 

```


---

## 🚀 Features

- **/api/v1/rec/** – REST endpoint for recommendations
- **Rate Limiting** – Prevent abuse (5/min default)
- **Data Validation** – Strong checks with DRF serializers
- **Logging** – Custom error logging system
- **OTP Auth (Optional)** – Token-less login system by email
- **Transaction-safe** – Atomic DB commits
- **AWS Ready** – Elastic Beanstalk config, Dockerfile, Procfile
- **Environment Variables** – `.env` support for dev/prod

---

## 🧪 Local Setup

### 1. Clone the project
```bash
git clone https://github.com/Benzy7/life-insurance-recommendation.git
cd life-insurance-recommendation/backend
```

### 2.  Create virtual environment
```bash
python -m venv env
source env/bin/activate
```

### 3.  Create & Start DB 
```bash
docker-compose up -d
```

### 4.  Install dependencies
```bash
pip install -r requirements.txt

or

make installreq
```


### 5.  Create a .env file in 'config/settings' 
(or you can copy .example.env file)
```env
ENV=xxxxxxxx

SECRET_KEY=xxxxxxxx

DB_NAME=xxxxxxxx
DB_USER=xxxxxxxx
DB_PASSWORD=xxxxxxxx
DB_HOST=xxxxxxxx
DB_PORT=xxxxxxxx

```


### 6.  Run migrations and start dev server
```bash
python -m venv env

python manage.py makemigrations
python manage.py migrate
source env/bin/activate

or

make makemigrations
make migrate
make run
```
