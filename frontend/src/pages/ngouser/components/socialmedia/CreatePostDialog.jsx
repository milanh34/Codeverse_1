import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Video, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { PostSuccessMessage } from "./PostSuccessMessage";

const CreatePostDialog = ({ open, onOpenChange, onPost }) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      toast.error("Please upload an image or video file");
      return;
    }

    setMedia({
      type: isVideo ? "video" : "image",
      file,
      preview: URL.createObjectURL(file)
    });
  };

  const handleSubmit = async () => {
    if (!content.trim() && !media) return;
    setIsLoading(true);

    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPost = {
        id: Date.now(),
        author: {
          name: "Current User",
          avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=current"
        },
        content,
        media: media ? {
          type: media.type,
          url: media.preview
        } : null,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: []
      };

      handlePost(newPost);
      resetForm();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = (postData) => {
    onPost(postData);
    setShowSuccess(true);
  };

  const resetForm = () => {
    setContent("");
    setMedia(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg bg-white border-0 shadow-xl shadow-[#166856]/10">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-[#0d3320] font-semibold text-xl">
              Create Post
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]/20 placeholder:text-[#166856]/50"
            />

            {/* Media Upload Area */}
            {!media ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-[#166856]/30 rounded-xl p-8 text-center hover:bg-[#166856]/5 transition-colors cursor-pointer hover:border-[#166856]/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-[#166856]" />
                <p className="text-sm text-[#166856] font-medium">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-[#166856]/60 mt-1">
                  Supports images and videos
                </p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 
                text-white rounded-full z-10"
                  onClick={() => setMedia(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                {media.type === "image" ? (
                  <img
                    src={media.preview}
                    alt="Upload preview"
                    className="w-full max-h-[300px] object-cover rounded-xl"
                  />
                ) : (
                  <video
                    src={media.preview}
                    controls
                    className="w-full max-h-[300px] rounded-xl"
                  />
                )}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFile(e.target.files[0])}
              accept="image/*,video/*"
              className="hidden"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
                className="border-[#166856]/30 text-[#166856] hover:bg-[#166856]/5 hover:border-[#166856]/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || (!content.trim() && !media)}
                className="bg-[#166856] text-white hover:bg-[#0d3320]"
              >
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {showSuccess && (
        <PostSuccessMessage onClose={() => setShowSuccess(false)} />
      )}
    </>
  );
};

export default CreatePostDialog;
