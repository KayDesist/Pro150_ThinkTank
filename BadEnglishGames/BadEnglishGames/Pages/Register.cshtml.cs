using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BadEnglishGames.Data.Models;

namespace BadEnglishGames.Pages
{
    public class RegisterModel : PageModel
    {
        
        [BindProperty]
        public string? Confirm { get; set; }
        [BindProperty]
        public User temp { get; set; }
        public RegisterModel()
        {
            temp = new User();
        }
        public void OnGet()
        {
        }
        public IActionResult OnPostSignUp()
        {
            if (temp.username == null || temp.password == null || temp.username == "temp" || temp.password == "temp") return RedirectToAction("Get");
            //check if username and email are unique

            if (temp.password != Confirm) return RedirectToAction("Get");
            
            //add user to db
            bool success = Data.DAL.DatabaseController.CreateUser(temp);
            if (!success)
            {
                RedirectToAction("Get");
            }
            return RedirectToPage("/Index");
        }
    }
}
