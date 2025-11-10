namespace MapApi.Data
{
    public class Score
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public int Points { get; set; }
        public DateTime DateAchieved { get; set; } = DateTime.UtcNow;
    }
}