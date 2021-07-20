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

    public class FavoriteController : ControllerBase
    {
        StudyBuddyContext db = new StudyBuddyContext();

        [HttpGet]
        [Route("User={userId}")]
        public List<Question> GetFavorites(string userID)
        {
            List<Question> qList = new List<Question>();
            foreach (Question qu in db.Questions)
            {
                qList.Add(qu);
            }

            List<Favorite> f = new List<Favorite>();
            f = db.Favorites.Where(x => x.UserID == userID).ToList();
            List<Question> q = new List<Question>();
            foreach (Favorite fav in f)
            {
                foreach (Question quest in qList)
                {

                    if (fav.QuestionID == quest.Id)
                    {
                        q.Add(quest);
                    }
                }

            }
            return q;
        }


    }
}
