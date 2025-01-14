import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../services/api";
import { Recipe as RecipeType } from "../types/recipe";

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipe(Number(id));
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!recipe) return <Typography>Recipe not found</Typography>;

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        // TODO: Add image
        // image={recipe.image}
        // alt={recipe.name}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {/* TODO: Add name */}
          {/* {recipe.name} */}
        </Typography>
        {/* TODO: Add more recipe details here */}
      </CardContent>
    </Card>
  );
}

export default Recipe;
