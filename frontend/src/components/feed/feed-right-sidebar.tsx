import { BsIcon } from "@/components/ui/bs-icons";
import { BsButton, BsInput } from "@/components/ui/bs-shared";
import Link from "next/link";
import { getSuggestedPeople } from "@/services/user.actions";
import { friends } from "@/data/mock-data";
import { UserProfileImage } from "@/components/ui/user-profile-image";

export async function FeedRightSidebar() {
  // const suggestedPeople = await getSuggestedPeople("SUGGESTED");
  const youMightLike = await getSuggestedPeople("YOU_MIGHT_LIKE");

  return (
    <aside className="hidden xl:flex flex-col gap-[16px] w-full max-w-[320px]">
      {/* ── You Might Like Card ── */}
      {youMightLike.length > 0 && (
        <div className="bg-white dark:bg-bs-dark1 rounded-[6px] p-[24px] border border-bs-bg dark:border-bs-dark2 transition-colors mb-[16px]">
          <div className="flex items-center justify-between mb-[24px]">
            <h4 className="text-bs-dark dark:text-bs-text font-semibold text-[18px] font-[Poppins]">You Might Like</h4>
            <Link href="#0" className="text-[12px] font-medium text-bs-primary hover:underline font-[Poppins]">See All</Link>
          </div>
          <div className="h-px bg-bs-bg dark:bg-bs-dark2 mb-[24px]" />
          
          <div className="space-y-[24px]">
            {youMightLike.map((person: any, i: number) => (
              <div key={i} className="space-y-[12px]">
                <div className="flex items-center gap-[12px]">
                  <UserProfileImage src={person.image} name={person.name} size={40} />
                  <div>
                    <h4 className="text-[14px] font-medium text-bs-dark dark:text-bs-text font-[Poppins] leading-[1.1]">{person.name}</h4>
                    <p className="text-[11px] font-light text-bs-muted font-[Poppins] leading-[1.4] mt-[4px]">{person.position || person.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-[8px]">
                  <BsButton variant="outline" className="_bs_suggested_btn_outline flex-1 py-[10px] text-[12px] font-medium rounded-[2px] h-[36px]">Ignore</BsButton>
                  <BsButton variant="primary" className="flex-1 py-[10px] text-[12px] font-medium rounded-[2px] h-[36px]">Follow</BsButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Suggested People Card ── */}
      {/* {suggestedPeople.length > 0 && (
        <div className="bg-white dark:bg-bs-dark1 rounded-[6px] p-[24px] mb-[16px] border border-bs-bg dark:border-bs-dark2 transition-colors">
          <div className="flex items-center justify-between mb-[24px]">
            <h4 className="text-bs-dark dark:text-bs-text font-semibold text-[18px] font-[Poppins]">Suggested People</h4>
            <Link href="#0" className="text-[12px] font-medium text-bs-primary hover:underline font-[Poppins]">See All</Link>
          </div>
          <div className="h-px bg-bs-bg dark:bg-bs-dark2 mb-[24px]" />
          
          <div className="space-y-[24px]">
            {suggestedPeople.slice(0, 3).map((person: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-[12px]">
                  <UserProfileImage src={person.image} name={person.name} size={36} />
                  <div>
                    <h4 className="text-[13px] font-medium text-bs-dark dark:text-bs-text font-[Poppins] leading-tight">{person.name}</h4>
                    <p className="text-[10px] text-bs-muted font-[Poppins] mt-0.5">{person.position || "Member"}</p>
                  </div>
                </div>
                <button className="text-bs-primary font-medium text-[12px] hover:underline">Connect</button>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* ── Your Friends Card ── */}
      <div className="bg-white dark:bg-bs-dark1 rounded-[6px] p-[24px] border border-bs-bg dark:border-bs-dark2 transition-colors flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-[24px]">
          <h4 className="text-bs-dark dark:text-bs-text font-semibold text-[18px] font-[Poppins]">Your Friends</h4>
          <Link href="#0" className="text-[12px] font-medium text-bs-primary hover:underline font-[Poppins]">See All</Link>
        </div>
        
        <div className="relative mb-[24px]">
          <BsInput 
            placeholder="input search text" 
            className="pl-[36px] h-[36px] rounded-[4px] text-[13px]"
          />
          <div className="absolute left-[12px] top-1/2 -translate-y-1/2 text-bs-muted">
            <BsIcon name="search" size={14} />
          </div>
        </div>

        <div className="space-y-8 overflow-y-auto pr-1 -mr-1 scrollbar-hide pt-2">
          {friends.map((friend, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-[12px]">
                <div className="relative">
                   <img src={friend.img} alt={friend.name} className="w-[45px] h-[45px] rounded-full object-cover shrink-0 border border-bs-bg dark:border-bs-dark2" />
                   {friend.active && (
                     <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-bs-green border-2 border-white dark:border-bs-dark1 rounded-full" />
                   )}
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[14px] font-medium text-bs-dark dark:text-bs-text font-[Poppins] group-hover:text-bs-primary transition-colors leading-[1.1]">{friend.name}</h4>
                  <p className="text-[11px] font-light text-bs-muted font-[Poppins] ">{friend.role}</p>
                </div>
              </div>
              <div className="text-[10px] text-bs-muted font-[Poppins] opacity-60 shrink-0">
                {friend.lastSeen || ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
