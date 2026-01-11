# سكربت تهيئة Git للمشروع
# استخدم هذا السكربت بعد تثبيت Git

Write-Host "====================================`n🚀 تهيئة Git للمشروع`n====================================`n" -ForegroundColor Cyan

# التحقق من تثبيت Git
try {
    $gitVersion = git --version 2>&1
    Write-Host "✅ Git مثبت: $gitVersion`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Git غير مثبت!`n" -ForegroundColor Red
    Write-Host "يرجى تثبيت Git أولاً من: https://git-scm.com/download/win`n" -ForegroundColor Yellow
    exit 1
}

# التحقق من وجود .git
if (Test-Path .git) {
    Write-Host "⚠️  Git موجود بالفعل في هذا المجلد`n" -ForegroundColor Yellow
    $continue = Read-Host "هل تريد المتابعة؟ (y/n)"
    if ($continue -ne "y") {
        exit 0
    }
} else {
    Write-Host "📦 تهيئة Git repository...`n" -ForegroundColor Cyan
    git init
}

# التحقق من .gitignore
if (Test-Path .gitignore) {
    Write-Host "✅ ملف .gitignore موجود`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  ملف .gitignore غير موجود`n" -ForegroundColor Yellow
}

# إضافة الملفات
Write-Host "📝 إضافة الملفات إلى Git...`n" -ForegroundColor Cyan
git add .

# إظهار الحالة
Write-Host "📊 حالة Git:`n" -ForegroundColor Cyan
git status --short

Write-Host "`n====================================`n✅ تم إعداد Git بنجاح!`n====================================`n" -ForegroundColor Green
Write-Host "الخطوات التالية:`n" -ForegroundColor Cyan
Write-Host "1️⃣  git commit -m 'Initial commit - Ready for deployment'`n" -ForegroundColor White
Write-Host "2️⃣  اذهب إلى https://github.com/new وأنشئ repository جديد`n" -ForegroundColor White
Write-Host "3️⃣  git remote add origin https://github.com/YOUR-USERNAME/dar-al-ilham.git`n" -ForegroundColor White
Write-Host "4️⃣  git branch -M main`n" -ForegroundColor White
Write-Host "5️⃣  git push -u origin main`n" -ForegroundColor White
