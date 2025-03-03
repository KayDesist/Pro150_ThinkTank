using BadEnglishGames.Data.DAL;
using BadEnglishGames.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BadEnglishGames.Pages
{
    public class LoginModel : PageModel
    {
        public bool? ValidLogin { get; set; } = null;
        public string? LoginPopupText { get; set; } = null;

        public void OnGet()
        {
        }
        public IActionResult OnPostLogin()
        {
            string? username = Request.Form["LoginUsername"];
            string? password = Request.Form["LoginPassword"];

            //Check if the username is in the DB first
            if (username != null && password != null)
            {
                ValidLogin = ValidateLogin(username, password);
            }

            if (ValidLogin != null && ValidLogin == true)
            {
                return RedirectToPage("/Profile");
            }
            return Page();
        }

        private bool ValidateLogin(string username, string password)
        {
            bool validLogin = false;

            //The user will be null if the username is not in the DB
            User? user = DatabaseController.GetUserByUsername(username);

            if (user != null)
            {
                //After validating the username exists, you can verify that the given password is the correct password
                validLogin = user.password == password;

                if (validLogin)
                {
                    DatabaseController.CurrentUser = user;
                }
            }
            else
            {
                validLogin = false;
                
            }

            

            LoginPopupText = (validLogin) ? "" : "The Username And/Or Password is incorrect. Try Again";
            return validLogin;
        }
    }
}
