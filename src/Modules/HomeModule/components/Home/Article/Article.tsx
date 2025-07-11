import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

interface Article {
  id: number;
  date: string;
  title: string;
  imageUrl: string;
}

const articles: Article[] = [
  {
    id: 1,
    date: "2 Aug, 2021",
    title: "Reading Books Always Makes The Moments Happy",
    imageUrl: "../../../../../public/Rectangle 45.png",
  },
  {
    id: 2,
    date: "2 Aug, 2021",
    title: "Reading Books Always Makes The Moments Happy",
    imageUrl: "../../../../../public/Rectangle 38.png",
  },
  {
    id: 3,
    date: "2 Aug, 2021",
    title: "Reading Books Always Makes The Moments Happy",
    imageUrl: "../../../../../public/Rectangle 44.png",
  },
];

const ArticlesSection: React.FC = () => {
  return (
    <Box sx={{ px: 4, py: 8, textAlign: "center", backgroundColor: "#f9fdfd" }}>
      {/* Section Header */}
      <Typography
        variant="overline"
        sx={{ letterSpacing: 1.5, color: "#7A7A7A" }}
      >
        READ OUR ARTICLES
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 1,
          mb: 6,
          "&::before, &::after": {
            content: '""',
            flex: 0.471,
            height: "1px",
            backgroundColor: "#ccc",
          },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 400, color: "#173F5F" }}>
          Latest Articles
        </Typography>
      </Box>

      {/* Article List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "center",
          alignItems: "stretch",
          flexWrap: "wrap",
          border: "0",
        }}
      >
        {articles.map((article) => (
          <Box
            key={article.id}
            sx={{
              width: { xs: "100%", sm: "80%", md: "30%" },
              backgroundColor: "#fff",
              textAlign: "left",
              overflow: "hidden",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Box
              component="img"
              src={article.imageUrl}
              alt={article.title}
              sx={{ width: "100%", height: 250, objectFit: "cover" }}
            />
            <Box sx={{ py: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  color: "#74642F",
                  fontSize: "15px",
                  letterSpacing: 1,
                }}
              >
                {article.date}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 400, color: "#173F5F" }}
              >
                {article.title}
              </Typography>
            </Box>
            <Box
              sx={{
                px: 2,
                pb: 2,
                display: "flex",
                gap: 1,
                justifyContent: "flex-end", // ✅ This pushes icons to the right
              }}
            >
              <IconButton size="small">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Read All Articles Button */}
      <Box mt={6}>
        <Button
          variant="outlined"
          sx={{ color: "#173F5F", borderColor: '#C0C0C0' }}
          endIcon={<span style={{ fontSize: 18,marginBottom:2 }}>→</span>}
        >
          Read All Articles
        </Button>
      </Box>
    </Box>
  );
};

export default ArticlesSection;
