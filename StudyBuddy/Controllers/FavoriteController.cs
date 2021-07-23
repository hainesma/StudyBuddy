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

        //here were getting our list of questions from our database
        [HttpGet]
        [Route("/all")]

        //storing our list of in fList and for each favorite f in our database of favorites add f to that list then return fList
        public List<Favorite> GetQuestions()
        {
            List<Favorite> fList = new List<Favorite>();
            foreach (Favorite f in db.Favorites)
            {
                fList.Add(f);
            }
            return fList;
        }
        //get our list of favorites from our database
        [HttpGet]
        [Route("User={userId}")]

        public List<Question> GetFavorites(string userID)
        {
            List<Question> qList = new List<Question>();
            foreach (Question qu in db.Questions)
            {
                qList.Add(qu);
            }
            //setting our list of favorites f to database.favorites where x such that x.UserId is equal to User id and calling .ToList on it.
            //For each question qlist in our list of fav's, f, if the favorite's questionID is equal to the Id of a particular question add that favorite to the corresponding question
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
        //here we use the httpdelete command to remove a favorite from our list of favorites where our list of favorites in our databasetakes x such that
        //x.userID is equal to a given user ID and call's .ToList on it. for each favorite, f2, in our list of favorites, f, if f2's question id is equal to the number
        //passed through the remove favorite method then remove f2 from our database of favorites and save the changes
        [HttpDelete]
        [Route("{userId}/d={num}")]
        public void RemoveFavorite(string userId, int num)
        {
            List<Favorite> f = new List<Favorite>();
            f = db.Favorites.Where(x => x.UserID == userId).ToList();
            foreach (Favorite f2 in f)
            {
                if (f2.QuestionID == num)
                {
                
                    db.Favorites.Remove(f2);
                }
            }
            db.SaveChanges();
        }
        //here we're using the post command to add a favorite to our database of favorites
        [HttpPost]
        [Route("{userId}/id={id}")]
        public void AddFavorite(string userId, int id)
        {
            //storing a new favorite, "f", in our database of favorites then saving the changes in our database

            Question q = db.Questions.Where(x => x.Id == id).ToList().First();
            Favorite f = new Favorite() { UserID = userId, QuestionID = q.Id };
            List<Favorite> Fav = db.Favorites.Where(x => x.QuestionID == f.QuestionID && x.UserID == f.UserID).ToList();
            if(Fav.Count == 0)
            {
                db.Favorites.Add(f);
                db.SaveChanges();
            }
        }
    }
}
