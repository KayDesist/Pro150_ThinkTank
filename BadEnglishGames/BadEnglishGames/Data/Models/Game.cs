using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BadEnglishGames.Data.Models
{
    public class Game
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }
        public string? gameTitle { get; set; }
        public string? gameDesc { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? gameHighScoreID { get; set; }
    }
}
