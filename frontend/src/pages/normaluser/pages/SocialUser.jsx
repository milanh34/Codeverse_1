import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SocialCard from "../../ngouser/components/socialmedia/SocialCard";
import CreatePostDialog from "../../ngouser/components/socialmedia/CreatePostDialog";
import { PostSuccessMessage } from "../../ngouser/components/socialmedia/PostSuccessMessage";
import { toast } from "react-hot-toast";

// Static mock data
const mockPosts = [
  {
    id: 1,
    author: {
      name: "Green Earth NGO",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=1",
    },
    content:
      "Just completed our tree plantation drive! 🌳 Over 1000 saplings planted today.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      },
    ],
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
  // ... add more mock posts as needed ...
];

const SocialUser = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [posts, setPosts] = useState(mockPosts);

  const handleCreatePost = (postData) => {
    if (!postData.caption.trim()) {
      toast.error("Caption is required");
      return;
    }

    // Create new mock post
    const newPost = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=current",
      },
      content: postData.caption,
      media:
        postData.media?.map((file) => ({
          type: file.type.startsWith("video/") ? "video" : "image",
          url: URL.createObjectURL(file),
        })) || [],
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setShowSuccessMessage(true);
    setIsCreatePostOpen(false);
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
            maxOpacity={1}
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
                {posts.map((post) => (
                  <SocialCard key={post.id} post={post} />
                ))}
              </div>

              <CreatePostDialog
                open={isCreatePostOpen}
                onOpenChange={setIsCreatePostOpen}
                onPost={handleCreatePost}
                isLoading={false}
              />
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <PostSuccessMessage onClose={() => setShowSuccessMessage(false)} />
      )}
    </div>
  );
};

export default SocialUser;
