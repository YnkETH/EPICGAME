export function filterByOrigin(videogames, origin) {
  switch (origin) {
    case "all":
      return videogames;
    case "api":
      const apiGames = videogames.filter((game) => !isNaN(Number(game.id))); // Check if ID can be converted to a number
      return apiGames;
    case "db":
      return videogames.filter((game) => typeof game.id === "string" && game.id.length === 36);
    default:
      return []; // Invalid origin value
  }
}
