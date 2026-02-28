"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, CheckCircle, Clock, XCircle } from "lucide-react";

interface ApplyButtonProps {
    clubId: string;
    isOpen: boolean;
}

export default function ApplyButton({ clubId, isOpen }: ApplyButtonProps) {
    const [user, setUser] = useState<any>(null);
    const [status, setStatus] = useState<"none" | "pending" | "approved" | "rejected" | "member">("none");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            const savedUser = localStorage.getItem("user");
            if (!savedUser) {
                setLoading(false);
                return;
            }
            const userData = JSON.parse(savedUser);
            setUser(userData);

            try {
                // Check if already a member
                const memberRes = await axios.get(`/api/usersclub?user_id=${userData.id}&club_id=${clubId}`);
                if (memberRes.data) {
                    setStatus("member");
                    setLoading(false);
                    return;
                }

                // Check if already applied
                const applyRes = await axios.get(`/api/clubapply?user_id=${userData.id}&club_id=${clubId}`);
                if (applyRes.data) {
                    if (applyRes.data.status === "PENDING") setStatus("pending");
                    else if (applyRes.data.status === "APPROVE") setStatus("approved");
                    else if (applyRes.data.status === "REJECT") setStatus("rejected");
                }
            } catch (error) {
                console.error("Check application status failed:", error);
            } finally {
                setLoading(false);
            }
        };

        checkStatus();
    }, [clubId]);

    const handleApply = async () => {
        if (!user) {
            toast.error("Please login to apply for a club");
            return;
        }

        if (status !== "none") return;

        setSubmitting(true);
        try {
            await axios.post("/api/clubapply", {
                club_id: clubId,
                user_id: user.id
            });
            setStatus("pending");
            toast.success("Application submitted successfully!");
        } catch (error: any) {
            console.error("Application failed:", error);
            toast.error(error.response?.data?.error || "Failed to submit application");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <button disabled className="mt-10 w-full py-5 rounded-2xl bg-white/10 text-white/40 cursor-not-allowed">
                <Loader2 className="animate-spin mx-auto h-5 w-5" />
            </button>
        );
    }

    let buttonText = "Apply for Club";
    let isDisabled = !isOpen;
    let buttonClass = isOpen
        ? "bg-white text-[#0B2C4D] hover:bg-blue-50 hover:scale-[1.02] shadow-blue-900/40"
        : "bg-white/10 text-white/40 cursor-not-allowed shadow-none";
    let icon = null;

    if (!user) {
        buttonText = "Login to Apply";
    } else if (status === "pending") {
        buttonText = "Waiting for Approval";
        isDisabled = true;
        buttonClass = "bg-white/20 text-blue-200 cursor-not-allowed border border-blue-400/30";
        icon = <Clock className="mr-2 h-5 w-5" />;
    } else if (status === "member" || status === "approved") {
        buttonText = "Already a Member";
        isDisabled = true;
        buttonClass = "bg-emerald-500/20 text-emerald-300 cursor-not-allowed border border-emerald-400/30";
        icon = <CheckCircle className="mr-2 h-5 w-5" />;
    } else if (status === "rejected") {
        buttonText = "Application Rejected";
        isDisabled = true;
        buttonClass = "bg-rose-500/20 text-rose-300 cursor-not-allowed border border-rose-400/30";
        icon = <XCircle className="mr-2 h-5 w-5" />;
    } else if (!isOpen) {
        buttonText = "Registration Closed";
    }

    return (
        <button
            onClick={handleApply}
            disabled={isDisabled || submitting}
            className={`mt-10 w-full py-5 rounded-2xl text-[16px] font-black tracking-wide uppercase transition-all duration-300 shadow-xl flex items-center justify-center ${buttonClass}`}
        >
            {submitting ? (
                <Loader2 className="animate-spin h-5 w-5" />
            ) : (
                <>
                    {icon}
                    {buttonText}
                </>
            )}
        </button>
    );
}
