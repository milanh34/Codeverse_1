import React, { useState, useRef, useCallback } from "react";
import SocialCard from "../../components/socialmedia/SocialCard";
import CreatePostDialog from "../../components/socialmedia/CreatePostDialog";
import { Button } from "@/components/ui/button"; // Updated import
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"; // Added import
import { Card } from "@/components/ui/card"; // Added import
import { FlickeringGrid } from "@/components/magicui/flickering-grid"; // Added import
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";
import { toast } from "react-hot-toast";

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Green Earth NGO",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=1",
    },
    content:
      "Just completed our tree plantation drive! 🌳 Over 1000 saplings planted today.",
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
    content:
      "Successfully completed our rural education program! 📚 Reached 500+ students this month.",
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
    content:
      "Free medical camp organized in remote villages. Provided healthcare services to over 1000 people! 🏥",
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
    content:
      "Beach cleanup drive was a huge success! 🌊 Collected over 500kg of plastic waste.",
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
    content:
      "Meet our newest rescue! 🐕 This little guy is looking for his forever home.",
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
    content:
      "Skill development workshop in progress! 💪 Teaching valuable job skills to 100+ young minds.",
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
    content:
      "New water well project completed! 💧 Providing clean water access to over 200 families.",
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
    content:
      "Celebrating the success of our women entrepreneurs! 👩‍💼 50 small businesses launched this quarter.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
    },
    timestamp: new Date(Date.now() - 25200000).toISOString(),
    likes: 245,
    comments: [],
  },
];

const Social = () => {
  const queryClient = useQueryClient();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Fetch NGO's posts
  const {
    data: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["fetchMyPosts"],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/ngo/posts`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.posts;
    },
  });

  console.log(posts);

  // Create post mutation
  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: async (formData) => {
      const form = new FormData();
      form.append("caption", formData.caption);

      if (formData.media?.length > 0) {
        formData.media.forEach((file) => {
          form.append("media", file);
        });
      }

      const response = await fetch(`${SERVER}/api/ngo/post/new`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["fetchMyPosts"] });
      setIsCreatePostOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
    },
  });

  const handleCreatePost = (postData) => {
    if (!postData.caption.trim()) {
      toast.error("Caption is required");
      return;
    }
    createPost(postData);
  };

  const transformPost = (post) => ({
    id: post._id,
    author: {
      name: post.ngo?.name || "Unknown NGO",
      avatar: post.ngo?.profile_image || "",
    },
    content: post.caption,
    media:
      post.media?.map((url) => ({
        type: url.toLowerCase().endsWith(".mp4") ? "video" : "image",
        url,
      })) || [],
    timestamp: post.createdAt,
    likes: post.likesCount || 0,
    comments:
      post.comments?.map((comment) => ({
        id: comment.user._id,
        author: comment.user?.name || "Unknown User",
        content: comment.comment,
        timestamp: comment.createdAt || null,
        avatar: comment.user?.profile_image || "",
      })) || [],
  });

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
                {isPostsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                      <PostSkeleton key={n} />
                    ))}
                  </div>
                ) : postsError ? (
                  <div className="text-center py-8 text-red-500">
                    {postsError.message || "Failed to load posts"}
                  </div>
                ) : posts?.length > 0 ? (
                  posts.map((post) => (
                    <SocialCard key={post._id} post={transformPost(post)} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No posts yet. Create your first post!
                  </div>
                )}
              </div>

              <CreatePostDialog
                open={isCreatePostOpen}
                onOpenChange={setIsCreatePostOpen}
                onPost={handleCreatePost}
                isLoading={isCreatingPost}
              />
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

// Post loading skeleton component
const PostSkeleton = () => (
  <Card className="p-4">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full bg-[#166856]/20 animate-pulse" />
      <div className="space-y-2 flex-1">
        <div className="h-4 w-1/4 bg-[#166856]/20 rounded animate-pulse" />
        <div className="h-3 w-1/3 bg-[#166856]/20 rounded animate-pulse" />
      </div>
    </div>
    <div className="mt-4 h-48 bg-[#166856]/10 rounded animate-pulse" />
  </Card>
);

export default Social;
