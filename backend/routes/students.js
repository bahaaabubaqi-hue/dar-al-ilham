const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

// @route   GET /api/students
// @desc    Get all students
// @access  Private (Educator/Admin)
router.get('/', auth, authorize('educator', 'admin'), async (req, res) => {
    try {
        const students = await Student.find({ isActive: true })
            .populate('user', 'name email avatar')
            .populate('educator', 'name')
            .populate('circles', 'name level')
            .sort('-createdAt');

        res.json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب الطلاب'
        });
    }
});

// @route   GET /api/students/me
// @desc    Get current user's student profile
// @access  Private (Student)
router.get('/me', auth, async (req, res) => {
    try {
        // Find student by user ID
        const student = await Student.findOne({ user: req.user.id, isActive: true })
            .populate('user', 'name email phone avatar')
            .populate('educator', 'name email')
            .populate('parent', 'name email phone')
            .populate('circles', 'name level status');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'لم يتم العثور على ملف الطالب'
            });
        }

        res.json({
            success: true,
            student
        });

    } catch (error) {
        console.error('Get my student error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب بيانات الطالب'
        });
    }
});

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate('user', 'name email phone avatar')
            .populate('educator', 'name email')
            .populate('parent', 'name email phone')
            .populate('circles', 'name level status');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'الطالب غير موجود'
            });
        }

        res.json({
            success: true,
            student
        });

    } catch (error) {
        console.error('Get student error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب بيانات الطالب'
        });
    }
});

// @route   POST /api/students
// @desc    Create new student
// @access  Private (Parent/Admin)
router.post('/', auth, async (req, res) => {
    try {
        const { name, email, password, age, level, parentId } = req.body;

        // Create user account
        const user = await User.create({
            name,
            email,
            password,
            role: 'student'
        });

        // Create student profile
        const student = await Student.create({
            user: user._id,
            age,
            level,
            parent: parentId || req.user.id
        });

        await student.populate('user', 'name email avatar');

        res.status(201).json({
            success: true,
            message: 'تم إنشاء حساب الطالب بنجاح',
            student
        });

    } catch (error) {
        console.error('Create student error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في إنشاء حساب الطالب'
        });
    }
});

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { age, level, educator } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'الطالب غير موجود'
            });
        }

        // Update fields
        if (age) student.age = age;
        if (level) student.level = level;
        if (educator) student.educator = educator;

        await student.save();
        await student.populate('user', 'name email avatar');

        res.json({
            success: true,
            message: 'تم تحديث بيانات الطالب بنجاح',
            student
        });

    } catch (error) {
        console.error('Update student error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في تحديث بيانات الطالب'
        });
    }
});

// @route   PUT /api/students/:id/values
// @desc    Update student values/points
// @access  Private (Educator/Admin)
router.put('/:id/values', auth, authorize('educator', 'admin'), async (req, res) => {
    try {
        const { value, points } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'الطالب غير موجود'
            });
        }

        // Update value points
        if (student.values[value] !== undefined) {
            student.values[value] += points;
        }

        // Recalculate total and update stage
        student.calculateTotalPoints();
        student.updateStage();

        await student.save();

        res.json({
            success: true,
            message: 'تم تحديث نقاط الطالب بنجاح',
            student
        });

    } catch (error) {
        console.error('Update values error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في تحديث النقاط'
        });
    }
});

// @route   DELETE /api/students/:id
// @desc    Delete student (soft delete)
// @access  Private (Admin)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'الطالب غير موجود'
            });
        }

        student.isActive = false;
        await student.save();

        res.json({
            success: true,
            message: 'تم حذف الطالب بنجاح'
        });

    } catch (error) {
        console.error('Delete student error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في حذف الطالب'
        });
    }
});

module.exports = router;
