"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="bg-primary/10 border border-primary/20 p-8 text-center rounded">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-serif text-xl font-medium text-charcoal uppercase mb-2">
          Gửi Thành Công
        </h3>
        <p className="font-sans text-muted text-sm">
          Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-navy text-sm"
        >
          Gửi Tin Nhắn Khác
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full border border-earth/20 px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors rounded bg-white";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input
          {...register("name", { required: "Vui lòng nhập tên của bạn" })}
          placeholder="Tên của bạn *"
          className={inputClass}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" },
          })}
          type="email"
          placeholder="Địa chỉ email *"
          className={inputClass}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("subject")}
          placeholder="Chủ đề"
          className={inputClass}
        />
      </div>

      <div>
        <textarea
          {...register("message", { required: "Vui lòng nhập lời nhắn" })}
          placeholder="Lời nhắn của bạn *"
          rows={6}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Đang Gửi..." : "Gửi Tin Nhắn"}
      </button>
    </form>
  );
}
