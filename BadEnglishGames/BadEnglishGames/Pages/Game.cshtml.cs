using BadEnglishGames.Data.DAL;
using BadEnglishGames.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Reflection;

namespace BadEnglishGames.Pages
{
    public class GameModel : PageModel
    {
        public Game game { get; set; }



        public void OnGet()
        {
            //string? title = RouteData.Values["GameTitle"]?.ToString();

            //if (title != null)
            //{
            //    var game = DatabaseController.GetGameByTitle(title);

            //    if (game != null)
            //    {
            //        this.game = game;
            //    }
            //}
        }


    }
}
