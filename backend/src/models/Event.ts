import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEvent extends Document {
  email: string;
  date: Date;
  description: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  deletedAt?: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    email: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>('Event', EventSchema);
