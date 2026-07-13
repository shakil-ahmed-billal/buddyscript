import { prisma } from "../src/app/lib/prisma.js";

async function main() {
  console.log("Seeding database (Users and Posts only)...");

  // 1. Create Users (Suggested and Regular)
  const usersData = [
   {
      email: "steve@apple.com",
      name: "Steve Jobs",
      firstName: "Steve",
      lastName: "Jobs",
      image: "/assets/images/people1.png",
      position: "CEO of Apple",
      isSuggested: true,
      isYouMightLike: false,
      role: "USER"
    },
    {
      email: "ryan@linkedin.com",
      name: "Ryan Roslansky",
      firstName: "Ryan",
      lastName: "Roslansky",
      image: "/assets/images/people2.png",
      position: "CEO of Linkedin",
      isSuggested: false,
      isYouMightLike: true,
      role: "USER"
    },
    {
      email: "dylan@figma.com",
      name: "Dylan Field",
      firstName: "Dylan",
      lastName: "Field",
      image: "/assets/images/people3.png",
      position: "CEO of Figma",
      isSuggested: true,
      isYouMightLike: false,
      role: "USER"
    },
    {
      email: "radovan@trophy.com",
      name: "Radovan SkillArena",
      firstName: "Radovan",
      lastName: "SkillArena",
      image: "/assets/images/Avatar.png",
      position: "Founder & CEO at Trophy",
      isSuggested: true,
      isYouMightLike: false,
      role: "USER"
    },
    {
      email: "karim@example.com",
      name: "Karim Saif",
      firstName: "Karim",
      lastName: "Saif",
      image: "/assets/images/post_img.png",
      position: "Product Designer",
      isSuggested: false,
      isYouMightLike: false,
      role: "USER"
    }
  ];

  const createdUsers = [] as any[];
  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
    createdUsers.push(user);
    console.log(`User ${user.email} upserted.`);
  }

  // Helper to find user by email
  const getUser = (email: string) => createdUsers.find(u => u.email === email);

  // 2. Create Posts and Comments
  const postsData = [
    {
      email: "karim@example.com",
      title: "-Healthy Tracking App",
      content: "Check out my new health project!",
      image: "/assets/images/timeline_img.png",
      shares: 122,
      comments: [
          { email: "shakil@gmail.com", content: "This looks amazing! Can't wait to try it." },
          { email: "steve@apple.com", content: "Great focus on user experience." }
      ]
    },
    {
      email: "radovan@trophy.com",
      content: "Just launched my new project! Super excited to share it with the community. #webdev #design",
      image: "/assets/images/feed_event1.png",
      shares: 12,
      comments: [
          { email: "ryan@linkedin.com", content: "Congratulations on the launch!" }
      ]
    },
    {
      email: "steve@apple.com",
      content: "Design is not just what it looks like and feels like. Design is how it works.",
      shares: 450,
      comments: [
          { email: "dylan@figma.com", content: "Extremely true, Steve." },
          { email: "karim@example.com", content: "A timeless quote." }
      ]
    },
    {
      email: "karim@example.com",
      content: "Working on some new illustrations for the BuddyScript platform. Stay tuned!",
      image: "/assets/images/timeline_img.png",
      shares: 5,
      comments: []
    }
  ];

  for (const p of postsData) {
      const author = getUser(p.email);
      if(author) {
          const post = await prisma.post.create({
              data: {
                  title: p.title,
                  content: p.content,
                  image: p.image,
                  shares: p.shares,
                  authorId: author.id
              }
          });
          console.log(`Post for ${p.email} created.`);

          // Create Comments
          for (const c of p.comments) {
              const commenter = getUser(c.email);
              if (commenter) {
                  await prisma.comment.create({
                      data: {
                          content: c.content,
                          postId: post.id,
                          authorId: commenter.id
                      }
                  });
              }
          }
      }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
