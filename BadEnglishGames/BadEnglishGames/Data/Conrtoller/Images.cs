using System.ComponentModel.DataAnnotations.Schema;

namespace BadEnglishGames.wwwroot.Controller
{
    public class Images
    {
        public string path { get; set; }
        public int id { get; set; }
        public string description { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
    }
}
