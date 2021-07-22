using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudyBuddy.Models
{
    public class Question
    {
        // Here we created our favorite model with properties being pulled from our database, setting the text and answer properties to required with a max length of 500 characters
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(500)]
        [Required]
        public string Text { get; set; }

        [MaxLength(500)]
        [Required]
        public string Answer { get; set; }
    }
}
