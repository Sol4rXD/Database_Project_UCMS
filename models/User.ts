import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "Member" },
    joinedDate: { type: Date, default: Date.now },
    avatar: { type: String, default: "/testpic/anonymous.webp" },
    bio: { type: String },
    clubs: [{ type: String }], // Array of club slugs
    applications: [{
        club: { type: String },
        status: { type: String, default: "Pending" },
        interview: { type: String, default: "-" }
    }],
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);
