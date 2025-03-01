import React, { useState, useRef, useEffect } from "react";
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
import toast from "react-hot-toast";

const CreatePostDialog = ({ open, onOpenChange, onPost, isLoading }) => {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileChange({ target: { files } });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("Maximum 5 files allowed");
      return;
    }

    setMedia(files);

    // Create previews
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
    }));
    setPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPost({ caption, media });
  };

  // Cleanup previews when dialog closes
  useEffect(() => {
    if (!open) {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
      setCaption("");
      setMedia([]);
      setPreviews([]);
    }
  }, [open]);

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
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]/20 placeholder:text-[#166856]/50"
            />

            {/* Optional Media Upload Area */}
            {!media.length ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-[#166856]/30 rounded-xl p-8 text-center hover:bg-[#166856]/5 transition-colors cursor-pointer hover:border-[#166856]/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-[#166856]" />
                <p className="text-sm text-[#166856] font-medium">
                  Drop files here or click to upload (optional)
                </p>
                <p className="text-xs text-[#166856]/60 mt-1">
                  Supports images and videos (max 5 files)
                </p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 
                text-white rounded-full z-10"
                  onClick={() => setMedia([])}
                >
                  <X className="h-4 w-4" />
                </Button>
                {previews.map((preview, index) =>
                  preview.type === "image" ? (
                    <img
                      key={index}
                      src={preview.url}
                      alt="Upload preview"
                      className="w-full max-h-[300px] object-cover rounded-xl"
                    />
                  ) : (
                    <video
                      key={index}
                      src={preview.url}
                      controls
                      className="w-full max-h-[300px] rounded-xl"
                    />
                  )
                )}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
              multiple
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
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !caption.trim()}
                className="bg-[#166856] text-white hover:bg-[#0d3320]"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Creating...
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePostDialog;
