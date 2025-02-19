using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BadEnglishGames.Pages
{
    public class RegisterModel : PageModel
    {
        public void OnGet()
        {
        }
        private IActionResult OnPostSignUp()
        {

            return RedirectToAction("Index");
        }
        private IActionResult OnPostLogin()
        {
            return RedirectToAction("Login");
        }
    }
}
