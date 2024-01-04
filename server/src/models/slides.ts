import mongoose, { Schema, Document, Model } from "mongoose";

export interface SlidesDocument extends Document {
  url: string;
  _doc: SlidesDocument;
}
const SlidesSchema: Schema<SlidesDocument> = new Schema(
  {
    url: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, result) {
        result.id = result._id;
        delete result._id;
        delete result.createdAt;
        delete result.updatedAt;
        delete result.__v;
      },
    },
  }
);

export const Slides: Model<SlidesDocument> = mongoose.model<SlidesDocument>(
  "Slides",
  SlidesSchema
);
