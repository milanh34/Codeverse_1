import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import CommentsDialog from "./CommentsDialog";
import { motion, AnimatePresence } from "framer-motion";

const SocialCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddComment = (newComment) => {
    setComments(prev => [newComment, ...prev]);
  };

  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300">
      <div className="p-4">
        {/* Author Section */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{post.author.name}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <p className="mb-4">{post.content}</p>

        {/* Media Section */}
        {post.media && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            {post.media.type === 'image' ? (
              <img
                src={post.media.url}
                alt="Post content"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={post.media.url}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`gap-2 ${isLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLiked ? 'liked' : 'unliked'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
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
            {comments.length}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Comments Dialog */}
      <CommentsDialog
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </Card>
  );
};

export default SocialCard;
