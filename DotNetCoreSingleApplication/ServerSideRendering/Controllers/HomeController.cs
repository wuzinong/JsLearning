using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServerSideRendering.Models;
using Microsoft.AspNetCore.NodeServices;

namespace ServerSideRendering.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index([FromServices] INodeSerivces nodeServices)
        {
            ViewData["ResultFromNode"] = await nodeServices.InvokeAsync<string>("chartModule.js");
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
