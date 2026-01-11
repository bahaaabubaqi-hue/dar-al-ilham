const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { auth, authorize } = require('../middleware/auth');

// @route   GET /api/activities
// @desc    Get all activities
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { type, circle, status } = req.query;
        const filter = { isActive: true };

        if (type) filter.type = type;
        if (circle) filter.circle = circle;
        if (status) filter.status = status;

        const activities = await Activity.find(filter)
            .populate('educator', 'name')
            .populate('circle', 'name level')
            .populate('submissions.student', 'user level')
            .sort('-createdAt');

        res.json({
            success: true,
            count: activities.length,
            activities
        });

    } catch (error) {
        console.error('Get activities error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب الأنشطة'
        });
    }
});

// @route   GET /api/activities/:id
// @desc    Get activity by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id)
            .populate('educator', 'name email avatar')
            .populate('circle', 'name level category')
            .populate('submissions.student', 'user level');

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'النشاط غير موجود'
            });
        }

        res.json({
            success: true,
            activity
        });

    } catch (error) {
        console.error('Get activity error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب بيانات النشاط'
        });
    }
});

// @route   POST /api/activities
// @desc    Create new activity
// @access  Private (Educator/Admin)
router.post('/', auth, authorize('educator', 'admin'), async (req, res) => {
    try {
        const activityData = {
            ...req.body,
            educator: req.user.id
        };

        const activity = await Activity.create(activityData);

        res.status(201).json({
            success: true,
            message: 'تم إنشاء النشاط بنجاح',
            activity
        });

    } catch (error) {
        console.error('Create activity error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في إنشاء النشاط'
        });
    }
});

// @route   POST /api/activities/:id/submit
// @desc    Submit activity
// @access  Private (Student)
router.post('/:id/submit', auth, async (req, res) => {
    try {
        const Student = require('../models/Student');
        
        // الحصول على Student ID من User ID
        const student = await Student.findOne({ user: req.user.id, isActive: true });
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'لم يتم العثور على ملف الطالب'
            });
        }

        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'النشاط غير موجود'
            });
        }

        await activity.submitActivity(student._id, req.body.content);

        res.json({
            success: true,
            message: 'تم تسليم النشاط بنجاح',
            activity
        });

    } catch (error) {
        console.error('Submit activity error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'حدث خطأ في تسليم النشاط'
        });
    }
});

module.exports = router;
