const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان النشاط مطلوب'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'وصف النشاط مطلوب']
    },
    type: {
        type: String,
        enum: ['مجلس علم', 'مهمة عملية', 'وقفة تدبرية'],
        required: true
    },
    circle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circle',
        required: true
    },
    educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetValues: [{
        type: String,
        enum: ['عابد', 'قوي', 'مسؤول', 'رحيم', 'أمين', 'جميل', 'حر']
    }],
    points: {
        type: Number,
        default: 10,
        min: 0
    },
    content: {
        videoUrl: String,
        pdfUrl: String,
        instructions: String
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['مسودة', 'منشور', 'مكتمل', 'ملغي'],
        default: 'مسودة'
    },
    submissions: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        submittedAt: {
            type: Date,
            default: Date.now
        },
        content: {
            text: String,
            fileUrl: String
        },
        status: {
            type: String,
            enum: ['معلق', 'مراجعة', 'مقبول', 'مرفوض'],
            default: 'معلق'
        },
        feedback: String,
        grade: Number,
        reviewedAt: Date,
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Get pending submissions count
activitySchema.methods.getPendingCount = function() {
    return this.submissions.filter(s => s.status === 'معلق').length;
};

// Submit activity
activitySchema.methods.submitActivity = async function(studentId, content) {
    const existingSubmission = this.submissions.find(
        s => s.student.toString() === studentId.toString()
    );
    
    if (existingSubmission) {
        throw new Error('تم تسليم هذا النشاط مسبقاً');
    }
    
    this.submissions.push({
        student: studentId,
        content: content,
        status: 'معلق'
    });
    
    await this.save();
    return this;
};

// Review submission
activitySchema.methods.reviewSubmission = async function(submissionId, reviewData) {
    const submission = this.submissions.id(submissionId);
    
    if (!submission) {
        throw new Error('التسليم غير موجود');
    }
    
    submission.status = reviewData.status;
    submission.feedback = reviewData.feedback;
    submission.grade = reviewData.grade;
    submission.reviewedAt = new Date();
    submission.reviewedBy = reviewData.reviewedBy;
    
    await this.save();
    return submission;
};

module.exports = mongoose.model('Activity', activitySchema);
