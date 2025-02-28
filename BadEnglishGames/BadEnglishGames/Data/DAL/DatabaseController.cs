using BadEnglishGames.Data.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MongoDB.Bson.IO;
using System;
using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BadEnglishGames.Data.DAL
{
    public static class DatabaseController
    {
        public static List<Game> GetGames()
        {
            List<Game> games = new List<Game>();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://badenglishgamesapi.azurewebsites.net/");
            

            HttpResponseMessage response = client.GetAsync("api/Games").Result;
            string result = response.Content.ReadAsStringAsync().Result;
            games = JsonSerializer.Deserialize<List<Game>>(result)!; 

            return games;
        }

        public static List<User> GetUsers()
        {
            List<User> users = new();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://badenglishgamesapi.azurewebsites.net/");


            HttpResponseMessage response = client.GetAsync("api/Users").Result;
            string result = response.Content.ReadAsStringAsync().Result;
            users = JsonSerializer.Deserialize<List<User>>(result)!;

            return users;
        }

        public static User? GetUserByUsername(string username)
        {
            try
            {
                return GetUsers().Where(user => user.username.Equals(username)).ElementAt(0);
            }
            catch(ArgumentOutOfRangeException) { return null; }
        }
        public static bool CreateUser(User user)
        {
            HttpClient client = new HttpClient();
            var message = new HttpRequestMessage
            {
                Content = JsonContent.Create(user),
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://example.com/some-endpoint"),
            };

            return client.SendAsync(message).Result.IsSuccessStatusCode;
        }

        public static Game? GetGameByTitle(string title)
        {
            try
            {
                return GetGames().Where(game => game.gameTitle.Equals(title)).ElementAt(0);
            }
            catch (ArgumentOutOfRangeException) { return null; }
        }

        public static void UpdateUser(User user)
        {
            var message = new HttpRequestMessage
            {
                Content = JsonContent.Create(user),
                Method = HttpMethod.Put,
                RequestUri = new Uri("https://example.com/some-endpoint"),
            };
        }
    }
}
