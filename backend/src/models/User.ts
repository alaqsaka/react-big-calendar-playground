import mongoose, { Document, Schema } from 'mongoose';

export interface ILoginLog {
  action: 'login' | 'logout';
  timestamp: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  loginLogs: ILoginLog[];
}

const LoginLogSchema = new Schema<ILoginLog>({
  action: { type: String, enum: ['login', 'logout'], required: true },
  timestamp: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    loginLogs: [LoginLogSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
