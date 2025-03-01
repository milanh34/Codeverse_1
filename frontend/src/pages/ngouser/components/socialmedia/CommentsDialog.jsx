import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const CommentItem = motion(({ comment }) => (
  <div className="flex gap-3 p-3 rounded-lg hover:bg-[#166856]/5 transition-colors">
    <Avatar className="h-8 w-8 ring-2 ring-[#166856]/20">
      <AvatarImage src={comment.avatar} />
      <AvatarFallback className="bg-[#166856] text-white">
        {comment.author[0]}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <p className="font-medium text-[#0d3320]">{comment.author}</p>
        <span className="text-xs text-[#166856]/60">
          {/* {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })} */}
        </span>
      </div>
      <p className="text-[#166856] mt-1">{comment.content}</p>
    </div>
  </div>
));

const CommentsDialog = ({
  isOpen,
  onClose,
  comments: initialComments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "Current User",
      content: newComment,
      timestamp: new Date().toISOString(),
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=current",
    };

    setComments((prev) => [comment, ...prev]);
    onAddComment?.(comment);
    setNewComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-0">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ScrollArea className="h-[60vh] pr-4">
            <AnimatePresence initial={false}>
              {comments.map((comment, index) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    delay: index * 0.05,
                  }}
                />
              ))}
            </AnimatePresence>
          </ScrollArea>

          <form
            onSubmit={handleSubmitComment}
            className="flex gap-2 sticky bottom-0 bg-white p-4 -mx-4 -mb-4 border-t"
          >
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-full border-[#166856]/20 focus:border-[#166856]
                focus:ring-1 focus:ring-[#166856]/20"
            />
            <Button
              type="submit"
              className="rounded-full bg-[#166856] text-white hover:bg-[#0d3320]"
            >
              Post
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
