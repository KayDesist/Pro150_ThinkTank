using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BadEnglishGames.Models;
using System.Collections.Generic;

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
            // Hardcoded list of games for now
            Games = new List<Game>
            {
<<<<<<< Updated upstream
                new Game { Title = "Game 1", Description = "Description for Game 1", Route = "/game1" },
                new Game { Title = "Game 2", Description = "Description for Game 2", Route = "/game2" },
                new Game { Title = "Game 3", Description = "Description for Game 3", Route = "/game3" }
            };
=======
                game.Route = $"./game/{gameTitle}";
            }
>>>>>>> Stashed changes
        }

        public IActionResult OnPost(string gameId)
        {
            // Logic to deduce which game play button was pressed
            if (string.IsNullOrEmpty(gameId))
            {
                // Handle invalid or missing game ID
                return RedirectToPage("/Index");
            }

            // Redirect to the game page using the game ID
            return RedirectToPage($"./game/{gameId}");
        }
    }
}