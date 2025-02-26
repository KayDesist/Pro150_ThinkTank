using BadEnglishGames.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BadEnglishGames.Pages
{
    public class GameModel : PageModel
    {
        public Game game { get; set; }
        public void OnGet()
        {
        }
    }
}
