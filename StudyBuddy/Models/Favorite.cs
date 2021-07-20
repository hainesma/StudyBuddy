using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudyBuddy.Models
{
    public class Favorite
    {
        [Key]
        [Required]
        public string userID { get; set; }

        public int QuestionID { get; set; }
    }
}
