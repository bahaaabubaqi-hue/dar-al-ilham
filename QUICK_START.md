# 🚀 دليل البدء السريع - دار الإلهام

## ⚡ البدء في 5 دقائق

### الخطوة 1: التثبيت
```bash
cd "c:\Users\YOGA\Desktop\ILHAM WEBSITE\ilham_prject_root"
npm install
```

### الخطوة 2: إعداد قاعدة البيانات
```bash
# في نافذة Terminal منفصلة
mongod
```

### الخطوة 3: إعداد البيئة
```bash
# نسخ ملف البيئة
copy backend\.env.example backend\.env

# ثم افتح backend\.env وعدّل:
# JWT_SECRET=your-secret-key-here
```

### الخطوة 4: بناء CSS
```bash
npm run build:css
```

### الخطوة 5: التشغيل
```bash
npm run dev
```

### الخطوة 6: الوصول
افتح المتصفح وانتقل إلى:
```
frontend/public/landing_page/index.html
```

---

## 📁 هيكل المشروع

```
ilham_prject_root/
├── backend/              # Backend API
│   ├── models/          # نماذج قاعدة البيانات
│   ├── routes/          # مسارات API
│   ├── middleware/      # Middleware
│   └── server.js        # نقطة البداية
├── frontend/
│   ├── assets/          # ملفات CSS/JS/Images المشتركة
│   ├── public/          # الصفحات العامة
│   ├── student_screens/ # صفحات الطلاب
│   └── teacher_screens/ # صفحات المعلمين
├── package.json
├── README.md
└── INSTALLATION.md
```

---

## 🎯 الصفحات الرئيسية

### للزوار:
- **الصفحة الرئيسية**: `frontend/public/landing_page/index.html`
- **تسجيل الدخول**: `frontend/public/auth/login.html`
- **إنشاء حساب**: `frontend/public/auth/register.html`

### للطلاب:
- **لوحة التقدم**: `frontend/student_screens/student_Progress_Dashboard.html`
- **المسارات التعليمية**: `frontend/student_screens/student_Learning_Paths_1.html`

### للمعلمين:
- **لوحة التحكم**: `frontend/teacher_screens/Educator_1_Dashboard.html`
- **قائمة الطلاب**: `frontend/teacher_screens/Educator_2_students_list.html`

---

## 🔧 الأوامر المتاحة

```bash
# تطوير
npm run dev              # تشغيل Backend + Frontend
npm run dev:backend      # Backend فقط
npm run watch:css        # مراقبة CSS

# بناء
npm run build:css        # بناء CSS محسّن

# إنتاج
npm start                # تشغيل وضع الإنتاج

# أخرى
npm test                 # الاختبارات
npm run lint             # فحص الكود
npm run format           # تنسيق الكود
```

---

## 🔌 API Endpoints

### المصادقة
```bash
POST /api/auth/register  # تسجيل جديد
POST /api/auth/login     # تسجيل دخول
GET  /api/auth/me        # المستخدم الحالي
```

### الطلاب
```bash
GET    /api/students           # جميع الطلاب
GET    /api/students/:id       # طالب محدد
POST   /api/students           # إنشاء طالب
PUT    /api/students/:id       # تحديث طالب
PUT    /api/students/:id/values # تحديث النقاط
```

### الحلقات
```bash
GET  /api/circles              # جميع الحلقات
POST /api/circles              # إنشاء حلقة
PUT  /api/circles/:id/students # إضافة طالب
```

### الأنشطة
```bash
GET  /api/activities           # جميع الأنشطة
POST /api/activities           # إنشاء نشاط
POST /api/activities/:id/submit # تسليم نشاط
```

---

## 🎨 الألوان المستخدمة

```css
/* الألوان الأساسية */
--primary: #4ade80        /* أخضر */
--primary-dark: #22c55e   /* أخضر داكن */

/* الخلفيات */
--background-light: #FDFBF7
--background-dark: #102213

/* النصوص */
--text-dark: #2d3748
--text-light: #4a5568
```

---

## 💻 الوظائف JavaScript المتاحة

```javascript
// Toast Notifications
Toast.success('رسالة نجاح');
Toast.error('رسالة خطأ');

// Loading States
Loading.show(button, 'جاري التحميل...');
Loading.hide(button);

// Authentication
Auth.setUser(userData);
Auth.getUser();
Auth.logout();
Auth.isAuthenticated();

// Validation
Validator.validateForm(formElement);
Validator.email(email);
Validator.phone(phone);

// Dark Mode
DarkMode.toggle();

// Animations
animateCounter(element, target);
animateProgressBar(element, target);
updateGreeting(elementId, userName);
```

---

## 🔐 الأمان

### في التطوير:
- استخدم `.env` للإعدادات
- لا تشارك `JWT_SECRET`

### في الإنتاج:
1. غيّر `JWT_SECRET` إلى قيمة عشوائية قوية
2. استخدم HTTPS
3. فعّل CORS للنطاقات المحددة
4. راجع إعدادات Rate Limiting

---

## 🐛 حل المشاكل

### MongoDB لا يعمل
```bash
# Windows
net start MongoDB

# أو
mongod --dbpath "C:\data\db"
```

### المنفذ 5000 مستخدم
غيّر المنفذ في `.env`:
```env
PORT=5001
```

### CSS لا يظهر
```bash
npm run build:css
```

### خطأ في npm install
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 الملفات المهمة

- **README.md** - دليل شامل للمشروع
- **INSTALLATION.md** - دليل التثبيت التفصيلي
- **PROGRESS.md** - تقرير التقدم
- **SUMMARY.md** - ملخص الإصلاحات
- **QUICK_START.md** - هذا الملف

---

## ✅ قائمة التحقق

قبل البدء، تأكد من:
- [ ] تثبيت Node.js (v18+)
- [ ] تثبيت MongoDB (v6+)
- [ ] تشغيل `npm install`
- [ ] إنشاء ملف `.env`
- [ ] تشغيل MongoDB
- [ ] بناء CSS

---

## 🎓 للمطورين الجدد

### 1. تعلم البنية
ابدأ بقراءة:
1. `README.md` - نظرة عامة
2. `INSTALLATION.md` - التثبيت
3. `backend/server.js` - كيف يعمل Backend
4. `frontend/assets/js/main.js` - الوظائف المشتركة

### 2. جرب API
استخدم Postman أو cURL لاختبار:
```bash
# Health Check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"أحمد","email":"ahmed@test.com","password":"12345678","role":"student"}'
```

### 3. عدّل صفحة
جرب تعديل `frontend/public/landing_page/index.html`

### 4. أضف ميزة
ابدأ بإضافة endpoint بسيط في `backend/routes/`

---

## 🆘 الحصول على المساعدة

1. راجع [الأسئلة الشائعة](docs/FAQ.md)
2. ابحث في Issues
3. افتح Issue جديد
4. تواصل: support@dar-al-ilham.com

---

## 🎉 مبروك!

أنت الآن جاهز للبدء في تطوير مشروع دار الإلهام!

**بالتوفيق! 🌟**

---

**آخر تحديث:** 4 يناير 2026
