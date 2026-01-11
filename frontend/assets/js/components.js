/**
 * مكونات HTML قابلة لإعادة الاستخدام
 */

// Header للصفحة الرئيسية - ديناميكي يتغير حسب الصفحة
function createLandingHeader(options = {}) {
    const {
        buttonText = 'دخول المربي',
        buttonLink = '/frontend/public/auth/login.html',
        buttonBgClass = 'bg-primary/20 hover:bg-primary/30',
        buttonTextClass = 'text-green-800'
    } = options;

    return `
        <header class="sticky top-0 z-50 w-full glass-card border-b border-[#e7f3e9] dark:border-white/10 dark:bg-background-dark/80">
            <div class="layout-container flex h-full grow flex-col">
                <div class="px-4 md:px-10 flex justify-center py-4">
                    <div class="w-full max-w-[1200px] flex items-center justify-between">
                        <div class="flex items-center gap-3 text-text-dark cursor-pointer">
                            <div class="size-10 flex items-center justify-center bg-green-100 rounded-full text-green-700">
                                <span class="material-symbols-outlined" style="font-size: 24px;">spa</span>
                            </div>
                            <h2 class="text-text-dark dark:text-white text-base font-bold leading-tight tracking-tight">دروب الإلهام</h2>
                        </div>
                        <nav class="hidden lg:flex items-center gap-8" role="navigation" aria-label="القائمة الرئيسية">
                            <a class="text-text-light text-sm font-medium hover:text-green-700 transition-colors" href="/frontend/public/landing_page/index.html">الرئيسية</a>
                            <a class="text-text-light text-sm font-medium hover:text-green-700 transition-colors" href="/frontend/public/extra_pages/dar_ilham_club/dar_ilham_club.html">دار الإلهام</a>
                            <a class="text-text-light text-sm font-medium hover:text-green-700 transition-colors" href="/frontend/public/extra_pages/ard_ilham/ard_ilham_1_categories.html">أرض الإلهام</a>
                            <a class="text-text-light text-sm font-medium hover:text-green-700 transition-colors" href="/frontend/public/extra_pages/rehab_ilham/rehab_ilham_Educational_Spaces.html">رحاب الإلهام</a>
                            <a class="text-text-light text-sm font-medium hover:text-green-700 transition-colors" href="/frontend/public/auth/login.html">تسجيل الدخول</a>
                        </nav>
                        <div class="flex items-center gap-4">
                            <a href="${buttonLink}" 
   class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 ${buttonBgClass} ${buttonTextClass} text-sm font-bold transition-colors">
    <span class="truncate">${buttonText}</span>
</a>
                            <button 
                                class="lg:hidden text-text-dark dark:text-white" 
                                data-mobile-menu-button
                                aria-label="فتح القائمة"
                                aria-expanded="false"
                                aria-controls="mobile-menu">
                                <span class="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Mobile Menu -->
                <nav id="mobile-menu" data-mobile-menu class="hidden lg:hidden bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700" role="navigation" aria-label="القائمة المحمولة">
                    <div class="px-4 py-4 flex flex-col gap-3">
                        <a class="text-text-dark dark:text-white text-base font-medium hover:text-primary transition-colors py-2" href="/frontend/public/landing_page/index.html">الرئيسية</a>
                        <a class="text-text-dark dark:text-white text-base font-medium hover:text-primary transition-colors py-2" href="/frontend/public/extra_pages/dar_ilham_club/dar_ilham_club.html">دار الإلهام</a>
                        <a class="text-text-dark dark:text-white text-base font-medium hover:text-primary transition-colors py-2" href="/frontend/public/extra_pages/ard_ilham/ard_ilham_1_categories.html">أرض الإلهام</a>
                        <a class="text-text-dark dark:text-white text-base font-medium hover:text-primary transition-colors py-2" href="/frontend/public/extra_pages/rehab_ilham/rehab_ilham_Educational_Spaces.html">رحاب الإلهام</a>
                        <a class="text-text-dark dark:text-white text-base font-medium hover:text-primary transition-colors py-2" href="/frontend/public/auth/login.html">تسجيل الدخول</a>
                        <a class="${buttonTextClass} text-base font-bold transition-colors py-2" href="${buttonLink}">${buttonText}</a>
                    </div>
                </nav>
            </div>
        </header>
    `;
}

// Header للطلاب - موحد ومحسّن
function createStudentHeader(currentPage = 'dashboard') {
    const getActiveClass = (page) => {
        return currentPage === page 
            ? 'text-text-main dark:text-white text-sm font-bold border-b-2 border-primary pb-0.5' 
            : 'text-text-sub dark:text-gray-400 hover:text-primary-dark dark:hover:text-primary text-sm font-medium transition-colors';
    };
    
    return `
        <header class="sticky top-0 z-50 w-full h-20 border-b border-[#e7f3f2] bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm px-4 lg:px-40 shadow-sm transition-colors duration-200">
            <div class="max-w-[1280px] mx-auto h-full flex items-center justify-between gap-8">
                <!-- العنوان على اليمين -->
                <div class="flex items-center gap-3 shrink-0">
                    <div class="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary-dark">
                        <span class="material-symbols-outlined text-2xl">mosque</span>
                    </div>
                    <h2 class="text-text-main dark:text-white text-xl font-bold tracking-tight">دار الإلهام</h2>
                </div>
                
                <!-- الأزرار الثلاثة في الوسط -->
                <nav class="hidden md:flex items-center gap-6" role="navigation" aria-label="القائمة الرئيسية">
                    <a class="${getActiveClass('paths')} shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" href="student_Learning_Paths_1.html">
                        <span class="material-symbols-outlined text-lg">alt_route</span>
                        <span>المسارات</span>
                    </a>
                    <a class="${getActiveClass('dashboard')} shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" href="student_Progress_Dashboard.html">
                        <span class="material-symbols-outlined text-lg">monitoring</span>
                        <span>لوحة التقدم</span>
                    </a>
                    <a class="${getActiveClass('profile')} shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" href="student_info.html">
                        <span class="material-symbols-outlined text-lg">person</span>
                        <span>الملف الشخصي</span>
                    </a>
                </nav>
                
                <!-- زر تسجيل الخروج على أقصى اليسار -->
                <div class="flex items-center gap-4 shrink-0">
                    <button id="notificationsBtn" class="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white transition-colors relative" aria-label="الإشعارات">
                        <span class="material-symbols-outlined">notifications</span>
                    </button>
                    <button id="logoutBtn" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium transition-colors" aria-label="تسجيل الخروج" title="تسجيل الخروج">
                        <span class="material-symbols-outlined text-lg">logout</span>
                        <span class="hidden lg:inline">تسجيل الخروج</span>
                    </button>
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <nav id="mobile-menu" data-mobile-menu class="hidden md:hidden bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700" role="navigation" aria-label="القائمة المحمولة">
                <div class="px-4 py-4 flex flex-col gap-3">
                    <a href="student_Learning_Paths_1.html" class="${currentPage === 'paths' ? 'text-primary font-bold' : 'text-text-dark dark:text-white'} text-base font-medium hover:text-primary py-2 flex items-center gap-2">
                        <span class="material-symbols-outlined">alt_route</span>
                        <span>المسارات</span>
                    </a>
                    <a href="student_Progress_Dashboard.html" class="${currentPage === 'dashboard' ? 'text-primary font-bold' : 'text-text-dark dark:text-white'} text-base font-medium hover:text-primary py-2 flex items-center gap-2">
                        <span class="material-symbols-outlined">monitoring</span>
                        <span>لوحة التقدم</span>
                    </a>
                    <a href="student_info.html" class="${currentPage === 'profile' ? 'text-primary font-bold' : 'text-text-dark dark:text-white'} text-base font-medium hover:text-primary py-2 flex items-center gap-2">
                        <span class="material-symbols-outlined">person</span>
                        <span>الملف الشخصي</span>
                    </a>
                    <button id="mobileLogoutBtn" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium transition-colors mt-2">
                        <span class="material-symbols-outlined">logout</span>
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </nav>
        </header>
    `;
}

// Header للمعلمين
function createEducatorHeader(currentPage = 'dashboard') {
    return `
        <header class="h-20 w-full border-b border-[#f0f2f4] dark:border-gray-800 bg-white dark:bg-[#1a2632] flex items-center justify-between px-6 shrink-0 z-30">
            <div class="flex items-center gap-3 shrink-0">
                <div class="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <span class="material-symbols-outlined" style="font-size: 24px;">spa</span>
                </div>
                <h2 class="text-[#111418] dark:text-white text-base font-bold leading-tight tracking-tight">دروب الإلهام</h2>
            </div>
            <div class="flex items-center gap-4 ml-auto shrink-0">
                <button class="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400 transition-colors relative" aria-label="الإشعارات">
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2632]"></span>
                </button>
                <button id="profileBtn" class="size-10 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer hover:ring-2 hover:ring-primary transition-all" style='background-image: url("/frontend/assets/placeholder.jpg");' title="الملف الشخصي" aria-label="القائمة الشخصية" role="img">
                </button>
            </div>
        </header>
    `;
}

// Sidebar للمعلمين
function createEducatorSidebar(currentPage = 'dashboard') {
    return `
        <aside class="w-72 bg-white dark:bg-[#1a2632] border-l border-[#f0f2f4] dark:border-gray-800 flex flex-col overflow-y-auto hidden lg:flex shrink-0">
            <div class="p-6 flex flex-col gap-6 h-full">
                <div class="flex items-center gap-3">
                    <div class="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm border-2 border-primary" style='background-image: url("/frontend/assets/placeholder.jpg");' role="img" aria-label="صورة المربي">
                    </div>
                    <div class="flex flex-col">
                        <h1 class="text-[#111418] dark:text-white text-lg font-bold leading-tight">دروب الإلهام</h1>
                        <p class="text-primary text-sm font-medium">لوحة المربي</p>
                    </div>
                </div>
                <nav class="flex flex-col gap-2 flex-1 overflow-y-auto" role="navigation" aria-label="القائمة الجانبية">
                    <a class="${currentPage === 'dashboard' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors" href="/frontend/teacher_screens/Educator_1_Dashboard.html">
                        <span class="material-symbols-outlined text-2xl">dashboard</span>
                        <span class="text-base ${currentPage === 'dashboard' ? 'font-bold' : 'font-medium'}">الرئيسية</span>
                    </a>
                    <a class="${currentPage === 'students' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors" href="/frontend/teacher_screens/Educator_2_students_list.html">
                        <span class="material-symbols-outlined text-2xl">group</span>
                        <span class="text-base ${currentPage === 'students' ? 'font-bold' : 'font-medium'}">طلابي</span>
                    </a>
                    <a class="${currentPage === 'circles' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors" href="/frontend/teacher_screens/Educator_8_circles.html">
                        <span class="material-symbols-outlined text-2xl">school</span>
                        <span class="text-base ${currentPage === 'circles' ? 'font-bold' : 'font-medium'}">مجالس العلم</span>
                    </a>
                    <a class="${currentPage === 'tasks' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors" href="/frontend/teacher_screens/Educator_6_Practical_Tasks.html">
                        <span class="material-symbols-outlined text-2xl">assignment</span>
                        <span class="text-base ${currentPage === 'tasks' ? 'font-bold' : 'font-medium'}">المهام العملية</span>
                    </a>
                    <a class="${currentPage === 'reflections' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors" href="/frontend/teacher_screens/Educator_7_Qur'anic_Reflections.html">
                        <span class="material-symbols-outlined text-2xl">menu_book</span>
                        <span class="text-base ${currentPage === 'reflections' ? 'font-bold' : 'font-medium'}">وقفات التدبر</span>
                    </a>
                </nav>
            </div>
        </aside>
    `;
}

// Footer
function createFooter() {
    return `
        <footer class="bg-[#f8faf9] border-t border-[#e7f3e9] pt-16 pb-8 px-4">
            <div class="layout-container max-w-[1200px] mx-auto flex flex-col gap-10">
                <div class="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-right">
                    <div class="flex flex-col gap-4 items-center md:items-start">
                        <div class="flex items-center gap-3">
                            <div class="size-8 flex items-center justify-center bg-green-100 rounded-full text-green-700">
                                <span class="material-symbols-outlined" style="font-size: 20px;">spa</span>
                            </div>
                            <span class="text-text-dark text-lg font-bold">دروب الإلهام</span>
                        </div>
                        <p class="text-sm text-gray-500 max-w-xs">منصة تربوية تسعى لبناء جيل قرآني متخلق، يجمع بين نور العلم وبركة العمل.</p>
                    </div>
                    <div class="flex flex-wrap justify-center gap-10 md:gap-16">
                        <div class="flex flex-col gap-3">
                            <h4 class="font-bold text-text-dark text-sm">روابط سريعة</h4>
                            <a class="text-sm text-gray-600 hover:text-green-600 transition-colors" href="/frontend/public/landing_page/index.html">الرئيسية</a>
                            <a class="text-sm text-gray-600 hover:text-green-600 transition-colors" href="/frontend/public/extra_pages/dar_ilham_club/dar_ilham_club.html">دار الإلهام</a>
                            <a class="text-sm text-gray-600 hover:text-green-600 transition-colors" href="#">البرامج التربوية</a>
                        </div>
                        <div class="flex flex-col gap-3">
                            <h4 class="font-bold text-text-dark text-sm">المساعدة</h4>
                            <a class="text-sm text-gray-600 hover:text-green-600 transition-colors" href="/frontend/public/about/contact.html">تواصل معنا</a>
                            <a class="text-sm text-gray-600 hover:text-green-600 transition-colors" href="/frontend/public/about/faq.html">الأسئلة الشائعة</a>
                            <a class="text-sm text-gray-600 hover:text-green-600 transition-colors" href="/frontend/public/about/privacy.html">سياسة الخصوصية</a>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <a class="size-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-green-600 hover:border-green-200 transition-all" href="mailto:info@dar-al-ilham.com" aria-label="البريد الإلكتروني">
                            <span class="material-symbols-outlined">alternate_email</span>
                        </a>
                        <a class="size-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-green-600 hover:border-green-200 transition-all" href="https://dar-al-ilham.com" target="_blank" rel="noopener noreferrer" aria-label="الموقع الإلكتروني">
                            <span class="material-symbols-outlined">public</span>
                        </a>
                    </div>
                </div>
                <div class="border-t border-gray-200 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-gray-500 text-sm font-normal">جميع الحقوق محفوظة © دروب الإلهام 2024</p>
                    <div class="flex gap-4 text-xs text-gray-400">
                        <span>صنع بحب 💚 للأجيال القادمة</span>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// تصدير الوظائف
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createLandingHeader,
        createStudentHeader,
        createEducatorHeader,
        createEducatorSidebar,
        createFooter
    };
}
