import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import CommentsDialog from "./CommentsDialog";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const SocialCard = ({ post }) => {
  const {
    id,
    author,
    content,
    media = [],
    timestamp,
    likes = 0,
    comments = [],
  } = post || {};

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [commentsState, setCommentsState] = useState(comments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleAddComment = (newComment) => {
    setCommentsState((prev) => [newComment, ...prev]);
  };

  return (
    <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-[#8df1e2]/20">
      {/* Author Header */}
      <div className="p-4 flex items-center space-x-4">
        <Avatar className="h-10 w-10 border-2 border-[#166856]/20">
          <AvatarImage src={author?.avatar} alt={author?.name} />
          <AvatarFallback className="bg-[#166856] text-[#8df1e2]">
            {author?.name?.substring(0, 2) || "NG"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-[#0d3320]">{author?.name}</p>
          <p className="text-sm text-[#166856]/70">
            {format(new Date(timestamp), "PPp")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-2">
        <p className="text-[#0d3320]">{content}</p>
      </div>

      {/* Media Section */}
      {Array.isArray(media) && media.length > 0 && (
        <div className="relative">
          {media[0].type === "video" ? (
            <video
              src={media[0].url}
              controls
              className="w-full max-h-[400px] object-cover"
            />
          ) : (
            <img
              src={media[0].url}
              alt="Post content"
              className="w-full max-h-[400px] object-cover"
            />
          )}
          {media.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
              +{media.length - 1} more
            </div>
          )}
        </div>
      )}

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 ${isLiked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLiked ? "liked" : "unliked"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              </motion.div>
            </AnimatePresence>
            <motion.span
              key={likesCount}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {likesCount}
            </motion.span>
          </Button>
        </motion.div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => setShowComments(true)}
        >
          <MessageCircle className="h-5 w-5" />
          {commentsState.length}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share className="h-5 w-5" />
        </Button>
      </div>

      {/* Comments Dialog */}
      <CommentsDialog
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        comments={commentsState}
        onAddComment={handleAddComment}
      />
    </Card>
  );
};

export default SocialCard;
