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
                new Game { Title = "Game 1", Description = "Description for Game 1", Route = "/game1" },
                new Game { Title = "Game 2", Description = "Description for Game 2", Route = "/game2" },
                new Game { Title = "Game 3", Description = "Description for Game 3", Route = "/game3" }
            };
        }
    }
}