const express = require('express');
const router = express.Router();
const Circle = require('../models/Circle');
const { auth, authorize } = require('../middleware/auth');

// @route   GET /api/circles
// @desc    Get all circles
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { level, status, educator } = req.query;
        const filter = { isActive: true };

        if (level) filter.level = level;
        if (status) filter.status = status;
        if (educator) filter.educator = educator;

        const circles = await Circle.find(filter)
            .populate('educator', 'name email avatar')
            .populate('students', 'user level')
            .sort('-createdAt');

        res.json({
            success: true,
            count: circles.length,
            circles
        });

    } catch (error) {
        console.error('Get circles error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب الحلقات'
        });
    }
});

// @route   POST /api/circles
// @desc    Create new circle
// @access  Private (Educator/Admin)
router.post('/', auth, authorize('educator', 'admin'), async (req, res) => {
    try {
        const circleData = {
            ...req.body,
            educator: req.user.id
        };

        const circle = await Circle.create(circleData);
        await circle.populate('educator', 'name email');

        res.status(201).json({
            success: true,
            message: 'تم إنشاء الحلقة بنجاح',
            circle
        });

    } catch (error) {
        console.error('Create circle error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في إنشاء الحلقة'
        });
    }
});

// @route   PUT /api/circles/:id/students
// @desc    Add student to circle
// @access  Private (Educator/Admin)
router.put('/:id/students', auth, authorize('educator', 'admin'), async (req, res) => {
    try {
        const { studentId } = req.body;
        const circle = await Circle.findById(req.params.id);

        if (!circle) {
            return res.status(404).json({
                success: false,
                message: 'الحلقة غير موجودة'
            });
        }

        await circle.addStudent(studentId);

        res.json({
            success: true,
            message: 'تم إضافة الطالب للحلقة بنجاح',
            circle
        });

    } catch (error) {
        console.error('Add student error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'حدث خطأ في إضافة الطالب'
        });
    }
});

module.exports = router;
