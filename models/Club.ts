import { Schema, model, models } from "mongoose";

const ClubSchema = new Schema({
  club_name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  club_category: { type: String },
  logo_url: { type: String}, 
  location: { type: String, required: true },
  google_map_link: { type: String },

  description: {
    short: { type: String },
    full: { type: String },
  },

  activity_images: [
    {
      url: { type: String },
      caption: { type: String },
    },
  ],

  position: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],

  member_count: { type: Number, default: 0 },

  reviews: [
    {
      user_id: { type: String }, // Relate to user_id (MySQL)
      star: { type: Number, min: 1, max: 5 },
      text: { type: String },
      create_at: { type: Date, default: Date.now },
    },
  ],

  contact: [
    {
      platform: { type: String }, // Facebook, Instagram
      link: { type: String },
    },
  ],

  is_open: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

export const Club = models.Club || model("Club", ClubSchema);
