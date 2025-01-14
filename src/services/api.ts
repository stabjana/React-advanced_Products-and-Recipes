import axios from "axios";
import { Recipe } from "../types/recipe";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getRecipe = async (id: number): Promise<Recipe> => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
}; 