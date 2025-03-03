using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BadEnglishGames.Data.Models
{
    public class UserHighScore
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? userId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? game1Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? game2Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? game3Id { get; set; }
        public int[]? highScores { get; set; }

    }
}
