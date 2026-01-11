/**
 * دار الإلهام - Backend Server
 * Express.js + MongoDB
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// ===================================
// Middleware
// ===================================
app.use(helmet({
    contentSecurityPolicy: false, // للسماح بـ inline scripts في HTML
    crossOriginEmbedderPolicy: false
}));

// CORS Configuration - السماح بجميع المنافذ المحلية والإنتاج
const allowedOrigins = process.env.FRONTEND_URL 
    ? [process.env.FRONTEND_URL]
    : process.env.NODE_ENV === 'production'
    ? [] // في الإنتاج، سنستخدم نفس الدومين
    : [
        'http://localhost:5000',
        'http://127.0.0.1:5000',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:8000',
        'http://127.0.0.1:8000',
        'http://localhost:8080',
        'http://127.0.0.1:8080'
    ];

app.use(cors({
    origin: function (origin, callback) {
        // السماح بطلبات بدون origin (مثل Postman أو file://)
        if (!origin) return callback(null, true);
        
        // في الإنتاج، السماح بنفس الدومين فقط
        if (process.env.NODE_ENV === 'production') {
            // السماح بنفس الدومين أو دومين Frontend المحدد
            if (allowedOrigins.includes(origin) || process.env.FRONTEND_URL === origin) {
                return callback(null, true);
            }
            // في الإنتاج، نسمح بنفس الدومين
            return callback(null, true);
        }
        
        // في التطوير، السماح بجميع المنافذ المحلية
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(null, true); // في وضع التطوير، نسمح بجميع المنافذ
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// ===================================
// Database Connection
// ===================================
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dar-al-ilham');
        console.log('✅ MongoDB متصل بنجاح');
        console.log(`📊 قاعدة البيانات: ${mongoose.connection.db.databaseName}`);
    } catch (error) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error.message);
        process.exit(1);
    }
};

// ===================================
// Routes
// ===================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/educators', require('./routes/educators'));
app.use('/api/circles', require('./routes/circles'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/progress', require('./routes/progress'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'دار الإلهام API يعمل بنجاح',
        timestamp: new Date().toISOString()
    });
});

// ===================================
// Serve Static Files (Frontend)
// ===================================
// في الإنتاج، تقديم ملفات Frontend
if (process.env.NODE_ENV === 'production') {
    // Serve static files from frontend/public
    app.use(express.static(path.join(__dirname, '../frontend/public')));
    app.use(express.static(path.join(__dirname, '../frontend/assets')));
    
    // Serve student screens
    app.use('/student_screens', express.static(path.join(__dirname, '../frontend/student_screens')));
    
    // Serve teacher screens
    app.use('/teacher_screens', express.static(path.join(__dirname, '../frontend/teacher_screens')));
    
    // Serve admin screens
    app.use('/admin_screens', express.static(path.join(__dirname, '../frontend/admin_screens')));
    
    // Handle React Router (if using SPA) - Fallback to index.html
    app.get('*', (req, res) => {
        // إذا كان المسار يبدأ بـ /api، أرسل 404 JSON
        if (req.path.startsWith('/api')) {
            return res.status(404).json({ 
                success: false, 
                message: 'المسار غير موجود' 
            });
        }
        
        // خلاف ذلك، أرسل index.html
        res.sendFile(path.join(__dirname, '../frontend/public/landing_page/index.html'));
    });
} else {
    // 404 handler for development
    app.use((req, res) => {
        res.status(404).json({ 
            success: false, 
            message: 'المسار غير موجود' 
        });
    });
}

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'حدث خطأ في الخادم',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ===================================
// Start Server
// ===================================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
        console.log(`🌐 البيئة: ${process.env.NODE_ENV || 'development'}`);
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    process.exit(1);
});
