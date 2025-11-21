import { Clock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MealBadge } from '@/components/atoms/MealBadge';
import { Recipe } from '@/types/recipe';
import { motion } from 'framer-motion';

interface RecipeCardProps {
  recipe: Recipe;
  direction?: 'up' | 'down';
}

export const RecipeCard = ({ recipe, direction = 'down' }: RecipeCardProps) => {
  const variants = {
    initial: (direction: string) => ({
      y: direction === 'down' ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      y: direction === 'down' ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full max-w-lg"
    >
      <Card className="rounded-3xl shadow-2xl overflow-hidden">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src={recipe.authorAvatarUrl} alt={recipe.authorName} />
                <AvatarFallback>{recipe.authorName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{recipe.authorName}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{recipe.createdAtRelative}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <img src={recipe.imageUrl} alt={recipe.title} className="h-full w-full object-cover" />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4 p-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">{recipe.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{recipe.description}</p>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Ver Receita Completa</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
