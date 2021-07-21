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
        public List<Favorite> GetQuestions()
        {
            List<Favorite> fList = new List<Favorite>();
            foreach (Favorite f in db.Favorites)
            {
                fList.Add(f);
            }
            return fList;
        }

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

        [HttpDelete]
        [Route("{userId}/d={num}")]
        public void RemoveFavorite(string userId, int num)
        {
            List<Favorite> f = new List<Favorite>();
            f = db.Favorites.Where(x => x.UserID == userId).ToList();
            foreach(Favorite f2 in f)
            {
                if(f2.QuestionID == num)
                {
                    db.Favorites.Remove(f2);
                }
            }
            db.SaveChanges();
        }

        [HttpPost]
        [Route("{userId}/id={id}")]
        public void AddFavorite(string userId, int id)
        {
            Question q = db.Questions.Where(x => x.Id == id).ToList().First();
            Favorite f = new Favorite() { UserID = userId, QuestionID = q.Id };
            db.Favorites.Add(f);
            db.SaveChanges();
        }

    }
}
