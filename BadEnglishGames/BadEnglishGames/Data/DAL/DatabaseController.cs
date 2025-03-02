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

        #region Games
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
        public static Game? GetGameByTitle(string title)
        {
            try
            {
                return GetGames().Where(game => game.gameTitle.Equals(title)).ElementAt(0);
            }
            catch (ArgumentOutOfRangeException) { return null; }
        }
        #endregion

        #region Users
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


        public static void UpdateUser(User user)
        {
            var message = new HttpRequestMessage
            {
                Content = JsonContent.Create(user),
                Method = HttpMethod.Put,
                RequestUri = new Uri("https://example.com/some-endpoint"),
            };
        }
        #endregion

        #region GameHighScore
        public static List<GameHighScore> GetGameHighScores()
        {
            List<GameHighScore> highScores = new();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://badenglishgamesapi.azurewebsites.net/");


            HttpResponseMessage response = client.GetAsync("api/Gamehighscore").Result;
            string result = response.Content.ReadAsStringAsync().Result;
            highScores = JsonSerializer.Deserialize<List<GameHighScore>>(result)!;

            return highScores;
        }

        public static GameHighScore GetGameHighScore(Game game)
        {
            List<GameHighScore> highScores = new();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://badenglishgamesapi.azurewebsites.net/");


            HttpResponseMessage response = client.GetAsync($"api/Gamehighscore/{game.gameHighScoreID}").Result;
            string result = response.Content.ReadAsStringAsync().Result;
            highScores = JsonSerializer.Deserialize<List<GameHighScore>>(result)!;

            return highScores.ElementAt(0);
        }

        public static void UpdateGameHighScore(Game game)
        {
            GameHighScore highScore = GetGameHighScore(game);
        }

        #endregion

        #region UserHighScore
        #endregion
    }
}
