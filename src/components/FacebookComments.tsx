"use client";

import { useEffect } from "react";

// Khai báo global để tránh TypeScript lỗi
declare global {
  interface Window {
    FB?: {
      init: (opts: Record<string, unknown>) => void;
      XFBML: { parse: () => void };
    };
    fbAsyncInit?: () => void;
  }
}

const APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "";

interface Props {
  url: string;       // URL đầy đủ của bài viết
  numPosts?: number; // Số comment hiện tối đa (mặc định 10)
}

export default function FacebookComments({ url, numPosts = 10 }: Props) {
  useEffect(() => {
    const loadSdk = () => {
      // Nếu SDK đã load → parse lại widget cho URL mới
      if (window.FB) {
        window.FB.XFBML.parse();
        return;
      }

      // Callback khi SDK ready
      window.fbAsyncInit = () => {
        window.FB?.init({
          appId: APP_ID,
          xfbml: true,
          version: "v19.0",
        });
      };

      // Inject script một lần duy nhất
      if (!document.getElementById("facebook-jssdk")) {
        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/vi_VN/sdk.js";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
      }
    };

    loadSdk();
  }, [url]); // re-run khi URL thay đổi (SPA navigation)

  return (
    <div
      className="mt-12 pt-8"
      style={{ borderTop: "1px solid rgba(196,154,40,0.18)" }}
    >
      {/* Label */}
      <p
        className="font-sans text-[9px] uppercase tracking-[0.28em] mb-6"
        style={{ color: "rgba(196,154,40,0.65)" }}
      >
        Bình Luận
      </p>

      {/* fb-root bắt buộc */}
      <div id="fb-root" />

      {/* Widget Facebook Comments — dark theme */}
      <div
        className="fb-comments"
        data-href={url}
        data-width="100%"
        data-numposts={String(numPosts)}
        data-colorscheme="dark"
        data-order-by="social"
        data-lazy="true"
      />

      {/* Fallback khi JS chưa load */}
      <noscript>
        <p
          className="font-sans text-sm"
          style={{ color: "rgba(237,224,196,0.4)", marginTop: "1rem" }}
        >
          Vui lòng bật JavaScript để xem và đăng bình luận.
        </p>
      </noscript>
    </div>
  );
}
