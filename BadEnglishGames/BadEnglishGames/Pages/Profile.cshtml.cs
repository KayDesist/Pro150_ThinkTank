using BadEnglishGames.Data.Models;
using BadEnglishGames.wwwroot.Controller;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;


namespace BadEnglishGames.Pages
{
    public class ProfileModel : PageModel
    {


        public User users = new User("HelpMe", "1224");
     
        [BindProperty]
        public Images image { get; set; }

        private readonly IWebHostEnvironment _environment;
        

        public ProfileModel(IWebHostEnvironment environment)
        {
            _environment = environment;
        }


        public void OnGet()
        {
        }
        
        public async Task<IActionResult> OnPost()
        {

            users.username.ToString();

            if(!string.IsNullOrWhiteSpace(users.userDesc))
             {
                TempData["UserDescription"] = users.userDesc;
            }

            if (image.file != null)
            {
                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.file.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.file.CopyToAsync(stream);
                }

                image.path = "/uploads/" + fileName;
            }

            return Page();
        }

        public IActionResult OnPostDeleteAccount()
        {
            // Sim to show that account has been delete will replace once we have DB Intergation
            TempData["Message"] = "Your account has been deleted.";

            return RedirectToPage("/Profile");
        }
    }
}
