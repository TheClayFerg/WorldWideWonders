using System;

namespace MapApi.Data
{
    public class Score
    {
        public int Id { get; set; }
        public string PlayerName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public double Time { get; set; }
    }
}