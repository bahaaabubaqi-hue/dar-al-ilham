const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Circle = require('../models/Circle');
const { auth, authorize } = require('../middleware/auth');

// @route   GET /api/educators
// @desc    Get all educators
// @access  Private (Admin)
router.get('/', auth, authorize('admin'), async (req, res) => {
    try {
        const educators = await User.find({ 
            role: 'educator', 
            isActive: true 
        }).select('-password');

        res.json({
            success: true,
            count: educators.length,
            educators
        });

    } catch (error) {
        console.error('Get educators error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب المربين'
        });
    }
});

// @route   GET /api/educators/:id/circles
// @desc    Get educator's circles
// @access  Private
router.get('/:id/circles', auth, async (req, res) => {
    try {
        const circles = await Circle.find({ 
            educator: req.params.id,
            isActive: true 
        })
        .populate('students', 'user level')
        .sort('-createdAt');

        res.json({
            success: true,
            count: circles.length,
            circles
        });

    } catch (error) {
        console.error('Get educator circles error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب حلقات المربي'
        });
    }
});

module.exports = router;
