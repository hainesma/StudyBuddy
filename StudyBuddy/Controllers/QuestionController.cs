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
        [Route("all")]
        public List<Question> GetQuestions()
        {
            List<Question> qList = new List<Question>();
            foreach (Question q in db.Questions)
            {
                qList.Add(q);
            }
            return qList;
        }

        [HttpPost]
        [Route("add/{text}/{answer}")]
        public void AddQuestion(string text, string answer)
        {
            Question newQ = new Question() { Text = text, Answer = answer };
            db.Questions.Add(newQ);
            db.SaveChanges();
        }

        [HttpGet]
        [Route("Id={userSelection}")]

        public Question GetAnswer(int userSelection)
        {
            List<Question> qAns = GetQuestions();
            foreach (Question q in qAns)
            {
                if (q.Id == userSelection)
                {

                    return q;
                }
            }
            return null;

        }
        [HttpDelete]
        [Route("Delete/Id={userSelection}")]
        public void RemoveQuestion(int userSelection)
        {
            List<Question> quest = new List<Question>();
            quest = db.Questions.Where(x => x.Id == userSelection).ToList();
            foreach (Question q in quest)
            {
                if (q.Id == userSelection)
                {

                    db.Questions.Remove(q);
                }
            }
            db.SaveChanges();
        }
    }

}
