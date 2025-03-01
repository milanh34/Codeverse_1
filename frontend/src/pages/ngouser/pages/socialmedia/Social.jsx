import React, { useState, useRef, useCallback } from "react";
import SocialCard from "../../components/socialmedia/SocialCard";
import CreatePostDialog from "../../components/socialmedia/CreatePostDialog";
import { Button } from "@/components/ui/button";  // Updated import
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";  // Added import
import { Card } from "@/components/ui/card";  // Added import
import { FlickeringGrid } from "@/components/magicui/flickering-grid";  // Added import

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Green Earth NGO",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=1",
    },
    content: "Just completed our tree plantation drive! 🌳 Over 1000 saplings planted today.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    },
    timestamp: new Date().toISOString(),
    likes: 242,
    comments: [
      {
        id: 1,
        author: "John Doe",
        content: "Amazing work! Keep it up! 👏",
        timestamp: new Date().toISOString(),
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=john",
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Education First",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=2",
    },
    content: "Successfully completed our rural education program! 📚 Reached 500+ students this month.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 189,
    comments: [],
  },
  {
    id: 3,
    author: {
      name: "HealthCare NGO",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=3",
    },
    content: "Free medical camp organized in remote villages. Provided healthcare services to over 1000 people! 🏥",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1584982751601-97dcc096659c",
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 156,
    comments: [],
  },
  {
    id: 4,
    author: {
      name: "Clean Ocean Initiative",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=4",
    },
    content: "Beach cleanup drive was a huge success! 🌊 Collected over 500kg of plastic waste.",
    media: {
      type: "video",
      url: "https://player.vimeo.com/external/373239795.sd.mp4?s=e8c3488d0f8b14804304f8c225e3565f754f8a00&profile_id=164&oauth2_token_id=57447761",
    },
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    likes: 324,
    comments: [],
  },
  {
    id: 5,
    author: {
      name: "Animal Welfare Society",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=5",
    },
    content: "Meet our newest rescue! 🐕 This little guy is looking for his forever home.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1",
    },
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    likes: 428,
    comments: [],
  },
  {
    id: 6,
    author: {
      name: "Youth Empowerment Foundation",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=6",
    },
    content: "Skill development workshop in progress! 💪 Teaching valuable job skills to 100+ young minds.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    },
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    likes: 167,
    comments: [],
  },
  {
    id: 7,
    author: {
      name: "Rural Development Trust",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=7",
    },
    content: "New water well project completed! 💧 Providing clean water access to over 200 families.",
    media: {
      type: "video",
      url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35132bcf373&profile_id=164&oauth2_token_id=57447761",
    },
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    likes: 293,
    comments: [],
  },
  {
    id: 8,
    author: {
      name: "Women Empowerment Coalition",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=8",
    },
    content: "Celebrating the success of our women entrepreneurs! 👩‍💼 50 small businesses launched this quarter.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
    },
    timestamp: new Date(Date.now() - 25200000).toISOString(),
    likes: 245,
    comments: [],
  }
];

const Social = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastPostRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMorePosts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add more mock posts...
      setHasMore(posts.length < 30); // Example limit
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#166856]/5 to-white/80">
      {/* Background Container */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0">
          <FlickeringGrid
            className="w-full h-full [mask-image:radial-gradient(70%_50%_at_center,white,transparent)]"
            squareSize={4}
            gridGap={6}
            color="#166856"
            maxOpacity={1} // Increased from 0.25 to 0.4
            flickerChance={0.05}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Card className="min-h-screen bg-white/30 backdrop-blur-[2px]">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="max-w-xl mx-auto p-4">
              {/* Create Post Button */}
              <Button 
                onClick={() => setIsCreatePostOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full 
                bg-gradient-to-r from-[#166856] to-[#0d3320] hover:opacity-90
                text-white border border-[#8df1e2]/20 z-50
                shadow-lg shadow-[#166856]/20 hover:shadow-xl
                transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-6 w-6" />
              </Button>

              {/* Posts Feed */}
              <div className="space-y-4 pb-20">
                {posts.map((post, index) => (
                  <div
                    key={post.id}
                    ref={index === posts.length - 1 ? lastPostRef : null}
                  >
                    <SocialCard post={post} />
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#166856]" />
                  </div>
                )}
              </div>

              <CreatePostDialog
                open={isCreatePostOpen}
                onOpenChange={setIsCreatePostOpen}
                onPost={(newPost) => {
                  setPosts(prev => [newPost, ...prev]);
                  setIsCreatePostOpen(false);
                }}
              />
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default Social;
