using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AjaxPeople.Data;
using Microsoft.AspNetCore.Mvc;
using AjaxPeople.Web.Models;
using Microsoft.Extensions.Configuration;

namespace AjaxPeople.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=OneToManyDemo;Integrated Security=true;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            Thread.Sleep(2000);
            PersonDb db = new PersonDb(_connectionString);
            return Json(db.GetPeople());
        }

        [HttpPost]
        public ActionResult Add(Person person)
        {
            PersonDb db = new PersonDb(_connectionString);
            db.AddPerson(person);
            return Json(person);
        }

        [HttpPost]
        public ActionResult Update(Person person)
        {
            PersonDb db = new PersonDb(_connectionString);
            db.Update(person);
            return Json(person);
        }

        [HttpPost]
        public void Delete(int id)
        {
            PersonDb db = new PersonDb(_connectionString);
            db.Delete(id);
        }

    }
}
