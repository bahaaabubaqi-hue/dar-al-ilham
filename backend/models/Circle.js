const mongoose = require('mongoose');

const circleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'اسم الحلقة مطلوب'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'وصف الحلقة مطلوب']
    },
    level: {
        type: String,
        enum: ['براعم', 'أشبال', 'ملهمون', 'متقدم'],
        required: true
    },
    educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    maxStudents: {
        type: Number,
        default: 15
    },
    schedule: {
        day: {
            type: String,
            enum: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
        },
        time: String
    },
    status: {
        type: String,
        enum: ['نشطة', 'متوقفة', 'مكتملة'],
        default: 'نشطة'
    },
    category: {
        type: String,
        enum: ['مجلس علم', 'نشاط عملي', 'وقفة تدبرية'],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Check if circle is full
circleSchema.methods.isFull = function() {
    return this.students.length >= this.maxStudents;
};

// Add student to circle
circleSchema.methods.addStudent = async function(studentId) {
    if (this.isFull()) {
        throw new Error('الحلقة ممتلئة');
    }
    
    if (!this.students.includes(studentId)) {
        this.students.push(studentId);
        await this.save();
    }
    
    return this;
};

// Remove student from circle
circleSchema.methods.removeStudent = async function(studentId) {
    this.students = this.students.filter(id => id.toString() !== studentId.toString());
    await this.save();
    return this;
};

module.exports = mongoose.model('Circle', circleSchema);
