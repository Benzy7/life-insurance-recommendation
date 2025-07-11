# 🚀 Life Insurance Recommendation - Frontend

This is the **frontend** part of the Life Insurance Recommendation MVP, built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It provides a responsive, accessible, and clean UI for users to input their profile and receive personalized life insurance recommendations.

---

### ✨ Features

- 📝 Single-page form collecting:
  - Age
  - Income
  - Number of Dependents
  - Risk Tolerance (Low / Medium / High)
- 🎯 Displays personalized insurance recommendation and explanation after submission.
- 📱 Responsive and accessible UI using Tailwind CSS.
- ✅ Form validation with Zod and React Hook Form.
- 🔗 API integration with backend recommendation service via Axios.
- 🎨 Smooth animations with Framer Motion.
- ⚙️ Environment configuration with `.env.local`.

---

### 🛠 Tech Stack & Versions

- **Next.js** 15.3.5
- **React** 19.0.0
- **TypeScript** 5
- **Tailwind CSS** 4
- **React Hook Form** (form management)
- **Zod** (schema validation)
- **Axios** (HTTP requests)
- **Framer Motion** (animations)

---

### ⚡ Getting Started

#### Prerequisites

- Node.js v22+ and npm/yarn installed
- Backend API accessible (local or deployed)

#### Installation

```bash
git clone https://github.com/Benzy7/life-insurance-recommendation.git
cd frontend

npm install
or 
yarn install
```

#### Create .env file in the project root

```env
NEXT_PUBLIC_API_BASE_URL=xxxxxxxxxxxxxxxx
```
(or you can copy .example.env file)


#### Start dev server

```bash
npm run dev

or 

yarn dev
```