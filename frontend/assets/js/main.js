/**
 * دار الإلهام - ملف JavaScript الرئيسي
 * يحتوي على الوظائف المشتركة عبر جميع الصفحات
 */

// ===================================
// إدارة Toast Notifications
// ===================================
const Toast = {
    container: null,
    
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999;';
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'success', duration = 3000) {
        this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' 
            ? '<span class="material-symbols-outlined text-green-600">check_circle</span>'
            : '<span class="material-symbols-outlined text-red-600">error</span>';
        
        toast.innerHTML = `
            <div class="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl border ${type === 'success' ? 'border-green-200' : 'border-red-200'} px-5 py-4 min-w-[320px]">
                <div class="flex-shrink-0">${icon}</div>
                <div class="flex-1">
                    <p class="font-bold text-gray-800 dark:text-white">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
            </div>
        `;
        
        this.container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, duration);
    },
    
    success(message, duration) {
        this.show(message, 'success', duration);
    },
    
    error(message, duration) {
        this.show(message, 'error', duration);
    }
};

// ===================================
// إدارة Loading States
// ===================================
const Loading = {
    show(element, text = 'جاري التحميل...') {
        if (!element) return;
        
        element.disabled = true;
        element.dataset.originalContent = element.innerHTML;
        element.innerHTML = `
            <span class="spinner"></span>
            <span class="mr-2">${text}</span>
        `;
    },
    
    hide(element) {
        if (!element) return;
        
        element.disabled = false;
        if (element.dataset.originalContent) {
            element.innerHTML = element.dataset.originalContent;
            delete element.dataset.originalContent;
        }
    }
};

// ===================================
// إدارة المصادقة والجلسة
// ===================================
const Auth = {
    setUser(userData) {
        try {
            sessionStorage.setItem('userData', JSON.stringify(userData));
            sessionStorage.setItem('isAuthenticated', 'true');
        } catch (error) {
            console.error('خطأ في حفظ بيانات المستخدم:', error);
        }
    },
    
    getUser() {
        try {
            const userData = sessionStorage.getItem('userData');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('خطأ في قراءة بيانات المستخدم:', error);
            return null;
        }
    },
    
    isAuthenticated() {
        return sessionStorage.getItem('isAuthenticated') === 'true';
    },
    
    logout() {
        sessionStorage.clear();
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('accountType');
        window.location.href = '/frontend/public/landing_page/index.html';
    },
    
    requireAuth(redirectUrl = '/frontend/public/auth/login.html') {
        if (!this.isAuthenticated()) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    },
    
    setToken(token) {
        try {
            localStorage.setItem('authToken', token);
        } catch (error) {
            console.error('خطأ في حفظ التوكن:', error);
        }
    },
    
    getToken() {
        return localStorage.getItem('authToken');
    },
    
    clearAuth() {
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('accountType');
    }
};

// ===================================
// API Helper Functions
// ===================================
const API = {
    // تحديد عنوان API بناءً على البيئة
    baseURL: (() => {
        // إذا كان هناك متغير عام محدد في HTML
        if (window.API_BASE_URL) return window.API_BASE_URL;
        
        // التحقق من البيئة
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        const port = window.location.port;
        
        // إذا كان على localhost (التطوير)
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return `http://localhost:${port || '5000'}`;
        }
        
        // في الإنتاج، استخدم نفس الدومين (نفس Port)
        // لأن Backend و Frontend على نفس السيرفر
        return `${protocol}//${hostname}${port ? ':' + port : ''}`;
    })(),
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = Auth.getToken();
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(url, config);
            
            // التحقق من حالة الاتصال
            if (!response.ok) {
                let errorMessage = 'حدث خطأ في الطلب';
                try {
                    const data = await response.json();
                    errorMessage = data.message || data.errors?.join(', ') || errorMessage;
                } catch (e) {
                    // إذا فشل parsing JSON، استخدم رسالة الخطأ الافتراضية
                    errorMessage = `خطأ ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            
            // معالجة أخطاء الاتصال
            if (error.message === 'Failed to fetch' || error.message.includes('fetch')) {
                const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
                if (isProduction) {
                    throw new Error('لا يمكن الاتصال بالخادم. يرجى المحاولة لاحقاً');
                } else {
                    throw new Error('لا يمكن الاتصال بالخادم. تأكد من أن Backend يعمل على http://localhost:5000');
                }
            }
            
            throw error;
        }
    },
    
    async login(email, password) {
        return this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },
    
    async register(userData) {
        return this.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },
    
    async registerStudent(studentData) {
        return this.request('/api/students', {
            method: 'POST',
            body: JSON.stringify(studentData)
        });
    },
    
    async getMyStudent() {
        return this.request('/api/students/me', {
            method: 'GET'
        });
    },
    
    async getStudent(studentId) {
        return this.request(`/api/students/${studentId}`, {
            method: 'GET'
        });
    },
    
    async getProgress(studentId) {
        return this.request(`/api/progress/${studentId}`, {
            method: 'GET'
        });
    },
    
    async getCircles(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/api/circles${queryString ? '?' + queryString : ''}`, {
            method: 'GET'
        });
    },
    
    async getActivities(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/api/activities${queryString ? '?' + queryString : ''}`, {
            method: 'GET'
        });
    },
    
    async getActivity(activityId) {
        return this.request(`/api/activities/${activityId}`, {
            method: 'GET'
        });
    },
    
    async submitActivity(activityId, submissionData) {
        return this.request(`/api/activities/${activityId}/submit`, {
            method: 'POST',
            body: JSON.stringify(submissionData)
        });
    }
};

// ===================================
// التحقق من صحة النماذج
// ===================================
const Validator = {
    email(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    phone(phone) {
        const re = /^(05|5)[0-9]{8}$/;
        return re.test(phone);
    },
    
    password(password) {
        return password.length >= 8;
    },
    
    required(value) {
        return value && value.trim().length > 0;
    },
    
    minLength(value, min) {
        return value && value.length >= min;
    },
    
    maxLength(value, max) {
        return value && value.length <= max;
    },
    
    showError(input, message) {
        const errorDiv = input.parentElement.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message text-red-600 text-sm mt-1';
        errorDiv.textContent = message;
        
        if (!input.parentElement.querySelector('.error-message')) {
            input.parentElement.appendChild(errorDiv);
        }
        
        input.classList.add('border-red-500');
    },
    
    clearError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) errorDiv.remove();
        input.classList.remove('border-red-500');
    },
    
    validateForm(formElement) {
        let isValid = true;
        const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            this.clearError(input);
            
            if (!this.required(input.value)) {
                this.showError(input, 'هذا الحقل مطلوب');
                isValid = false;
                return;
            }
            
            if (input.type === 'email' && !this.email(input.value)) {
                this.showError(input, 'يرجى إدخال بريد إلكتروني صحيح');
                isValid = false;
            }
            
            if (input.type === 'tel' && !this.phone(input.value)) {
                this.showError(input, 'يرجى إدخال رقم جوال صحيح (05xxxxxxxx)');
                isValid = false;
            }
            
            if (input.type === 'password' && !this.password(input.value)) {
                this.showError(input, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
                isValid = false;
            }
        });
        
        return isValid;
    }
};

// ===================================
// إدارة القائمة المنسدلة (Mobile Menu)
// ===================================
const MobileMenu = {
    init() {
        const menuButton = document.querySelector('[data-mobile-menu-button]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        
        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                const isOpen = !mobileMenu.classList.contains('hidden');
                menuButton.setAttribute('aria-expanded', isOpen);
            });
            
            document.addEventListener('click', (e) => {
                if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    menuButton.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
};

// ===================================
// تحية ديناميكية حسب الوقت
// ===================================
function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return 'صباح الخير';
    } else if (hour >= 12 && hour < 17) {
        return 'أهلاً بك';
    } else if (hour >= 17 && hour < 21) {
        return 'مساء الخير';
    } else {
        return 'أهلاً بك';
    }
}

function updateGreeting(elementId, userName = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const user = userName || Auth.getUser()?.name || localStorage.getItem('currentUserName') || 'عزيزنا';
    const greeting = getGreeting();
    
    element.textContent = `${greeting}، ${user}`;
}

// ===================================
// عداد الأرقام المتحرك
// ===================================
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// ===================================
// شريط التقدم المتحرك
// ===================================
function animateProgressBar(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOut;
        
        element.style.width = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.style.width = target + '%';
        }
    }
    
    requestAnimationFrame(update);
}

// ===================================
// Lazy Loading للصور
// ===================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// إدارة الوضع الداكن
// ===================================
const DarkMode = {
    init() {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            document.documentElement.classList.add('dark');
        }
    },
    
    toggle() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);
    }
};

// ===================================
// معالجة الأخطاء العامة
// ===================================
function handleError(error, userMessage = 'حدث خطأ غير متوقع') {
    console.error('Error:', error);
    Toast.error(userMessage);
}

// ===================================
// تهيئة الصفحة عند التحميل
// ===================================
function initPage() {
    try {
        DarkMode.init();
        MobileMenu.init();
        initLazyLoading();
        
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach((counter, index) => {
            const target = parseInt(counter.dataset.counter);
            setTimeout(() => {
                animateCounter(counter, target);
            }, index * 100);
        });
        
        const progressBars = document.querySelectorAll('[data-progress]');
        progressBars.forEach((bar, index) => {
            const target = parseInt(bar.dataset.progress);
            setTimeout(() => {
                animateProgressBar(bar, target);
            }, 500 + (index * 200));
        });
        
    } catch (error) {
        handleError(error, 'حدث خطأ في تهيئة الصفحة');
    }
}

// ===================================
// تشغيل عند تحميل الصفحة
// ===================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// تصدير الوظائف للاستخدام العام
window.Toast = Toast;
window.Loading = Loading;
window.Auth = Auth;
window.Validator = Validator;
window.API = API;
window.DarkMode = DarkMode;
window.animateCounter = animateCounter;
window.animateProgressBar = animateProgressBar;
window.updateGreeting = updateGreeting;
window.handleError = handleError;
