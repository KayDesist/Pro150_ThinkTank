using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using BadEnglishGames.Data.Models;
using BadEnglishGames.Data.DAL;

namespace BadEnglishGames.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public List<Game> Games { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            // Fetch games from the database
            Games = DatabaseController.GetGames();

            // Set the Route for each game
            foreach (var game in Games)
            {
                game.Route = $"./game/{game.id}";
            }
        }
    }
}