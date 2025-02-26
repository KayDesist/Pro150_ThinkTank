using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BadEnglishGames.Data.Models;

namespace BadEnglishGames.Pages
{
    public class RegisterModel : PageModel
    {
        public User temp;
        public string confirm { get; set; }
        public void OnGet()
        {
        }
        public IActionResult OnPostSignUp()
        {
            if (temp == null) return RedirectToAction("Get");
            //check if username and email are unique

            if (temp.password != confirm) return RedirectToAction("Get");

            //add user to db
            return RedirectToAction("Index");
        }
    }
}
