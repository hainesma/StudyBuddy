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
        //getting data from the database using the httpget command
        [HttpGet]
        [Route("all")]

        //Get questions method setting our List of questions qList to a new list and for each question q in our database of questions add q to the list and return the qList
        public List<Question> GetQuestions()
        {
            List<Question> qList = new List<Question>();
            foreach (Question q in db.Questions)
            {
                qList.Add(q);
            }
            return qList;
        }
        //posting the question to the database using the httppost command
        [HttpPost]
        [Route("add/{text}/{answer}")]
        public void AddQuestion(string text, string answer)
        {
            Question newQ = new Question() { Text = text, Answer = answer };
            db.Questions.Add(newQ);
            db.SaveChanges();
        }
        //here we're getting the answer from the database via the userselected ID corresponding to the question
        [HttpGet]
        [Route("Id={userSelection}")]
        //store our list of questions in qAns and call the GetQuestion method on it. got each question q in qAns if the id is equal to the user selection return q else return null;
        public Question getAnswer(int userSelection)
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

    }
}
