import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { IconButtonRound } from '@/components/atoms/IconButtonRound';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { recipeService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface Like {
  id: number;
  autorId: number;
  receitaId: number;
  dataCurtida: string;
}

interface RecipeActionsProps {
  recipeId: number;
  likes: number;
  comments: number;
  saves: number;
  onLike?: () => void;
  onComment?: () => void;
  onSave?: () => void;
  onLikeSuccess?: () => void;
}

export const RecipeActions = ({
  recipeId,
  likes,
  comments,
  saves,
  onLike,
  onComment,
  onSave,
  onLikeSuccess,
}: RecipeActionsProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [loadingLikes, setLoadingLikes] = useState(false);
  const { userId } = useAuth();

  const fetchLikes = useCallback(async () => {
    setLoadingLikes(true);
    try {
      const result = await recipeService.getLikes(recipeId);
      setLikeCount(result.count);

      if (result.likes && userId) {
        const userLiked = result.likes.some((like: Like) => like.autorId === userId);
        setLiked(userLiked);
      }
    } catch (err) {
      console.error('Erro ao carregar curtidas:', err);
    } finally {
      setLoadingLikes(false);
    }
  }, [recipeId, userId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLike = async () => {
    if (liked) {
      return;
    }

    setLiked(true);
    onLike?.();
    setIsLiking(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await fetchLikes();
      onLikeSuccess?.();
    } finally {
      setIsLiking(false);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-1">
        <IconButtonRound
          icon={Heart}
          onClick={handleLike}
          disabled={isLiking}
          className={cn(
            'bg-card hover:bg-accent disabled:opacity-50',
            liked && 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
          aria-label="Curtir receita"
        />
        <span className="text-xs font-medium text-muted-foreground">{loadingLikes ? '...' : likeCount}</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <IconButtonRound
          icon={MessageCircle}
          onClick={onComment}
          className="bg-card hover:bg-accent"
          aria-label="Comentar receita"
        />
        <span className="text-xs font-medium text-muted-foreground">{comments}</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <IconButtonRound
          icon={Bookmark}
          onClick={handleSave}
          className={cn('bg-card hover:bg-accent', saved && 'bg-primary text-primary-foreground hover:bg-primary/90')}
          aria-label="Salvar receita"
        />
        <span className="text-xs font-medium text-muted-foreground">{saves}</span>
      </div>
    </div>
  );
};
