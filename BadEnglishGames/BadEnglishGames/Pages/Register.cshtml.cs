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
        private IActionResult OnPostSignUp()
        {
            if (temp == null) return RedirectToAction("Get");
            //check if username and email are unique

            if (temp.Password != confirm) return RedirectToAction("Get");

            //add user to db

            temp.ClearPassword();
            temp = new User();
            confirm = "";
            return RedirectToAction("Index");
        }
    }
}
