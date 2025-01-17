import { Typography } from "@mui/material";

function Home() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Products & Recipes
      </Typography>
      <Typography variant="h4" gutterBottom>
        Our first attempt with TypeScript and React
      </Typography>
      <Typography variant="body1" component="p">
       Here we are learning to adapt our 2 days knowledge of Type Script to React.
       It is fun and nice. With MUI also nice looking.
       To see more just click on the Links in the Header to see the Products or the Recipe.
      </Typography>
    </>
  );  
}

export default Home;
