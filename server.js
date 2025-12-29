const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Simple helper to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Return randomized metadata on each request
app.get('/api/metadata', (req, res) => {
  const greetings = [
    "Welcome to SiteCraft",
    "Hello — enjoy exploring",
    "Discover new tools",
    "Greetings, builder",
    "Fresh layout for you"
  ];

  const themes = [
    "default",
    "vibrant",
    "dark",
    "pastel",
    "retro"
  ];

  const cards = [
    { id: "card-1", tag: "Algebra" },
    { id: "card-2", tag: "Geometry" },
    { id: "card-3", tag: "Trigonometry" },
    { id: "card-4", tag: "Calculus" },
    { id: "card-5", tag: "Number Theory" },
    { id: "card-6", tag: "Combinatorics" },
    { id: "card-7", tag: "Probability" },
    { id: "card-8", tag: "Statistics" },
    { id: "card-9", tag: "Linear Algebra" },
    { id: "card-10", tag: "Differential Eq" },
    { id: "card-11", tag: "Transforms" },
    { id: "card-12", tag: "Optimization" }
  ];

  const techs = [
    { id: "tech-1", tag: "Calculator" },
    { id: "tech-2", tag: "Converter" },
    { id: "tech-3", tag: "Text Counter" },
    { id: "tech-4", tag: "Currency" },
    { id: "tech-5", tag: "Password" },
    { id: "tech-6", tag: "Timer" }
  ];

  const shuffled = shuffle(cards.slice());
  const response = {
    greeting: greetings[Math.floor(Math.random() * greetings.length)],
    theme: themes[Math.floor(Math.random() * themes.length)],
    order: shuffled.map(c => c.id),
    tags: shuffled.reduce((acc, c) => { acc[c.id] = c.tag; return acc; }, {})
  };

  // include tech ordering and tags
  const shuffledTech = shuffle(techs.slice());
  response.techOrder = shuffledTech.map(t => t.id);
  response.techTags = shuffledTech.reduce((acc, t) => { acc[t.id] = t.tag; return acc; }, {});

  res.json(response);
});

app.listen(port, () => {
  console.log(`SiteCraft server running at http://localhost:${port}`);
});
