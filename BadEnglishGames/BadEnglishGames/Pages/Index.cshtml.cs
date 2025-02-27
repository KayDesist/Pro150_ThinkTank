using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BadEnglishGames.Models;
using System.Collections.Generic;
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

            Games= DatabaseController.GetGames(); 

            foreach(var game in Games)
            {
                game.Route = $"./game/{game.id}";
            }   
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