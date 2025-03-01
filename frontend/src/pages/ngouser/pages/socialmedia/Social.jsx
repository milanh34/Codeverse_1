import React from "react";
import SocialCard from "../../components/socialmedia/SocialCard";
import CreatePost from "../../components/socialmedia/CreatePost";
import Comment from "../../components/socialmedia/Comment";
const Social = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Social
      </h1>
      <div className="grid gap-4">{/* Add your social content here */}</div>
    </div>
  );
};

export default Social;
