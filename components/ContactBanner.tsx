"use client";

import React from "react";
import { Facebook, Instagram, Mail, MessageCircle, Globe, Phone } from "lucide-react";

interface Contact {
    platform: string;
    link: string;
}

export default function ContactBanner({ contacts }: { contacts: Contact[] }) {
    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "facebook": return <Facebook className="w-4 h-4" />;
            case "instagram": return <Instagram className="w-4 h-4" />;
            case "phone": return <Phone className="w-4 h-4" />;
            case "email": return <Mail className="w-4 h-4" />;
            default: return <Globe className="w-4 h-4" />;
        }
    };

    return (
        <section className="bg-white py-5 border-t border-slate-100">
            <div className="max-w-[1100px] mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* LEFT SIDE: CTA (Back to original style) */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-[#0B2C4D]" />
                        </div>
                        <div>
                            <h3 className="text-[18px] font-bold text-[#0B2C4D] leading-tight">Connect with our Club</h3>
                            {/* <p className="text-[14px] text-slate-500 mt-1">Contact us for membership and inquiries</p> */}
                        </div>
                    </div>

                    {/* RIGHT SIDE: CONTACT LIST */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {contacts?.map((contact, index) => (
                            <a
                                key={index}
                                href={contact.link.startsWith("http") ? contact.link : `https://${contact.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2.5 bg-slate-50 hover:bg-[#0B2C4D] border border-slate-100 px-4 py-2 rounded-xl transition-all duration-300"
                            >
                                <div className="text-slate-400 group-hover:text-white transition-colors duration-300">
                                    {getIcon(contact.platform)}
                                </div>
                                <span className="text-[13px] font-bold text-[#0B2C4D] group-hover:text-white transition-colors duration-300">
                                    {contact.platform}
                                </span>
                            </a>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}