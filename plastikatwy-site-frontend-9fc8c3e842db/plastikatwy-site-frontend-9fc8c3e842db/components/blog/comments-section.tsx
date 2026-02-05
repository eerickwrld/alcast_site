"use client";

import {useState, useEffect} from "react";
import CommentItem from "./comment-item";
import {getPostComments, postComment} from "@/services/api";
import {toast} from "@/components/ui/use-toast";
import {useFormatter, useTranslations} from "next-intl";

interface Comment {
  id: number;
  post_id: number;
  parent_id: number | null;
  name: string;
  email: string;
  message: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  avatar: string;
  replies?: Comment[];
}

interface CommentsSectionProps {
  postId: number | string;
}

export default function CommentsSection({postId}: CommentsSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const format = useFormatter();
  const t = useTranslations("blog")
  const tc = useTranslations("common")

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const commentData = await getPostComments(postId);
      setComments(commentData || []);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os comentários",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date: string) => {
    const dateTime = new Date(date);
    const now = new Date();

    return format.relativeTime(dateTime, now);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !comment) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);

      const commentData = {
        name,
        email,
        message: comment,
        parent_id: replyingTo
      };

      await postComment(postId, commentData);

      // Limpar o formulário
      setComment("");
      setReplyingTo(null);

      // Recarregar comentários para mostrar o novo comentário
      await fetchComments();

      toast({
        title: "Sucesso",
        description: "Seu comentário foi enviado com sucesso!",
        variant: "default"
      });
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar seu comentário",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(commentId);
    // Focar no campo de comentário
    document.getElementById("comment-textarea")?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  return (
    <div className="">
      <h2 className="text-xl text-foreground font-bold mb-4">{t("comments.title")}</h2>

      {/* Lista de comentários */}
      <div className="space-y-6 mb-8">
        {loading ? (
          <p>{t("comments.loading")}</p>
        ) : comments.length === 0 ? (
          <p>{t("comments.empty")}</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <CommentItem
                id={comment.id}
                author={comment.name}
                content={comment.message}
                timeAgo={formatTimeAgo(comment.created_at)}
                avatar={comment.avatar}
                onReplyClick={() => handleReplyClick(comment.id)}
                replies={comment.replies?.map(reply => ({
                  id: reply.id,
                  author: reply.name,
                  content: reply.message,
                  timeAgo: formatTimeAgo(reply.created_at),
                  avatar: reply.avatar,
                  onReplyClick: () => handleReplyClick(reply.id)
                }))}
              />
            </div>
          ))
        )}
      </div>

      {/* Formulário de comentários */}
      <form onSubmit={handleSubmit}>
        {replyingTo && (
          <div className="mb-3 p-2 bg-white text-foreground border border-gray-200 rounded-md flex items-center justify-between">
            <span className="text-sm">
              {tc("answeringTo", {
                name: comments.find(c => c.id === replyingTo)?.name || comments.flatMap(c => c.replies || []).find(r => r.id === replyingTo)?.name
              })}
            </span>
            <button
              type="button"
              className="text-gray-500 text-sm hover:text-gray-700"
              onClick={cancelReply}
            >
              {tc("cancel")}
            </button>
          </div>
        )}

        <textarea
          id="comment-textarea"
          className="w-full p-4 border border-gray-200 text-foreground rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder={t("comments.input")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            className="p-3 border border-gray-200 text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("comments.name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="p-3 border border-gray-200 text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("comments.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#1A408A] text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={submitting}
          >
            {submitting ? t("comments.buttonLoading") : t("comments.button")}
          </button>
        </div>
      </form>
    </div>
  );
}
