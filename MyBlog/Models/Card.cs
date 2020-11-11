using System;
using System.Collections.Generic;

namespace MyBlog.Models
{
    public partial class Card
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public int Id { get; set; }
    }
}
