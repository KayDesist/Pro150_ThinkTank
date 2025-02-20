using BadEnglishGames.Data.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MongoDB.Bson.IO;
using System.ComponentModel;
using System.Text.Json;

namespace BadEnglishGames.Data.DAL
{
    public class DatabaseController : ControllerBase
    {
        public List<Game> GetGames()
        {
            List<Game> games = new List<Game>();

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://localhost:7116/");
            

            HttpResponseMessage response = client.GetAsync("api/Games").Result;
            string result = response.Content.ReadAsStringAsync().Result;
            games = JsonSerializer.Deserialize<List<Game>>(result);

            return games;
        }
    }
}
