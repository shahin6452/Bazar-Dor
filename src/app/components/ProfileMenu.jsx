"use client";

import { useState, useRef, useEffect } from "react";

// ছবির বদলে ডিফল্ট অ্যাভাটার (SVG)
function Avatar({ size = 36 }) {
  return (
    <span
      className="inline-flex items-center justify-center overflow-hidden rounded-lg bg-emerald-100"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width={size * 0.8} height={size * 0.8} fill="#059669">
        <circle cx="12" cy="9" r="4" />
        <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7H4z" />
      </svg>
    </span>
  );
}

export default function ProfileMenu({
  name = "Rezwan",
  fullName = "Rezwan Ahmed",
  email = "rezwanahmed@gmail.com",
  onProfile = () => {},
  onSignOut = () => {},
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // বাইরে ক্লিক বা Esc চাপলে মেনু বন্ধ হবে
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* ট্রিগার বাটন */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
      >
        <Avatar />
        <span className="text-sm font-medium text-gray-900">{name}</span>
        <span className="text-[10px] text-gray-500">▾</span>
      </button>

      {/* ড্রপডাউন কার্ড */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
        >
          <p className="text-sm font-semibold text-gray-900">{fullName}</p>
          <p className="mb-3 text-xs text-gray-500">{email}</p>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onProfile();
            }}
            className="flex w-full items-center gap-2 rounded-md py-1.5 text-left text-sm text-gray-800 hover:text-emerald-700"
          >
            <span aria-hidden="true">👤</span> আমার প্রোফাইল
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
            className="flex w-full items-center gap-2 rounded-md py-1.5 text-left text-sm text-red-600 hover:text-red-700"
          >
            <span aria-hidden="true">↩</span> সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
