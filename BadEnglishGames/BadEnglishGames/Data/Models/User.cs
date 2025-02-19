namespace BadEnglishGames.Data.Models
{
    public class User
    {
        //account creation
        public string Username { get; set; }
        public string Email { get; set; }
        //only used for creation, cleared afterward
        public string Password { get; set; }

        //saved scores
        public int GameHS { get; set; }

        //called after storing user in db
        public void ClearPassword()
        {

        }
    }
}
