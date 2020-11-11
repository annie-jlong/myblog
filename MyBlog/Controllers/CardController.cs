using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MyBlog.Models;

namespace MyBlog.Controllers
{
    [Authorize]
    public class CardController : Controller
    {
        private readonly CardDBContext _context;

        public CardController(CardDBContext context)
        {
            _context = context;
        }
       
        [HttpGet]
        [Route("api/card/{email}")]
        public async Task<Card> GetCard(string email)
        {
            return await _context.Card.FirstOrDefaultAsync(x => x.Email == email);
        }

        [HttpPost]
        [Route("api/card/create")]
        public async Task<int> Create(Card card)
        {
            try {
                _context.Add(card);
                return await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return -1;
            }     
        }

        [HttpPost]
        [Route("api/card/edit")]
        public async Task<int> Update(Card card)
        {
            try
            {
                var entity = _context.Card.FirstOrDefault(x=>x.Email==card.Email);
                if (entity != null)
                {
                    entity.Name = card.Name;
                    entity.Status = card.Status;
                    entity.Content = card.Content;
                    entity.Category = card.Category;

                    return await _context.SaveChangesAsync();
                }
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        [HttpDelete]
        [Route("api/card/{email}")]
        public async Task<int> Delete(string email)
        {
            try
            {
                var card = _context.Card.FirstOrDefault(x => x.Email == email);
                _context.Card.Remove(card);
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
