export interface Comment {
  id: number;
  author: string;
  authorImg: string;
  content: string;
  time: string;
  replies?: Comment[];
}

export interface Post {
  id: number;
  author: string;
  authorImg: string;
  time: string;
  content?: string;
  title?: string;
  postImg?: string;
  likes: string;
  comments: Comment[];
  shares: string;
}

export const feedData: Post[] = [
  {
    id: 1,
    author: "Karim Saif",
    authorImg: "/assets/images/post_img.png",
    time: "5 minute ago",
    title: "-Healthy Tracking App",
    postImg: "/assets/images/timeline_img.png",
    likes: "9+",
    shares: "122",
    comments: [
      {
        id: 101,
        author: "Radovan SkillArena",
        authorImg: "/assets/images/txt_img.png",
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        time: "21m",
        replies: []
      }
    ]
  },
  {
    id: 2,
    author: "Radovan SkillArena",
    authorImg: "/assets/images/people2.png",
    time: "15 minute ago",
    content: "Just launched my new project! Super excited to share it with the community. #webdev #design",
    postImg: "/assets/images/feed_event1.png",
    likes: "45",
    shares: "12",
    comments: []
  },
  {
    id: 3,
    author: "Steve Jobs",
    authorImg: "/assets/images/people1.png",
    time: "1 hour ago",
    content: "Design is not just what it looks like and feels like. Design is how it works.",
    likes: "1.2k",
    shares: "450",
    comments: [
      {
        id: 301,
        author: "Dylan Field",
        authorImg: "/assets/images/people3.png",
        content: "Absolutely agree! Simplicity is the ultimate sophistication.",
        time: "45m",
        replies: [
          {
            id: 302,
            author: "Steve Jobs",
            authorImg: "/assets/images/people1.png",
            content: "Stay hungry, stay foolish.",
            time: "10m"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    author: "Karim Saif",
    authorImg: "/assets/images/post_img.png",
    time: "2 hours ago",
    content: "Working on some new illustrations for the BuddyScript platform. Stay tuned!",
    postImg: "/assets/images/timeline_img.png",
    likes: "88",
    shares: "5",
    comments: []
  }
];
