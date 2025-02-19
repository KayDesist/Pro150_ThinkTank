using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BadEnglishGames.Pages
{
    public class ProfileModel : PageModel
    {
        public string UserName { get; set; } = "FunnyUserName";
        public string UserDescription { get; set; }


        public void OnGet()
        {
        }
    }
}
