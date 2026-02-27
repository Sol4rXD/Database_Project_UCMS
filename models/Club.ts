import mongoose, { Schema, model, models } from "mongoose";

const ClubSchema = new Schema({
  slug: { type: String, unique: true, required: true },
  club_name: { type: String, required: true },
  club_category: { type: String },
  logo_url: { type: String },
  location: { type: String, required: true },
  google_map_link: { type: String },

  description: {
    short: { type: String },
    full: { type: String },
  },

  what_we_do: [
    {
      activity_name: { type: String },
      image_url: { type: String },
      description: { type: String },
      year: { type: Number },
    },
  ],

  activity_images: [{ type: String }],

  position: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],

  member_count: { type: Number, default: 0 },

  reviews: [
    {
      name: { type: String },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      year: { type: Number },
      position: { type: String },
      user_image: { type: String },
      created_at: { type: Date, default: Date.now },
    },
  ],

  contact: [
    {
      platform: { type: String }, // Facebook, Instagram
      link: { type: String },
    },
  ],

  faqs: [
    {
      question: { type: String },
      answer: { type: String },
    },
  ],

  is_open: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

export const Club = models.Club || model("Club", ClubSchema);
