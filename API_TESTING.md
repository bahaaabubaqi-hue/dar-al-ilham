# 🧪 دليل اختبار API - دار الإلهام

## ✅ حالة النظام

- **Backend**: يعمل على `http://localhost:5000` ✅
- **MongoDB**: متصل ✅
- **Frontend**: جاهز للاتصال ✅

---

## 🔗 API Base URL

Frontend يستخدم:
```javascript
API.baseURL = window.API_BASE_URL || 'http://localhost:5000'
```

يمكن تغييره في أي صفحة:
```html
<script>
    window.API_BASE_URL = 'http://localhost:5000';
</script>
<script src="../../assets/js/main.js"></script>
```

---

## 📋 Endpoints المتاحة

### 1. Health Check
```bash
GET http://localhost:5000/api/health
```

### 2. Authentication

#### Register
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "password123",
  "role": "parent",
  "phone": "0501234567"
}
```

#### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

### 3. Students

#### Register Student (يحتاج Authentication)
```bash
POST http://localhost:5000/api/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "محمد أحمد",
  "email": "student@example.com",
  "password": "password123",
  "age": 10,
  "level": "الأشبال"
}
```

---

## 🧪 اختبار الصفحات

### 1. صفحة Login
**الملف**: `frontend/public/auth/login.html`

**الوظائف**:
- ✅ ربط مع `/api/auth/login`
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ حفظ Token في sessionStorage
- ✅ إعادة توجيه حسب Role

**للاختبار**:
1. افتح `frontend/public/auth/login.html` في المتصفح
2. أدخل email و password
3. اضغط "دخول"
4. يجب أن ترى Toast notification
5. يجب أن يتم إعادة التوجيه للداشبورد

---

### 2. صفحة Register
**الملف**: `frontend/public/auth/register.html`

**الوظائف**:
- ✅ ربط مع `/api/auth/register`
- ✅ دعم تسجيل ولي أمر وطالب
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Validation

**للاختبار**:
1. افتح `frontend/public/auth/register.html` في المتصفح
2. اختر "ولي أمر" أو "طالب"
3. املأ البيانات
4. اضغط "إنشاء حساب"
5. يجب أن ترى Toast notification
6. يجب أن يتم إعادة التوجيه

---

### 3. نموذج تسجيل دار الإلهام
**الملف**: `frontend/public/extra_pages/dar_ilham_club/dar_ilham_registration_form.html`

**الوظائف**:
- ✅ ربط مع `/api/students` (POST)
- ✅ التحقق من Authentication
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Validation شامل

**للاختبار**:
1. سجّل دخول كولي أمر أولاً
2. افتح نموذج التسجيل
3. املأ جميع الحقول
4. اضغط "إرسال الطلب"
5. يجب أن ترى Toast notification
6. يجب أن يتم إعادة التوجيه

---

## 🔧 اختبار باستخدام PowerShell

### Health Check
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health"
```

### Register
```powershell
$body = @{
    name = "أحمد محمد"
    email = "ahmed@example.com"
    password = "password123"
    role = "parent"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### Login
```powershell
$body = @{
    email = "ahmed@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

$token = ($response.Content | ConvertFrom-Json).token
Write-Host "Token: $token"
```

---

## 🐛 حل المشاكل

### مشكلة: CORS Error
**الحل**: تأكد من أن `FRONTEND_URL` في `.env` صحيح:
```env
FRONTEND_URL=http://localhost:3000
```

### مشكلة: 401 Unauthorized
**الحل**: تأكد من إرسال Token في Header:
```javascript
Authorization: Bearer <token>
```

### مشكلة: MongoDB Connection Error
**الحل**: تأكد من تشغيل MongoDB:
```powershell
Get-Service -Name "*mongo*"
Start-Service MongoDB
```

---

## ✅ Checklist

- [x] Backend يعمل على port 5000
- [x] MongoDB متصل
- [x] API Health Check يعمل
- [x] Frontend يستخدم API baseURL الصحيح
- [x] صفحات Login/Register مربوطة مع API
- [x] نموذج تسجيل دار الإلهام مربوط مع API
- [x] Toast notifications تعمل
- [x] Loading states تعمل
- [x] Error handling موجود

---

**آخر تحديث**: 2026-01-05
**الحالة**: ✅ جاهز للاستخدام

