# ⚡ رفع سريع - Render.com

## خطوات سريعة (5 دقائق):

### 1️⃣ MongoDB Atlas (2 دقيقة)
- اذهب إلى: https://www.mongodb.com/cloud/atlas/register
- أنشئ حساب → اختر Free Tier
- اضغط "Connect" → "Connect your application"
- انسخ Connection String

### 2️⃣ GitHub (1 دقيقة)
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR-USERNAME/dar-al-ilham.git
git push -u origin main
```

### 3️⃣ Render.com (2 دقيقة)
- اذهب إلى: https://render.com
- سجل بحساب GitHub
- اضغط "New +" → "Web Service"
- اختر المشروع
- إعدادات:
  - **Name:** dar-al-ilham-app
  - **Build Command:** `npm install && npm run build:css`
  - **Start Command:** `npm start`
- Environment Variables:
  - `NODE_ENV` = `production`
  - `PORT` = `5000`
  - `MONGODB_URI` = `mongodb+srv://...` (من MongoDB Atlas)
  - `JWT_SECRET` = `أي نص عشوائي طويل`
- اضغط "Create Web Service"

### 4️⃣ انتظر النشر (2-5 دقائق)
- بعد النشر، ستحصل على رابط مثل: `https://dar-al-ilham-app.onrender.com`
- تحديث `FRONTEND_URL` إلى الرابط الجديد

### ✅ انتهى!
افتح الرابط في المتصفح: `https://dar-al-ilham-app.onrender.com`

---

**للمزيد من التفاصيل، اقرأ `DEPLOYMENT.md`**
