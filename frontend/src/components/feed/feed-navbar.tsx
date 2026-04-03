"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Icons (inline SVG) ───────────────────────────────────────────────────
function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="21"
      fill="none"
      viewBox="0 0 18 21"
    >
      <path
        stroke={active ? "#1890FF" : "#000"}
        strokeOpacity={active ? 1 : 0.6}
        strokeWidth="1.5"
        d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z"
      />
      <path
        stroke={active ? "#1890FF" : "#000"}
        strokeOpacity={active ? 1 : 0.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857"
      />
    </svg>
  );
}

function FriendsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="20"
      fill="none"
      viewBox="0 0 26 20"
    >
      <path
        fill="#000"
        fillOpacity=".6"
        fillRule="evenodd"
        d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zm-17.685.735a.878.878 0 01-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .491.798.793a.873.873 0 01-.314 1.693.897.897 0 01-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 001.04 2.527 3.58 3.58 0 002.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="22"
      fill="none"
      viewBox="0 0 20 22"
    >
      <path
        fill="#000"
        fillOpacity=".6"
        fillRule="evenodd"
        d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="22"
      fill="none"
      viewBox="0 0 23 22"
    >
      <path
        fill="#000"
        fillOpacity=".6"
        fillRule="evenodd"
        d="M11.43 0c2.96 0 5.743 1.143 7.833 3.22 4.32 4.29 4.32 11.271 0 15.562C17.145 20.886 14.293 22 11.405 22c-1.575 0-3.16-.33-4.643-1.012-.437-.174-.847-.338-1.14-.338-.338.002-.793.158-1.232.308-.9.307-2.022.69-2.852-.131-.826-.822-.445-1.932-.138-2.826.152-.44.307-.895.307-1.239 0-.282-.137-.642-.347-1.161C-.57 11.46.322 6.47 3.596 3.22A11.04 11.04 0 0111.43 0zm0 1.535A9.5 9.5 0 004.69 4.307a9.463 9.463 0 00-1.91 10.686c.241.592.474 1.17.474 1.77 0 .598-.207 1.201-.39 1.733-.15.439-.378 1.1-.231 1.245.143.147.813-.085 1.255-.235.53-.18 1.133-.387 1.73-.391.597 0 1.161.225 1.758.463 3.655 1.679 7.98.915 10.796-1.881 3.716-3.693 3.716-9.7 0-13.391a9.5 9.5 0 00-6.74-2.77zm4.068 8.867c.57 0 1.03.458 1.03 1.024 0 .566-.46 1.023-1.03 1.023a1.023 1.023 0 11-.01-2.047h.01zm-4.131 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.03 1.03 0 01-1.035-1.024c0-.566.455-1.023 1.025-1.023h.01zm-4.132 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.022 1.022 0 11-.01-2.047h.01z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
    >
      <circle cx="7" cy="7" r="6" stroke="#666" />
      <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        fill="#112032"
        d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
      />
    </svg>
  );
}

// ─── Notification Dropdown ────────────────────────────────────────────────
function NotificationDropdown({ open }: { open: boolean }) {
  if (!open) return null;
  const items = [
    {
      img: "/assets/images/friend-req.png",
      name: "Steve Jobs",
      text: "posted a link in your timeline.",
      time: "42 minutes ago",
    },
    {
      img: "/assets/images/profile-1.png",
      name: "An admin",
      text: "changed the name of the group Freelancer usa to Freelancer usa",
      time: "42 minutes ago",
    },
    {
      img: "/assets/images/friend-req.png",
      name: "Steve Jobs",
      text: "posted a link in your timeline.",
      time: "42 minutes ago",
    },
  ];
  return (
    <div className="absolute right-0 top-[110%] w-[330px] bg-white rounded-[6px] shadow-[7px_20px_60px_rgba(108,126,147,0.15)] z-50 border border-bs-bg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-[20px] flex items-center justify-between border-b border-bs-bg">
        <h4 className="text-[17px] font-semibold text-bs-dark font-[Poppins]">
          Notifications
        </h4>
        <button className="p-1 hover:bg-bs-bg rounded-full transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
            <circle cx="2" cy="2" r="2" fill="#C4C4C4" className="group-hover:fill-bs-primary transition-colors" />
            <circle cx="2" cy="8" r="2" fill="#C4C4C4" className="group-hover:fill-bs-primary transition-colors" />
            <circle cx="2" cy="15" r="2" fill="#C4C4C4" className="group-hover:fill-bs-primary transition-colors" />
          </svg>
        </button>
      </div>

      <div className="px-[20px] py-[15px] flex gap-[8px] border-b border-bs-bg bg-[#FAFAFA]">
        <button className="px-[16px] py-[6px] bg-bs-primary text-white text-[13px] font-medium rounded-[4px] font-[Poppins]">
          All
        </button>
        <button className="px-[16px] py-[6px] bg-white border border-bs-bg text-[#767676] text-[13px] font-medium rounded-[4px] font-[Poppins] hover:border-bs-primary hover:text-bs-primary transition-all">
          Unread
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
        {items.map((n, i) => (
          <div
            key={i}
            className="flex gap-[12px] px-[20px] py-[15px] hover:bg-bs-bg cursor-pointer transition-colors border-b border-bs-bg last:border-0"
          >
            <img
              src={n.img}
              alt=""
              className="w-[45px] h-[45px] rounded-full object-cover shrink-0 border border-bs-bg"
            />
            <div className="flex-1">
              <p className="text-[14px] text-bs-dark leading-[1.4] font-[Poppins]">
                <span className="font-semibold hover:text-bs-primary transition-colors cursor-pointer">
                  {n.name}
                </span>{" "}
                {n.text}
              </p>
              <div className="text-[12px] text-bs-muted mt-[4px] font-[Poppins]">
                {n.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────
function ProfileDropdown({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <div className="absolute right-0 top-[110%] w-[240px] bg-white rounded-[6px] shadow-[7px_20px_60px_rgba(108,126,147,0.15)] z-50 border border-bs-bg py-[10px] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* User Info */}
      <div className="flex gap-[12px] px-[20px] py-[15px] items-center border-b border-bs-bg mb-[10px]">
        <img
          src="/assets/images/profile.png"
          alt=""
          className="w-[45px] h-[45px] rounded-full object-cover border border-bs-bg"
        />
        <div>
          <h4 className="text-[15px] font-bold text-bs-dark font-[Poppins]">Dylan Field</h4>
          <Link
            href="/profile"
            className="text-[12px] text-bs-primary hover:underline font-medium font-[Poppins]"
          >
            View Profile
          </Link>
        </div>
      </div>
      
      {/* Menu List */}
      <div className="px-[10px]">
        <ul className="flex flex-col gap-[2px]">
          <li>
            <a href="#0" className="flex items-center justify-between px-[15px] py-[10px] rounded-[4px] hover:bg-bs-bg transition-all group">
              <div className="flex items-center gap-[12px]">
                <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#EBF2FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none" viewBox="0 0 18 19">
                    <path fill="#377DFF" d="M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.313.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17zM9.584 6.396a3.105 3.105 0 100 6.21 3.105 3.105 0 000-6.21z"/>
                  </svg>
                </span>
                <span className="text-[14px] font-medium text-bs-dark font-[Poppins]">Settings</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10" className="opacity-40 group-hover:opacity-100 transition-opacity">
                <path fill="#112032" d="M1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#0" className="flex items-center justify-between px-[15px] py-[10px] rounded-[4px] hover:bg-bs-bg transition-all group">
              <div className="flex items-center gap-[12px]">
                <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#EBF2FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path stroke="#377DFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19a9 9 0 100-18 9 9 0 000 18z"/>
                    <path stroke="#377DFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009"/>
                  </svg>
                </span>
                <span className="text-[14px] font-medium text-bs-dark font-[Poppins]">Help & Support</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10" className="opacity-40 group-hover:opacity-100 transition-opacity">
                <path fill="#112032" d="M1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#0" className="flex items-center justify-between px-[15px] py-[10px] rounded-[4px] hover:bg-bs-bg transition-all group mt-[5px] border-t border-bs-bg pt-[15px]">
              <div className="flex items-center gap-[12px]">
                <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#FFEBEB]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                    <path stroke="#FF3737" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.25 6.75L15 10.5m0 0l-3.75 3.75M15 10.5H6.75m0-7.5h-1.5A2.25 2.25 0 003 5.25v10.5A2.25 2.25 0 005.25 18h1.5"/>
                  </svg>
                </span>
                <span className="text-[14px] font-medium text-[#FF3737] font-[Poppins]">Logout</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────
export function FeedNavbar() {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifyRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (notifyRef.current && !notifyRef.current.contains(e.target as Node))
        setNotifyOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-bs-bg fixed top-0 left-0 z-50">
      <div className="max-w-[1300] mx-auto">
        {/* Navigation Wrapper matching _header_inner_wrap padding 27px 0 29px */}
        <div className="flex items-center justify-between py-5 relative">
          
          <div className="flex items-center flex-1 max-w-[50%]">
             {/* Logo */}
            <Link href="/" className="shrink-0 mr-[32px]">
              <img
                src="/assets/images/logo.svg"
                alt="Buddy Script"
                className="w-[169px] object-contain"
              />
            </Link>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-[424px] hidden sm:block">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search..."
                className="w-full h-[40px] bg-[#F3F3F4] border border-transparent rounded-[40px] pl-[47px] pr-[16px] text-[16px] text-bs-dark font-[Poppins] placeholder-[rgba(0,0,0,0.25)] focus:outline-none focus:border-bs-primary transition-all"
              />
            </div>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center lg:gap-[16px] gap-[8px] justify-end">
            {/* Home */}
            <Link
              href="/"
              className="flex items-center justify-center p-[6px] hover:bg-bs-bg rounded-full transition-colors relative h-[40px] w-[40px]"
            >
              <HomeIcon active />
            </Link>

            {/* Friends */}
            <Link
              href="#"
              className="flex items-center justify-center p-[6px] hover:bg-bs-bg rounded-full transition-colors relative h-[40px] w-[40px]"
            >
              <FriendsIcon />
            </Link>

            {/* Notifications */}
            <div ref={notifyRef} className="relative flex items-center justify-center h-[40px] w-[40px]">
              <button
                onClick={() => {
                  setNotifyOpen((v) => !v);
                  setProfileOpen(false);
                }}
                className="flex items-center justify-center hover:bg-bs-bg rounded-full transition-colors relative w-full h-full"
              >
                <BellIcon />
                <span className="absolute -top-[2px] -right-[2px] min-w-[17px] h-[17px] px-[3px] bg-bs-primary border border-white text-white text-[11px] font-[Poppins] rounded-[9px] flex items-center justify-center leading-[1.4]">
                  6
                </span>
              </button>
              <NotificationDropdown open={notifyOpen} />
            </div>

            {/* Chat */}
            <Link
              href="#"
              className="flex items-center justify-center hover:bg-bs-bg rounded-full transition-colors relative w-[40px] h-[40px]"
            >
              <ChatIcon />
              <span className="absolute -top-[2px] -right-[2px] min-w-[17px] h-[17px] px-[3px] bg-bs-primary border border-white text-white text-[11px] font-[Poppins] rounded-[9px] flex items-center justify-center leading-[1.4]">
                2
              </span>
            </Link>

            {/* Profile */}
            <div
              ref={profileRef}
              className="relative flex items-center gap-[8px] ml-[12px] cursor-pointer"
              onClick={() => {
                setProfileOpen((v) => !v);
                setNotifyOpen(false);
              }}
            >
              <img
                src="/assets/images/profile.png"
                alt="Profile"
                className="w-[24px] h-[24px] rounded-full object-cover"
              />
              <div className="hidden md:flex items-center">
                <span className="text-[16px] font-normal text-bs-muted font-[Poppins]">
                  Dylan Field
                </span>
                <div className="ml-[8px] mt-[-3px]">
                  <ChevronDown />
                </div>
              </div>
              <ProfileDropdown open={profileOpen} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
