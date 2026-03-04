import { Schema, model, models } from "mongoose";

const ClubSchema = new Schema({
  club_name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
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

  position: [
    {
      name: { type: String },
      amount: { type: Number },
    },
  ],

  cover_image: { type: String },

  reviews: [
    {
      user_id: { type: String }, // Relate to user_id (MySQL)
      name: { type: String },
      position: { type: String },
      star: { type: Number, min: 1, max: 5 },
      text: { type: String },
      year: { type: Number },
      create_at: { type: Date, default: Date.now },
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

// In Next.js dev mode, the model is cached. We need to clear it to see schema changes.
if (process.env.NODE_ENV === "development") {
  for (const modelName in models) {
    if (modelName === "Club") {
      delete models[modelName];
    }
  }
}

export const Club = models.Club || model("Club", ClubSchema);
