using Microsoft.AspNetCore.Mvc;

namespace BadEnglishGames.Data.Models
{
    public class User
    {
        //account creation
        [BindProperty]
        public string Username { get; set; }
        [BindProperty]
        public string Email { get; set; }
        [BindProperty]
        //only used for creation, cleared afterward
        public string Password { get; set; }

        //saved scores
        public int GameHS { get; set; } //duplicate as needed

        //called after storing user in db
        public void ClearPassword()
        {

        }
    }
}
