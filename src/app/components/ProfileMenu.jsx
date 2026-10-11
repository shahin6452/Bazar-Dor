"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfileMenu({ name, fullName, email, onProfile, onSignOut }) {

  const [open, setOpen] = useState(false);
  

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 cursor-pointer"
      >
        <Image
          src="/profile.jpg"
          width={15}
          height={15}
          alt="Profile Pic"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-lg"
        />


        <span className="text-sm font-medium text-gray-900">{name}</span>
        <span className="text-sm text-gray-500">▾</span>
      </button>


      {open && (
        <>

          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>


          <div className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
            <p className="text-sm font-semibold text-gray-900">{fullName}</p>
            <p className="mb-3 text-xs text-gray-500">{email}</p>

            <Link
              href='/profile'
              className="block w-full py-1.5 text-left text-sm text-gray-800 hover:text-emerald-700"
            >
              👤 আমার প্রোফাইল
            </Link>

            <button
              onClick={async () => {
                setOpen(false);
                await onSignOut();
              }}
              className="block w-full py-1.5 text-left text-sm text-red-600 hover:text-red-700 cursor-pointer"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </>
      )}
    </div>
  );
}
