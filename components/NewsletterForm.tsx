"use client";

import { useState, useEffect } from "react";
import { validateEmail } from "@/lib/utils/emailValidation";
import { STORAGE_KEYS, RATE_LIMIT, API_CONFIG, COLORS } from "@/lib/constants";

interface NewsletterFormProps {
  onSuccess?: () => void;
}

export default function NewsletterForm({ onSuccess }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  // Check localStorage on mount to restore success state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSubmitted = localStorage.getItem(STORAGE_KEYS.FORM_SUBMITTED);
      if (hasSubmitted === "true") {
        setSuccess(true);
      }
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Clears the error and validation state when the user types
    if (error) {
      setError("");
    }
    if (isEmailInvalid && validateEmail(emailValue)) {
      setIsEmailInvalid(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validates the email format
    if (!validateEmail(email)) {
      setIsEmailInvalid(true);
      return;
    }

    // Checks if the user has already subscribed
    if (typeof window !== "undefined") {
      const hasSubmitted = localStorage.getItem(STORAGE_KEYS.FORM_SUBMITTED);
      if (hasSubmitted === "true") {
        setError("You have already subscribed!");
        return;
      }
    }

    // Checks if the user has already subscribed in the last minute
    let timestamp: number | null = null;
    if (typeof window !== "undefined") {
      const time = new Date();
      timestamp = time.valueOf();
      const previousTimestamp = localStorage.getItem(STORAGE_KEYS.FORM_TIMESTAMP);

      if (previousTimestamp && Number(previousTimestamp) + RATE_LIMIT.COOLDOWN_MS > timestamp) {
        setError("Too many signups, please try again in a little while");
        return;
      }
    }

    setLoading(true);
    setError("");
    setIsEmailInvalid(false);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        if (typeof window !== "undefined") {
          // Stores the success state in localStorage
          localStorage.setItem(STORAGE_KEYS.FORM_SUBMITTED, "true");
          if (timestamp !== null) {
            localStorage.setItem(STORAGE_KEYS.FORM_TIMESTAMP, timestamp.toString());
          }
        }
        setSuccess(true);
        setEmail("");
        onSuccess?.();
      } else {
        setError(data.message || "Something went wrong, please try again");
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.FORM_TIMESTAMP, "");
        }
      }
    } catch (err) {
      if (err instanceof Error && err.message === "Failed to fetch") {
        setError("Too many signups, please try again in a little while");
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong, please try again");
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.FORM_TIMESTAMP, "");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 justify-center items-stretch mb-6 md:mb-8 max-w-2xl mx-auto"
      >
        {!success ? (
          <>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={loading}
              className={`flex-1 px-4 md:px-5 py-3 rounded-xl border-2 transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed ${isEmailInvalid
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "focus:outline-none focus:ring-2 focus:border-transparent"
                } text-gray-900 bg-white shadow-sm`}
              style={!isEmailInvalid ? {
                borderColor: `${COLORS.PRIMARY.PURPLE_400}33`,
                '--tw-ring-color': COLORS.PRIMARY.PURPLE_500,
              } as React.CSSProperties & { '--tw-ring-color'?: string } : undefined}
            />
            <button
              type="submit"
              disabled={loading || success}
              className={`px-6 md:px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 whitespace-nowrap text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${loading
                ? "bg-gray-400 text-white cursor-wait"
                : "text-white"
                }`}
              style={!loading ? { background: `linear-gradient(to right, ${COLORS.PRIMARY.PURPLE_500}, ${COLORS.PRIMARY.PURPLE_700})` } : undefined}
            >
              {loading ? "Loading..." : "Get Early Access"}
            </button>
          </>
        ) : (
          <div className="w-full flex items-center justify-center py-3 px-6 md:px-8 rounded-xl text-white font-semibold text-sm md:text-base" style={{ background: `linear-gradient(to right, ${COLORS.PRIMARY.PURPLE_500}, ${COLORS.PRIMARY.PURPLE_700})` }}>
            ✓ Thanks! We&apos;ll be in touch!
          </div>
        )}
      </form>
      {error && !isEmailInvalid && (
        <p className="text-red-500 text-sm md:text-base mb-4 max-w-2xl mx-auto">{error}</p>
      )}
    </>
  );
}

