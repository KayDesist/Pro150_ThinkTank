using BadEnglishGames.Data.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MongoDB.Bson.IO;
using System.ComponentModel;
using System.Text.Json;

namespace BadEnglishGames.Data.DAL
{
    public static class DatabaseController
    {
        private static HttpClient client = new HttpClient();

        public static List<Game> GetGames()
        {
            List<Game> games = new List<Game>();

<<<<<<< Updated upstream
            client = new();
            client.BaseAddress = new Uri("https://localhost:7116/");
=======
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://badenglishgamesapi.azurewebsites.net/");
>>>>>>> Stashed changes
            

            HttpResponseMessage response = client.GetAsync("api/Games").Result;
            string result = response.Content.ReadAsStringAsync().Result;
            games = JsonSerializer.Deserialize<List<Game>>(result)!;

            return games;
        }
        
        public static List<User> GetUsers()
        {
            List<User> users = new();
<<<<<<< Updated upstream
            client = new();
            client.BaseAddress = new Uri("https://localhost:7116/");
=======

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://badenglishgamesapi.azurewebsites.net/");

>>>>>>> Stashed changes

            HttpResponseMessage response = client.GetAsync("api/Users").Result;
            string result = response.Content.ReadAsStringAsync().Result;
            users = JsonSerializer.Deserialize<List<User>>(result)!;

            return users;
        }

        public static User? GetUserByUsername(string username)
        {
            client = new();
            try
            {

                return GetUsers().Where(user => user.username.Equals(username)).ElementAt(0);
            } catch (ArgumentOutOfRangeException e)
            {
                return null;
            }
        }

        

        public async static void CreateUser(string username, string password)
        {
            User user = new(username, password);
            client = new();

            client.BaseAddress = new Uri("https://localhost:7116/");

            string json = JsonSerializer.Serialize(user);

            var response = await client.PostAsJsonAsync("api/Users", json);


        }
        
    }
}
