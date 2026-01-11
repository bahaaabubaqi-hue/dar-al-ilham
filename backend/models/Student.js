const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    age: {
        type: Number,
        min: [5, 'العمر يجب أن يكون 5 سنوات على الأقل'],
        max: [13, 'العمر يجب أن يكون 13 سنة كحد أقصى']
    },
    level: {
        type: String,
        enum: ['براعم', 'أشبال', 'ملهمون'],
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    circles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circle'
    }],
    values: {
        عابد: { type: Number, default: 0 },
        قوي: { type: Number, default: 0 },
        مسؤول: { type: Number, default: 0 },
        رحيم: { type: Number, default: 0 },
        أمين: { type: Number, default: 0 },
        جميل: { type: Number, default: 0 },
        حر: { type: Number, default: 0 }
    },
    currentStage: {
        type: String,
        enum: ['مبادر', 'مثابر', 'مجاهد', 'مطمئن'],
        default: 'مبادر'
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    completedActivities: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Calculate total points
studentSchema.methods.calculateTotalPoints = function() {
    const values = this.values;
    this.totalPoints = Object.values(values).reduce((sum, val) => sum + val, 0);
    return this.totalPoints;
};

// Update stage based on points
studentSchema.methods.updateStage = function() {
    const points = this.totalPoints;
    
    if (points >= 1000) {
        this.currentStage = 'مطمئن';
    } else if (points >= 600) {
        this.currentStage = 'مجاهد';
    } else if (points >= 300) {
        this.currentStage = 'مثابر';
    } else {
        this.currentStage = 'مبادر';
    }
    
    return this.currentStage;
};

module.exports = mongoose.model('Student', studentSchema);
