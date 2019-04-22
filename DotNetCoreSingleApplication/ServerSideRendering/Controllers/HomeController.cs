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
        public async Task<IActionResult> Index([FromServices]INodeServices nodeServices)
        {
            var options = new {
                width=400,
                height=200,
                showArea=true,
                showPoint=true,
                fullWidth=true
            };
            var data = new {
                labels = new[]{"Mon","Tue","Wed","Thu","Fri","Sat"},
                series = new[]{
                    new[]{1,5,2,5,4,1},
                    new[]{4,5,2,5,4,1},
                    new[]{2,5,3,5,4,1},
                    new[]{3,5,4,9,4,1}
                }
            };
            ViewData["ResultFromNode"] = await nodeServices.InvokeAsync<string>("chartModule.js","line",options,data);
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
