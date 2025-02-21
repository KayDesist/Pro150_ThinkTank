using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BadEnglishGames.Data.Models
{
    public class GameHighScore
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? gameId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? user1Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? user2Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? user3Id { get; set; }
    }
}
