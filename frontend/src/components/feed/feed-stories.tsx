"use client";

// ─── Story data ───────────────────────────────────────────────────────────
const stories = [
  { img: "/assets/images/card_ppl2.png", name: "Ryan Roslansky", mini: "/assets/images/mini_pic.png" },
  { img: "/assets/images/card_ppl3.png", name: "Steve Jobs", mini: "/assets/images/mini_pic.png" },
  { img: "/assets/images/card_ppl4.png", name: "Dylan Field", mini: "/assets/images/mini_pic.png" },
];

// ─── Desktop Stories ──────────────────────────────────────────────────────
export function FeedStories() {
  return (
    <div className="mb-6 rounded-[6px] bg-white overflow-hidden border border-bs-bg">
      {/* Desktop view */}
      <div className="hidden md:flex flex-row justify-between w-full h-[224px]">
        {/* "Your Story" card */}
        <div className="relative w-[152px] h-full cursor-pointer group rounded-[6px] overflow-hidden ml-0">
          <div className="h-full w-full overflow-hidden">
            <img
              src="/assets/images/card_ppl1.png"
              alt="Your Story"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Subtle overlay to make bottom content pop */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 w-full bg-bs-dark rounded-t-[25px] pt-[20px] pb-[10px] z-10">
            <p className="text-white text-[12px] font-[Poppins] font-medium text-center">Your Story</p>
          </div>
          
          {/* Add button - adjusted to be between image and dark footer */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[35px] w-[32px] h-[32px] rounded-full bg-bs-primary border-[3px] border-white flex items-center justify-center z-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
              <path stroke="#fff" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
            </svg>
          </div>
        </div>

        {/* Other stories */}
        {stories.map((story, i) => (
          <div key={i} className="relative w-[152px] h-full cursor-pointer group rounded-[6px] overflow-hidden ml-3">
            <img
              src={story.img}
              alt={story.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            {/* Mini avatar (Bottom-Right as per design) */}
            <div className="absolute bottom-[44px] right-[14px] z-10">
              <img
                src={story.mini}
                alt=""
                className="w-[28px] h-[28px] rounded-full border-2 border-white object-cover"
              />
            </div>
            
            <p className="absolute bottom-[14px] left-0 right-0 text-center text-white text-[13px] font-medium font-[Poppins] truncate px-3">
              {story.name}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile scrollable list */}
      <div className="md:hidden flex gap-4 overflow-x-auto py-4 scrollbar-hide px-1">
        {/* Your Story */}
        <a href="#0" className="flex flex-col items-center gap-[6px] shrink-0">
          <div className="relative w-[58px] h-[58px] rounded-full overflow-visible">
            <img src="/assets/images/mobile_story_img.png" alt="Your Story" className="w-[58px] h-[58px] rounded-full object-cover shrink-0" />
            <div className="absolute bottom-1px right-1px w-[20px] h-[20px] bg-bs-primary rounded-full border-[2.5px] border-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" viewBox="0 0 12 12">
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 2.5v7M2.5 6h7" />
              </svg>
            </div>
          </div>
          <p className="text-[12px] text-bs-dark font-medium">Your Story</p>
        </a>

        {/* Mobile Other Stories */}
        {[
          { img: "/assets/images/mobile_story_img1.png", name: "Ryan...", border: true },
          { img: "/assets/images/mobile_story_img2.png", name: "Ryan...", border: false },
          { img: "/assets/images/mobile_story_img1.png", name: "Dylan...", border: true },
        ].map((story, i) => (
          <a key={i} href="#0" className="flex flex-col items-center gap-[6px] shrink-0">
            <div className={`w-[58px] h-[58px] rounded-full p-[2px] ${story.border ? 'border-2 border-bs-primary' : 'border-2 border-[#D9D9D9]'}`}>
              <img src={story.img} alt="" className="w-full h-full rounded-full object-cover shrink-0" />
            </div>
            <p className="text-[12px] text-bs-muted font-normal">{story.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
