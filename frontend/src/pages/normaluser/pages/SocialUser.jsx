import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SocialCard from "../../ngouser/components/socialmedia/SocialCard";
import CreatePostDialog from "../../ngouser/components/socialmedia/CreatePostDialog";
import { PostSuccessMessage } from "../../ngouser/components/socialmedia/PostSuccessMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";
import { toast } from "react-hot-toast";

const SocialUser = () => {
  const queryClient = useQueryClient();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Fetch all NGO posts
  const {
    data: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["fetchAllNgoPosts"],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/user/ngo-posts`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.posts;
    },
  });

  // Create post mutation for normal users
  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: async (formData) => {
      const form = new FormData();
      form.append("caption", formData.caption);

      if (formData.media?.length > 0) {
        formData.media.forEach((file) => {
          form.append("media", file);
        });
      }

      const response = await fetch(`${SERVER}/api/user/post/new`, {
        // Changed endpoint
        method: "POST",
        credentials: "include",
        body: form,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: () => {
      setShowSuccessMessage(true);
      queryClient.invalidateQueries({ queryKey: ["fetchAllNgoPosts"] });
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
        timestamp: comment.createdAt,
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
                    No posts available.
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

      {/* Success Message */}
      {showSuccessMessage && (
        <PostSuccessMessage onClose={() => setShowSuccessMessage(false)} />
      )}
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

export default SocialUser;
