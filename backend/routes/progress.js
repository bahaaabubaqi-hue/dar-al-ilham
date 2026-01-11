const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Activity = require('../models/Activity');
const { auth } = require('../middleware/auth');

// @route   GET /api/progress/:studentId
// @desc    Get student progress
// @access  Private
router.get('/:studentId', auth, async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId)
            .populate('user', 'name email avatar')
            .populate('circles', 'name level category');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'الطالب غير موجود'
            });
        }

        // Get completed activities
        const activities = await Activity.find({
            'submissions.student': student._id,
            'submissions.status': 'مقبول'
        });

        const progress = {
            student: {
                name: student.user ? student.user.name : 'طالب',
                level: student.level,
                stage: student.currentStage
            },
            values: student.values,
            totalPoints: student.totalPoints,
            completedActivities: activities.length,
            circles: student.circles,
            recentActivities: activities.slice(0, 5).map(activity => ({
                id: activity._id,
                title: activity.title,
                type: activity.type
            }))
        };

        res.json({
            success: true,
            progress
        });

    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في جلب التقدم'
        });
    }
});

module.exports = router;
