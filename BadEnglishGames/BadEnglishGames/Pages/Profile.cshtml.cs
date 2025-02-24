using BadEnglishGames.wwwroot.Controller;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Web.Helpers;

namespace BadEnglishGames.Pages
{
    public class ProfileModel : PageModel
    {
        
        public string UserName { get; set; } = "FunnyUserName";
        [BindProperty]
        public string UserDescription { get; set; }

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
        // Creates a Upload folder inside the project if it does not exist and when a user uploads an images it gets sent to that newly created uploads folder and displays
        public async Task<IActionResult> OnPost()
        {
            if(!string.IsNullOrWhiteSpace(UserDescription))
             {
                TempData["UserDescription"] = UserDescription;
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
