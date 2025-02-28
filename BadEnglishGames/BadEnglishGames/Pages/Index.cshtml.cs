using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using BadEnglishGames.Data.DAL;
using BadEnglishGames.Data.Models;

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
            Games = DatabaseController.GetGames();
        }

        public IActionResult OnPost(string gameTitle)
        {
            if (string.IsNullOrEmpty(gameTitle))
            {
                // Handle invalid or missing game title
                return RedirectToPage("/Index");
            }

            // Redirect to the game page using the game title
            return RedirectToPage($"/game");
        }
    }
} 

//just adding a comment so i can push and fix some push issues before merging