using Microsoft.AspNetCore.Mvc;
using StudyBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudyBuddy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    
    public class QuestionController : ControllerBase
    {
        StudyBuddyContext db = new StudyBuddyContext();

        [HttpGet]
        public List<Question> GetQuestions()
        {
            List<Question> qList = new List<Question>();
            foreach (Question q in db.Questions)
            {
                qList.Add(q);
            }
            return qList;
        }
    }
}
