const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'الاسم مطلوب'],
        trim: true,
        minlength: [2, 'الاسم يجب أن يكون حرفين على الأقل'],
        maxlength: [100, 'الاسم طويل جداً']
    },
    email: {
        type: String,
        required: [true, 'البريد الإلكتروني مطلوب'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'البريد الإلكتروني غير صحيح']
    },
    password: {
        type: String,
        required: [true, 'كلمة المرور مطلوبة'],
        minlength: [8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'],
        select: false
    },
    phone: {
        type: String,
        match: [/^(05|5)[0-9]{8}$/, 'رقم الجوال غير صحيح']
    },
    role: {
        type: String,
        enum: ['student', 'educator', 'parent', 'admin'],
        default: 'student'
    },
    avatar: {
        type: String,
        default: '/assets/placeholder.jpg'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String,
    emailVerificationExpire: Date
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('خطأ في مقارنة كلمة المرور');
    }
};

// Get public profile
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        role: this.role,
        avatar: this.avatar,
        isActive: this.isActive,
        isEmailVerified: this.isEmailVerified,
        createdAt: this.createdAt
    };
};

module.exports = mongoose.model('User', userSchema);
