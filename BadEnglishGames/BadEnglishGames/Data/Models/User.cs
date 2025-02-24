

using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;


namespace BadEnglishGames.Data.Models
{
    public class User
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }
        public string? userDesc { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? userHighScoreID { get; set; }
    }
}
