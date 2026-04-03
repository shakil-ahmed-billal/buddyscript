"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

// ─── Action Buttons Data ──────────────────────────────────────────────────
const actions = [
  {
    label: "Photo",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path fill="#666" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z" />
      </svg>
    ),
  },
  {
    label: "Video",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
        <path fill="#666" d="M11.485 4.5c2.213 0 3.753 1.534 3.917 3.784l2.418-1.082c1.047-.468 2.188.327 2.271 1.533l.005.141v6.64c0 1.237-1.103 2.093-2.155 1.72l-.121-.047-2.418-1.083c-.164 2.25-1.708 3.785-3.917 3.785H5.76c-2.343 0-3.932-1.72-3.932-4.188V8.688c0-2.47 1.589-4.188 3.932-4.188h5.726zm0 1.5H5.76C4.169 6 3.197 7.05 3.197 8.688v7.015c0 1.636.972 2.688 2.562 2.688h5.726c1.586 0 2.562-1.054 2.562-2.688v-.686-6.329c0-1.636-.973-2.688-2.562-2.688zM18.4 8.57l-.062.02-2.921 1.306v4.596l2.921 1.307c.165.073.343-.036.38-.215l.008-.07V8.876c0-.195-.16-.334-.326-.305z"/>
      </svg>
    ),
  },
  {
    label: "Event",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
        <path fill="#666" d="M14.371 2c.32 0 .585.262.627.603l.005.095v.788c2.598.195 4.188 2.033 4.18 5v8.488c0 3.145-1.786 5.026-4.656 5.026H7.395C4.53 22 2.74 20.087 2.74 16.904V8.486c0-2.966 1.596-4.804 4.187-5v-.788c0-.386.283-.698.633-.698zm0 1.448h-6.22V5.1c0 .385-.285.698-.637.698-.32 0-.585-.262-.628-.602l-.005-.096V3.448h-.062c-2.029 0-2.73 1.205-2.73 3.551v8.486h11v-8.486c0-2.345-.7-3.551-2.718-3.551zm-7.058 6.046c.323 0 .589.263.632.604l.006.094v1.205c0 .386-.286.698-.638.698-.323 0-.59-.263-.632-.604l-.006-.094V10.19c0-.385.285-.697.638-.697zm6.756-.041c.323 0 .59.262.633.604l.005.094v1.205c0 .385-.286.697-.638.697-.323 0-.59-.262-.633-.603l-.005-.095v-1.205c0-.385.286-.697.638-.697zm-3.37.041c.323 0 .59.263.632.604l.006.094v1.205c0 .386-.285.698-.638.698-.323 0-.59-.263-.632-.604l-.006-.094V10.19c0-.385.286-.697.638-.697zm0 2.946c.323 0 .59.262.632.603l.006.095v1.22c0 .386-.285.698-.638.698s-.638-.312-.638-.698v-1.22c0-.34.258-.621.583-.69l.055-.008zm3.37-.04c.323 0 .59.262.633.603l.005.095v1.22c0 .385-.286.698-.638.698-.323 0-.59-.262-.633-.603l-.005-.095v-1.22c0-.385.286-.697.638-.697zm-6.756.04c.323 0 .589.263.632.604l.006.094v1.22c0 .385-.286.698-.638.698-.323 0-.59-.263-.632-.604l-.006-.094v-1.22c0-.385.285-.697.638-.697z" />
      </svg>
    ),
  },
  {
    label: "Article",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" viewBox="0 0 18 20">
        <path fill="#666" d="M12.49 0c2.92 0 4.665 1.92 4.693 5.132v9.659c0 3.257-1.75 5.209-4.693 5.209H5.434c-.377 0-.734-.032-1.07-.095l-.2-.041C2 19.371.74 17.555.74 14.791V5.209c0-.334.019-.654.055-.96C1.114 1.564 2.799 0 5.434 0h7.056zm-.008 1.457H5.434c-2.244 0-3.381 1.263-3.381 3.752v9.582c0 2.489 1.137 3.752 3.38 3.752h7.049c2.242 0 3.372-1.263 3.372-3.752V5.209c0-2.489-1.13-3.752-3.372-3.752zm-.239 12.053c.36 0 .652.324.652.724 0 .4-.292.724-.652.724H5.656c-.36 0-.652-.324-.652-.724 0-.4.293-.724.652-.724h6.587zm0-4.239a.643.643 0 01.632.339.806.806 0 010 .78.643.643 0 01-.632.339H5.656c-.334-.042-.587-.355-.587-.729s.253-.688.587-.729h6.587zM8.17 5.042c.335.041.588.355.588.729 0 .373-.253.687-.588.728H5.665c-.336-.041-.589-.355-.589-.728 0-.374.253-.688.589-.729H8.17z"/>
      </svg>
    ),
  },
];

// ─── Create Post Component ────────────────────────────────────────────────
export function FeedCreatePost() {
  const [text, setText] = useState("");

  return (
    <div className="bg-white rounded-[6px] mb-[24px] border border-bs-bg">
      <div className="p-[24px]">
        {/* Textarea Area */}
        <div className="flex items-start">
          <div className="mr-[12px]">
            <img
              src="/assets/images/txt_img.png"
              alt="You"
              className="w-[43px] h-[43px] rounded-full object-cover shrink-0"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write something..."
              rows={2}
              className="w-full resize-none bg-transparent text-[14px] text-bs-dark font-[Poppins] border-none placeholder-[#666] focus:outline-none focus:ring-0 pt-[12px] pb-[12px] min-h-[44px]"
            />
          </div>
        </div>
      </div>

      <hr className="border-t border-bs-bg mx-[24px]" />

      {/* Bottom Bar */}
      <div className="px-[24px] py-[16px] flex flex-wrap items-center justify-between">
        {/* Action Buttons */}
        <div className="flex items-center gap-[24px]">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="flex items-center gap-[10px] text-bs-muted text-[14px] font-medium font-[Poppins] hover:text-bs-primary transition-all group"
            >
              <span className="shrink-0 flex items-center justify-center">
                {action.icon}
              </span>
              <span className="hidden sm:inline">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Post Button */}
        <button
          type="button"
          className="flex items-center gap-[6px] bg-bs-primary hover:bg-[#1580E0] text-white font-medium text-[14px] font-[Poppins] px-[24px] py-[10px] rounded-[6px] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
            <path fill="#fff" fillRule="evenodd" d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88z" clipRule="evenodd" />
          </svg>
          <span className="pb-px">Post</span>
        </button>
      </div>
    </div>
  );
}
