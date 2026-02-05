"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";

interface CommentItemProps {
  id?: number;
  author: string;
  content: string;
  timeAgo: string;
  avatar?: string;
  avatarColor?: string;
  isReply?: boolean;
  replies?: any[];
  onReplyClick?: () => void;
}

export default function CommentItem({
                                      id,
                                      author,
                                      content,
                                      timeAgo,
                                      avatar,
                                      avatarColor = "#ABABAB",
                                      isReply = false,
                                      replies = [],
                                      onReplyClick
                                    }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true);
  const initial = author.charAt(0).toUpperCase();
  const t = useTranslations("blog")

  return (
    <div className={`flex gap-4 ${isReply ? "ml-12 mt-4" : "border-b pb-4"}`}>
      <div className="flex-shrink-0">
        {avatar ? (
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              src={avatar}
              alt={`Avatar de ${author}`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white`}
            style={{backgroundColor: avatarColor}}
          >
            {initial}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">{author}</h4>
            <p className="text-sm text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <p className="mt-2 text-gray-700">{content}</p>
        {!isReply && (
          <button
            type="button"
            className="mt-2 text-blue-600 hover:underline text-sm"
            onClick={onReplyClick}
          >
            {t("comments.reply")}
          </button>
        )}

        {replies.length > 0 && (
          <div className="mt-4">
            {showReplies ? (
              <>
                {replies.map((reply, index) => (
                  <CommentItem
                    key={index}
                    id={reply.id}
                    author={reply.author}
                    content={reply.content}
                    timeAgo={reply.timeAgo}
                    avatar={reply.avatar}
                    avatarColor={reply.avatarColor}
                    isReply={true}
                    onReplyClick={reply.onReplyClick}
                  />
                ))}
                {replies.length > 1 && (
                  <button
                    type="button"
                    className="mt-2 text-sm text-gray-500 hover:underline"
                    onClick={() => setShowReplies(false)}
                  >
                    {t("comments.hide_comments")}
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                className="mt-2 text-sm text-gray-500 hover:underline"
                onClick={() => setShowReplies(true)}
              >
                {t("comments.show", {
                  count: replies.length
                })}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
