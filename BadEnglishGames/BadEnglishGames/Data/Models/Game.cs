using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BadEnglishGames.Data.Models
{
    public class Game
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? GameTitle { get; set; }
        public string? GameDesc { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? GameHighScoreId { get; set; }
    }
}
