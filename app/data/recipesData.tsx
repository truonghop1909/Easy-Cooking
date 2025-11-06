export const recipesData = [
  {
    id: 1,
    categoryIds: [3], // (Desserts)
    title: "Strawberry Cream Cheesecake",
    description:
      "A creamy strawberry cheesecake with a light crust and refreshing flavor. Perfect for any celebration.",
    author: {
      name: "Tricia Albert",
      avatar: "/avatarTruongHop.jpg",
      date: "Yesterday",
    },
    stats: {
      rating: 5,
      comments: 25,
      trend: 85,
    },
    image: "/banner01.jpg",
    video: "",
    prepTime: "15 min",
    cookTime: "15 min",
    serves: "4 people",
    ingredients: [
      {
        section: "For the crust",
        items: ["400g graham crackers", "150g unsalted butter, melted"],
      },
      {
        section: "For the cheesecake",
        items: [
          "175g unsalted butter, melted",
          "500g Philadelphia cream cheese, softened",
          "250ml whipping cream, warm",
          "3 tbsp powdered gelatin + 3 tbsp water",
        ],
      },
    ],
    instructions: [
      "Prepare crust by mixing graham crackers and melted butter.",
      "Pour mixture into a tart tin and chill for 30 minutes.",
      "Add cream cheese and whipping cream to a bowl and beat until smooth.",
      "Mix in gelatin mixture and pour into crust.",
      "Chill for 2 hours before serving.",
    ],
    nutritionFacts: [
      { name: "Calories", value: "219.9" },
      { name: "Total Fat", value: "10.7 g" },
      { name: "Saturated Fat", value: "2.2 g" },
      { name: "Cholesterol", value: "37.4 mg" },
      { name: "Sodium", value: "120.3 mg" },
      { name: "Protein", value: "7.9 g" },
    ],
    freshRecipes: [
      {
        id: 2,
        title: "Chocolate Fudge Cake",
        image: "/banner02.jpg",
        rating: 4,
      },
      { id: 3, title: "Lemon Tart Delight", image: "/banner03.jpg", rating: 5 },
    ],
  },
  {
    id: 2,
    categoryIds: [3], // (Desserts)
    title: "Chocolate Fudge Cake",
    description:
      "Rich, moist chocolate cake layered with smooth fudge frosting — a classic dessert for chocolate lovers.",
    author: {
      name: "Michael Brown",
      avatar: "/avatarTruongHop.jpg",
      date: "2 days ago",
    },
    stats: {
      rating: 4,
      comments: 18,
      trend: 72,
    },
    image: "/banner02.jpg",
    video: "",
    prepTime: "20 min",
    cookTime: "35 min",
    serves: "6 people",
    ingredients: [
      {
        section: "Cake base",
        items: [
          "250g flour",
          "200g sugar",
          "100g cocoa powder",
          "2 eggs",
          "1 cup milk",
        ],
      },
      {
        section: "Frosting",
        items: [
          "150g dark chocolate",
          "100g butter",
          "2 tbsp cocoa powder",
          "50g icing sugar",
        ],
      },
    ],
    instructions: [
      "Preheat oven to 180°C and prepare a round cake tin.",
      "Mix dry ingredients together and add eggs and milk.",
      "Bake for 35 minutes, then cool before frosting.",
      "Melt chocolate and butter for frosting, spread evenly on top.",
    ],
    nutritionFacts: [
      { name: "Calories", value: "320" },
      { name: "Total Fat", value: "12.3 g" },
      { name: "Protein", value: "6.8 g" },
    ],
    freshRecipes: [
      {
        id: 1,
        title: "Strawberry Cream Cheesecake",
        image: "/banner01.jpg",
        rating: 5,
      },
      { id: 3, title: "Lemon Tart Delight", image: "/banner03.jpg", rating: 5 },
    ],
  },
  {
    id: 3,
    categoryIds: [3], // (Desserts)
    title: "Lemon Tart Delight",
    description:
      "A zesty lemon tart with a buttery crust and smooth filling — bright, tangy, and refreshing.",
    author: {
      name: "Sophia Nguyen",
      avatar: "/avatarTruongHop.jpg",
      date: "Last week",
    },
    stats: {
      rating: 5,
      comments: 12,
      trend: 90,
    },
    image: "/banner03.jpg",
    video: "",
    prepTime: "25 min",
    cookTime: "20 min",
    serves: "5 people",
    ingredients: [
      {
        section: "Crust",
        items: ["250g flour", "100g butter", "2 tbsp sugar", "1 egg yolk"],
      },
      {
        section: "Filling",
        items: [
          "3 lemons (juice and zest)",
          "150g sugar",
          "3 eggs",
          "100g butter",
        ],
      },
    ],
    instructions: [
      "Prepare crust by mixing flour, sugar, butter, and egg yolk.",
      "Press into a tart tin and bake for 10 minutes.",
      "Mix lemon juice, zest, sugar, eggs, and butter for filling.",
      "Pour into crust and bake for another 15 minutes.",
    ],
    nutritionFacts: [
      { name: "Calories", value: "250" },
      { name: "Total Fat", value: "9.5 g" },
      { name: "Protein", value: "4.2 g" },
    ],
    freshRecipes: [
      {
        id: 1,
        title: "Strawberry Cream Cheesecake",
        image: "/banner01.jpg",
        rating: 5,
      },
      {
        id: 2,
        title: "Chocolate Fudge Cake",
        image: "/banner02.jpg",
        rating: 4,
      },
    ],
  },
  {
    id: 4,
    categoryIds: [2, 6], // (Main Courses, Vegan)
    title: "Classic Tomato Basil Pasta",
    description:
      "A simple, elegant, and quick pasta dish featuring fresh basil and a rich tomato sauce. Perfect for a weeknight dinner.",
    author: {
      name: "Maria Rossi",
      avatar: "/avatarTruongHop.jpg",
      date: "3 days ago",
    },
    stats: {
      rating: 4,
      comments: 45,
      trend: 82,
    },
    image: "/banner04.jpg",
    video: "",
    prepTime: "10 min",
    cookTime: "20 min",
    serves: "4 people",
    ingredients: [
      {
        section: "For the pasta",
        items: [
          "400g spaghetti",
          "1 can (400g) crushed tomatoes",
          "2 cloves garlic, minced",
          "1/2 cup fresh basil, chopped",
          "2 tbsp olive oil",
          "Salt and pepper to taste",
        ],
      },
    ],
    instructions: [
      "Cook spaghetti according to package directions.",
      "While pasta is cooking, heat olive oil in a pan over medium heat.",
      "Add minced garlic and cook until fragrant (about 1 minute).",
      "Pour in crushed tomatoes, season with salt and pepper. Simmer for 10-15 minutes.",
      "Drain pasta and add it to the sauce pan. Toss to combine.",
      "Stir in fresh basil just before serving.",
    ],
    nutritionFacts: [
      { name: "Calories", value: "310" },
      { name: "Total Fat", value: "6.1 g" },
      { name: "Sodium", value: "350 mg" },
      { name: "Protein", value: "10.2 g" },
    ],
    freshRecipes: [
      {
        id: 6,
        title: "Mediterranean Quinoa Salad",
        image: "/banner05.jpg",
        rating: 4,
      },
      {
        id: 1,
        title: "Strawberry Cream Cheesecake",
        image: "/banner01.jpg",
        rating: 5,
      },
    ],
  },
  {
    id: 5,
    categoryIds: [1], // (Breakfast)
    title: "Fluffy Buttermilk Pancakes",
    description:
      "The perfect recipe for light, fluffy, and delicious buttermilk pancakes. A breakfast classic for the whole family.",
    author: {
      name: "John Miller",
      avatar: "/avatarTruongHop.jpg",
      date: "This morning",
    },
    stats: {
      rating: 5,
      comments: 102,
      trend: 95,
    },
    image: "/banner06.jpg",
    video: "",
    prepTime: "10 min",
    cookTime: "15 min",
    serves: "3 people (makes 8 pancakes)",
    ingredients: [
      {
        section: "Pancake Batter",
        items: [
          "1.5 cups all-purpose flour",
          "1 tbsp granulated sugar",
          "1 tsp baking powder",
          "1/2 tsp baking soda",
          "1/4 tsp salt",
          "1.25 cups buttermilk",
          "1 large egg",
          "2 tbsp unsalted butter, melted",
        ],
      },
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.",
      "In a separate medium bowl, whisk together buttermilk and the egg.",
      "Pour the wet ingredients into the dry ingredients. Add the melted butter.",
      "Whisk gently until just combined. Do not overmix; lumps are okay.",
      "Heat a lightly oiled griddle or pan over medium-low heat.",
      "Pour or scoop the batter onto the griddle (about 1/4 cup per pancake).",
      "Cook until bubbles appear on the surface (about 2-3 minutes), then flip and cook until golden brown (1-2 minutes).",
      "Serve immediately with maple syrup and butter.",
    ],
    nutritionFacts: [
      { name: "Calories", value: "150 (per pancake)" },
      { name: "Total Fat", value: "4.5 g" },
      { name: "Protein", value: "5.1 g" },
    ],
    freshRecipes: [
      {
        id: 1,
        title: "Strawberry Cream Cheesecake",
        image: "/banner01.jpg",
        rating: 5,
      },
      { id: 3, title: "Lemon Tart Delight", image: "/banner03.jpg", rating: 5 },
    ],
  },
  {
    id: 6,
    categoryIds: [4, 6], // (Salads, Vegan)
    title: "Mediterranean Quinoa Salad",
    description:
      "A healthy, flavorful, and refreshing salad packed with protein. Perfect for meal prep or a light lunch.",
    author: {
      name: "Emily Chen",
      avatar: "/avatarTruongHop.jpg",
      date: "4 days ago",
    },
    stats: {
      rating: 4,
      comments: 30,
      trend: 78,
    },
    image: "/banner05.jpg",
    video: "",
    prepTime: "15 min",
    cookTime: "15 min (for quinoa)",
    serves: "4 people",
    ingredients: [
      {
        section: "For the salad",
        items: [
          "1 cup quinoa, uncooked",
          "2 cups water or vegetable broth",
          "1 cucumber, diced",
          "1 red bell pepper, diced",
          "1/2 red onion, finely chopped",
          "1 cup cherry tomatoes, halved",
          "1/2 cup feta cheese, crumbled",
          "1/4 cup kalamata olives, sliced",
        ],
      },
      {
        section: "For the dressing",
        items: [
          "1/4 cup olive oil",
          "1/4 cup fresh lemon juice",
          "1 tsp dried oregano",
          "Salt and pepper to taste",         ],
      },
    ],
    instructions: [
      "Rinse quinoa under cold water. Add quinoa and water/broth to a pot. Bring to a boil, then reduce heat, cover, and simmer for 15 minutes.",
      "Once cooked, fluff quinoa with a fork and let it cool completely.",
      "In a large bowl, combine the cooled quinoa, cucumber, bell pepper, red onion, cherry tomatoes, feta cheese, and olives.",
      "In a small bowl, whisk together all dressing ingredients (olive oil, lemon juice, oregano, salt, pepper).",
      "Pour the dressing over the salad and toss gently to combine.",
      "Chill for at least 30 minutes before serving to let the flavors meld.",
    ],
    nutritionFacts: [
      { name: "Calories", value: "280" },
      { name: "Total Fat", value: "15.2 g" },
      { name: "Protein", value: "8.1 g" },
      { name: "Carbohydrates", value: "29.5 g" },
    ],
    freshRecipes: [
      {
        id: 4,
        title: "Classic Tomato Basil Pasta",
        image: "/banner04.jpg",
        rating: 4,
      },
      {
        id: 2,
        title: "Chocolate Fudge Cake",
        image: "/banner02.jpg",
        rating: 4,
      },
    ],
  },
];