using BadEnglishGames.Data.DAL;
using BadEnglishGames.Data.Models;
using BadEnglishGames.wwwroot.Controller;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;


namespace BadEnglishGames.Pages
{
    public class ProfileModel : PageModel
    {

        User user = new("temp", "temp");

        [BindProperty]
        public Images image { get; set; }

        private readonly IWebHostEnvironment _environment;

        public ProfileModel(IWebHostEnvironment environment)
        {
            _environment = environment;
        }


        public void OnGet()
        {
            if (DatabaseController.CurrentUser != null)
            {
                user = DatabaseController.CurrentUser;
            }
        }
        // Creates a Upload folder inside the project if it does not exist and when a user uploads an images it gets sent to that newly created uploads folder and displays
        public async Task<IActionResult> OnPost()
        {
            if(!string.IsNullOrWhiteSpace(user.userDesc))
             {
                TempData["UserDescription"] = user.userDesc;
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

            DatabaseController.UpdateUser(user);

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
