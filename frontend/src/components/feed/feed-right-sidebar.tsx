import Link from "next/link";

// ─── "You Might Like" People ──────────────────────────────────────────────
const suggestedPeople = [
  { name: "Radovan SkillArena", role: "Founder & CEO at Trophy", img: "/assets/images/Avatar.png" },
];

// ─── Friends list ─────────────────────────────────────────────────────────
const friends = [
  { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png", online: false, time: "5 minute ago" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "/assets/images/people2.png", online: true },
  { name: "Dylan Field", role: "CEO of Figma", img: "/assets/images/people3.png", online: true },
  { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png", online: false, time: "5 minute ago" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "/assets/images/people2.png", online: true },
  { name: "Dylan Field", role: "CEO of Figma", img: "/assets/images/people3.png", online: true },
  { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png", online: false, time: "5 minute ago" },
];

// ─── Online Status Dot ────────────────────────────────────────────────────
function OnlineDot() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" className="shrink-0">
      <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
    </svg>
  );
}

// ─── Search Icon ──────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg className="absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 17 17">
      <circle cx="7" cy="7" r="6" stroke="#666" />
      <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
    </svg>
  );
}

// ─── Right Sidebar Component ──────────────────────────────────────────────
export function FeedRightSidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-[16px] w-full">
      {/* ── You Might Like Card ── */}
      <div className="bg-white rounded-[6px] px-[24px] pt-[24px] pb-[24px] border border-bs-bg">
        <div className="flex items-center justify-between mb-[24px]">
          <h4 className="text-bs-dark font-semibold text-[18px] font-[Poppins]">You Might Like</h4>
          <Link href="#0" className="text-[13px] font-medium text-bs-primary hover:underline font-[Poppins]">See All</Link>
        </div>
        <hr className="border-bs-bg mb-[16px] -mx-[24px]" />

        {suggestedPeople.map((person) => (
          <div key={person.name}>
            <div className="flex items-center gap-[12px] mb-[16px]">
              <Link href="/profile">
                <img src={person.img} alt={person.name} className="w-[42px] h-[42px] rounded-full object-cover shrink-0" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href="/profile">
                  <h4 className="text-[14px] font-medium text-bs-dark font-[Poppins] hover:text-bs-primary transition-colors truncate">{person.name}</h4>
                </Link>
                <p className="text-[12px] text-bs-muted font-[Poppins] truncate">{person.role}</p>
              </div>
            </div>
            <div className="flex gap-[8px]">
              <button className="flex-1 py-[6px] border border-[#D9D9D9] rounded-[4px] text-[13px] text-bs-dark font-[Poppins] hover:bg-bs-bg transition-all">
                Ignore
              </button>
              <button className="flex-1 py-[6px] bg-bs-primary border border-bs-primary text-white rounded-[4px] text-[13px] font-[Poppins] hover:bg-[#1580E0] transition-all">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Your Friends Card ── */}
      <div className="bg-white rounded-[6px] px-[24px] pt-[24px] pb-[16px] border border-bs-bg">
        {/* Header */}
        <div className="flex items-center justify-between mb-[16px]">
          <h4 className="text-bs-dark font-semibold text-[18px] font-[Poppins]">Your Friends</h4>
          <Link href="#" className="text-[13px] font-medium text-bs-primary hover:underline font-[Poppins]">See All</Link>
        </div>

        {/* Search */}
        <div className="relative mb-[16px]">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search friends..."
            className="w-full h-[40px] bg-[#F2F4F7] border border-transparent rounded-[20px] pl-[36px] pr-[16px] text-[14px] font-[Poppins] text-bs-dark placeholder-[#666] focus:outline-none transition-all"
          />
        </div>

        {/* Friends List */}
        <div className="space-y-[16px] max-h-[400px] overflow-y-auto scrollbar-hide pt-[8px]">
          {friends.map((friend, i) => (
            <div
              key={i}
              className={`flex items-center justify-between ${friend.online ? "opacity-100" : "opacity-[0.85]"}`}
            >
              <div className="flex items-center gap-[12px]">
                <Link href="/profile" className="relative shrink-0">
                  <img src={friend.img} alt={friend.name} className="w-[42px] h-[42px] rounded-full object-cover border-[2.5px] border-transparent hover:border-bs-primary transition-all" />
                </Link>
                <div className="min-w-0">
                  <Link href="/profile">
                    <h4 className="text-[14px] font-medium text-bs-dark font-[Poppins] hover:text-bs-primary transition-colors truncate">{friend.name}</h4>
                  </Link>
                  <p className="text-[12px] text-bs-muted font-[Poppins] truncate">{friend.role}</p>
                </div>
              </div>
              <div className="shrink-0 ml-2">
                {friend.online ? (
                  <OnlineDot />
                ) : (
                  <span className="text-[11px] text-bs-muted font-[Poppins] whitespace-nowrap">{friend.time}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
