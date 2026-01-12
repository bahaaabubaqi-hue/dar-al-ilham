const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Student = require('../models/Student');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'dar-al-ilham-secret-key-2024',
        { expiresIn: '7d' }
    );
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', [
    body('name').trim().isLength({ min: 2 }).withMessage('الاسم يجب أن يكون حرفين على الأقل'),
    body('email').isEmail().normalizeEmail().withMessage('البريد الإلكتروني غير صحيح'),
    body('password').isLength({ min: 8 }).withMessage('كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
    body('role').isIn(['student', 'educator', 'parent']).withMessage('نوع الحساب غير صحيح')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => err.msg)
            });
        }

        const { name, email, password, phone, role, age, level } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'البريد الإلكتروني مسجل مسبقاً'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role
        });

        // If registering as student, create Student profile
        if (role === 'student' && age && level) {
            // Map level from form to Student schema enum
            let studentLevel = level;
            if (level === 'البراعم' || level === 'براعم') studentLevel = 'براعم';
            else if (level === 'الأشبال' || level === 'أشبال') studentLevel = 'أشبال';
            else if (level === 'الشباب' || level === 'ملهمون') studentLevel = 'ملهمون';

            try {
                await Student.create({
                    user: user._id,
                    age: parseInt(age),
                    level: studentLevel
                });
            } catch (studentError) {
                // If Student creation fails, delete the user
                await User.findByIdAndDelete(user._id);
                throw new Error('فشل في إنشاء ملف الطالب: ' + studentError.message);
            }
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'تم إنشاء الحساب بنجاح',
            token,
            user: user.getPublicProfile()
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في إنشاء الحساب'
        });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
    body('email').isEmail().normalizeEmail().withMessage('البريد الإلكتروني غير صحيح'),
    body('password').notEmpty().withMessage('كلمة المرور مطلوبة')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => err.msg)
            });
        }

        const { email, password } = req.body;

        // Find user with password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'الحساب غير نشط'
            });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            token,
            user: user.getPublicProfile()
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في تسجيل الدخول'
        });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'غير مصرح بالدخول'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dar-al-ilham-secret-key-2024');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'المستخدم غير موجود'
            });
        }

        res.json({
            success: true,
            user: user.getPublicProfile()
        });

    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({
            success: false,
            message: 'غير مصرح بالدخول'
        });
    }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'تم تسجيل الخروج بنجاح'
    });
});

module.exports = router;
