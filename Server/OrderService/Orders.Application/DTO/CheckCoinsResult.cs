using Orders.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orders.Application.DTO
{
    public class CheckCoinsResult
    {
        public List<Coin> Coins { get; set; }
        public bool Successed { get; set; }
        public string TextResult { get; set; }
    }
}
