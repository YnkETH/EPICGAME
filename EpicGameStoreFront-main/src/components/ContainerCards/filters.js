const order = (allVideogames, sortOrder, getGenres, searchQuery) => {
  let filteredVideogames = allVideogames;
  if (getGenres.length > 0) {
    filteredVideogames = allVideogames?.filter((game) =>
      game?.Genres?.some((genre) => genre.genreName === getGenres)
    );
  }

  if (searchQuery.length > 0) {
    const query = searchQuery.toLowerCase();
    filteredVideogames = filteredVideogames.filter((game) =>
      game.name.toLowerCase().includes(query)
    );
  }

  const sortedVideogames = filteredVideogames.sort((a, b) => {
    switch (sortOrder) {
      case "AtoZ":
        return a.name.localeCompare(b.name);
      case "ZtoA":
        return b.name.localeCompare(a.name);
      case "PriceAsc":
        return a.price - b.price;
      case "PriceDesc":
        return b.price - a.price;
      case "RatingAsc":
        return a.rating - b.rating;
      case "RatingDesc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  return sortedVideogames;
};

export { order };
