# 🚀 دليل التثبيت والتشغيل - دار الإلهام

## 📋 المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:
- **Node.js** (الإصدار 18 أو أحدث) - [تحميل](https://nodejs.org/)
- **MongoDB** (الإصدار 6 أو أحدث) - [تحميل](https://www.mongodb.com/try/download/community)
- **Git** - [تحميل](https://git-scm.com/)

## 📦 خطوات التثبيت

### 1. تحميل المشروع

```bash
# إذا كان المشروع على GitHub
git clone https://github.com/your-username/dar-al-ilham.git
cd dar-al-ilham

# أو إذا كان لديك المشروع محلياً
cd "c:\Users\YOGA\Desktop\ILHAM WEBSITE\ilham_prject_root"
```

### 2. تثبيت المكتبات

```bash
npm install
```

### 3. إعداد قاعدة البيانات

#### على Windows:
```bash
# تشغيل MongoDB
mongod
```

#### على Linux/Mac:
```bash
# تشغيل MongoDB
sudo systemctl start mongodb

# أو
brew services start mongodb-community
```

### 4. إعداد ملف البيئة

```bash
# نسخ ملف البيئة النموذجي
cp backend/.env.example backend/.env
```

ثم افتح ملف `backend/.env` وعدّل القيم:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dar-al-ilham
JWT_SECRET=your-super-secret-key-change-this
FRONTEND_URL=http://localhost:3000
```

### 5. بناء ملفات CSS

```bash
npm run build:css
```

## 🎯 تشغيل المشروع

### وضع التطوير (Development)

```bash
# تشغيل Backend و Frontend معاً
npm run dev

# أو تشغيلهما بشكل منفصل:

# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend (مراقبة CSS)
npm run watch:css
```

### وضع الإنتاج (Production)

```bash
# بناء ملفات CSS المحسّنة
npm run build:css

# تشغيل الخادم
npm start
```

## 🌐 الوصول للمنصة

بعد التشغيل، يمكنك الوصول إلى:

- **Frontend**: افتح ملف `frontend/public/landing_page/index.html` في المتصفح
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

## 📱 حسابات تجريبية

### حساب مربي:
- البريد: `educator@dar-ilham.com`
- كلمة المرور: `password123`

### حساب طالب:
- البريد: `student@dar-ilham.com`
- كلمة المرور: `password123`

## 🔧 حل المشاكل الشائعة

### مشكلة: MongoDB لا يعمل

**الحل:**
```bash
# Windows
net start MongoDB

# Linux
sudo systemctl start mongodb

# Mac
brew services start mongodb-community
```

### مشكلة: المنفذ 5000 مستخدم

**الحل:** غيّر المنفذ في ملف `.env`:
```env
PORT=5001
```

### مشكلة: خطأ في تثبيت المكتبات

**الحل:**
```bash
# حذف المجلدات القديمة
rm -rf node_modules package-lock.json

# إعادة التثبيت
npm install
```

### مشكلة: CSS لا يعمل

**الحل:**
```bash
# إعادة بناء CSS
npm run build:css

# أو تشغيل المراقبة
npm run watch:css
```

## 📊 اختبار API

يمكنك اختبار API باستخدام:

### 1. Postman
استيراد Collection من: `docs/postman-collection.json`

### 2. cURL

```bash
# Health Check
curl http://localhost:5000/api/health

# تسجيل مستخدم جديد
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "password": "password123",
    "role": "student"
  }'

# تسجيل الدخول
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

## 🗄️ إدارة قاعدة البيانات

### الاتصال بـ MongoDB

```bash
# فتح MongoDB Shell
mongosh

# أو
mongo
```

### أوامر مفيدة

```javascript
// عرض قواعد البيانات
show dbs

// استخدام قاعدة بيانات المشروع
use dar-al-ilham

// عرض المجموعات
show collections

// عرض المستخدمين
db.users.find().pretty()

// حذف جميع البيانات (احذر!)
db.users.deleteMany({})
```

## 🔐 الأمان

### في بيئة الإنتاج:

1. **غيّر JWT_SECRET** إلى قيمة عشوائية قوية:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

2. **استخدم HTTPS** للاتصالات

3. **فعّل CORS** للنطاقات المحددة فقط

4. **استخدم متغيرات البيئة** ولا تشارك ملف `.env`

## 📝 السكريبتات المتاحة

```bash
# تشغيل وضع التطوير
npm run dev

# تشغيل Backend فقط
npm run dev:backend

# بناء CSS
npm run build:css

# مراقبة CSS (تحديث تلقائي)
npm run watch:css

# تشغيل وضع الإنتاج
npm start

# تشغيل الاختبارات
npm test

# فحص الكود
npm run lint

# تنسيق الكود
npm run format
```

## 🆘 الحصول على المساعدة

إذا واجهت أي مشاكل:

1. تحقق من [الأسئلة الشائعة](docs/FAQ.md)
2. ابحث في [Issues](https://github.com/your-repo/issues)
3. افتح Issue جديد
4. تواصل معنا: support@dar-al-ilham.com

## 📚 موارد إضافية

- [دليل المستخدم](docs/USER_GUIDE.md)
- [دليل المطور](docs/DEVELOPER_GUIDE.md)
- [API Documentation](docs/API.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

**بالتوفيق! 🌟**
