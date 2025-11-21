import { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { RecipeCard } from '@/components/organisms/RecipeCard';
import { RecipeActions } from '@/components/molecules/RecipeActions';
import { FeedNavButtons } from '@/components/molecules/FeedNavButtons';
import { recipes as mockRecipes } from '@/data/recipes';
import { AnimatePresence } from 'framer-motion';
import { recipeService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import type { Recipe } from '@/types/recipe';

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { token, isAuthenticated } = useAuth();
  const [likedRecipes, setLikedRecipes] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await recipeService.getRecipes(1, 30);

        const transformedRecipes = response.data.map((recipe, index) => ({
          ...recipe,
          authorName: recipe.autor.nome,
          authorAvatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipe.autor.nome}`,
          mealType: 'Almoço' as const,
          createdAtRelative: `${index + 1}h atrás`,
          imageUrl: recipe.fotoUrl,
          title: recipe.titulo,
          description: recipe.descricao,
          slug: recipe.titulo.toLowerCase().replace(/\s+/g, '-'),
          likes: 0,
          comments: 0,
          saves: 0,
        }));

        setRecipes(transformedRecipes);
        setTotalPages(response.meta.totalPages);
        setCurrentPage(1);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar receitas:', err);
        setRecipes(mockRecipes as Recipe[]);
        setTotalPages(1);
        setCurrentPage(1);
        setError('Usando dados de demonstração');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const currentRecipe = recipes[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < recipes.length - 1;

  const loadMoreRecipes = useCallback(async () => {
    if (currentPage >= totalPages || loadingMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const response = await recipeService.getRecipes(nextPage, 30);

      const transformedRecipes = response.data.map((recipe, index) => ({
        ...recipe,
        authorName: recipe.autor.nome,
        authorAvatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipe.autor.nome}`,
        mealType: 'Almoço' as const,
        createdAtRelative: `${index + 1}h atrás`,
        imageUrl: recipe.fotoUrl,
        title: recipe.titulo,
        description: recipe.descricao,
        slug: recipe.titulo.toLowerCase().replace(/\s+/g, '-'),
        likes: 0,
        comments: 0,
        saves: 0,
      }));

      setRecipes((prev) => [...prev, ...transformedRecipes]);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error('Erro ao carregar mais receitas:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, totalPages, loadingMore]);

  const handleLikeRecipe = useCallback(
    async (recipeId: number) => {
      if (!isAuthenticated || !token) {
        alert('Você precisa estar logado para curtir uma receita');
        return;
      }

      if (likedRecipes.has(recipeId)) {
        alert('Você já curtiu esta receita');
        return;
      }

      try {
        const result = await recipeService.likeRecipe(recipeId, token);
        if (result.success) {
          setLikedRecipes((prev) => new Set([...prev, recipeId]));
        } else {
          alert(result.error || 'Erro ao curtir receita');
        }
      } catch (err) {
        console.error('Erro ao curtir receita:', err);
        alert('Erro ao curtir receita');
      }
    },
    [isAuthenticated, token, likedRecipes]
  );

  const goToPrevious = useCallback(() => {
    if (hasPrevious) {
      setDirection('up');
      setCurrentIndex((prev) => prev - 1);
    }
  }, [hasPrevious]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      setDirection('down');
      setCurrentIndex((prev) => prev + 1);
    } else if (currentPage < totalPages && !loadingMore) {
      loadMoreRecipes();
    }
  }, [hasNext, currentPage, totalPages, loadingMore, loadMoreRecipes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);

      isScrolling = true;

      if (e.deltaY > 0) {
        goToNext();
      } else if (e.deltaY < 0) {
        goToPrevious();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [goToPrevious, goToNext]);

  return (
    <MainLayout>
      <div className="relative flex items-center justify-center min-h-[calc(100vh-8rem)]">
        {loading ? (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Carregando receitas...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Nenhuma receita encontrada</p>
          </div>
        ) : (
          <>
            {/* Left Actions */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
              <RecipeActions
                recipeId={currentRecipe?.id || 0}
                likes={currentRecipe?.likes || 0}
                comments={currentRecipe?.comments || 0}
                saves={currentRecipe?.saves || 0}
                onLike={() => handleLikeRecipe(currentRecipe?.id || 0)}
              />
            </div>

            {/* Center Card */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                {currentRecipe && <RecipeCard key={currentRecipe.id} recipe={currentRecipe} direction={direction} />}
              </AnimatePresence>
            </div>

            {/* Right Navigation */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
              <FeedNavButtons onPrevious={goToPrevious} onNext={goToNext} hasPrevious={hasPrevious} hasNext={hasNext} />
            </div>

            {/* Mobile Actions */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10 lg:hidden">
              <div className="flex items-center gap-4 bg-card rounded-full shadow-lg p-2">
                <RecipeActions
                  recipeId={currentRecipe?.id || 0}
                  likes={currentRecipe?.likes || 0}
                  comments={currentRecipe?.comments || 0}
                  saves={currentRecipe?.saves || 0}
                  onLike={() => handleLikeRecipe(currentRecipe?.id || 0)}
                />
              </div>
            </div>
          </>
        )}

        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {!loading && recipes.length > 0 && !hasNext && currentPage >= totalPages && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            ✓ Você chegou ao final das receitas!
          </div>
        )}

        {loadingMore && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
            ⏳ Carregando mais receitas...
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Recipes;
