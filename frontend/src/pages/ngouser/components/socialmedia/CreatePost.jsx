import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CreatePost = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      alert("Please upload an image or video file");
      return;
    }

    setMedia({
      type: isVideo ? "video" : "image",
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async () => {
    if (!content.trim() && !media) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPost = {
        id: Date.now(),
        author: {
          name: "Current User", // Replace with actual user
          avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=current",
        },
        content,
        media: media
          ? {
              type: media.type,
              url: media.preview, // In real app, this would be the uploaded file URL
            }
          : null,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
      };

      onPost(newPost);
      setContent("");
      setMedia(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="mb-4 min-h-[100px] resize-none"
      />

      {media && (
        <div className="relative mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={() => setMedia(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          {media.type === "image" ? (
            <img
              src={media.preview}
              alt="Upload preview"
              className="rounded-lg max-h-[300px] w-full object-cover"
            />
          ) : (
            <video
              src={media.preview}
              controls
              className="rounded-lg max-h-[300px] w-full"
            />
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleMediaUpload}
          accept="image/*,video/*"
          className="hidden"
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
        >
          <Image className="h-4 w-4" />
          Image
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
        >
          <Video className="h-4 w-4" />
          Video
        </Button>

        <div className="ml-auto">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || (!content.trim() && !media)}
            className={cn("px-6", isLoading && "opacity-50 cursor-not-allowed")}
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;
