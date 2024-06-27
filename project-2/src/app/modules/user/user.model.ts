import { Schema, model } from 'mongoose';
import { TUser, UserModelInterface } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModelInterface>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//middleware

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistChecker = async function (id: string) {
  return await UserModel.findOne({ id }).select('+password');
};

userSchema.statics.isUserDeletedChecker = async function (userData: TUser) {
  return userData?.isDeleted;
};

userSchema.statics.isUserStatusChecker = async function (userData: TUser) {
  return userData?.status === 'blocked';
};

userSchema.statics.isNewTokenGrantedAfterPassChangeChecker = async function (
  passwordChangedTimestamp: Date,
  tokenIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > tokenIssuedTimestamp;
};

userSchema.statics.isPasswordMatchedChecker = async function (
  plaintextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plaintextPassword, hashedPassword);
};

export const UserModel = model<TUser, UserModelInterface>('users', userSchema);
