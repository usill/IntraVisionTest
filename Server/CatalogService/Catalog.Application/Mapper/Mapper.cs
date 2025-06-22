using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Application.Mapper
{
    public static class Mapper
    {
        public static Dto Map<Obj, Dto>(Obj obj)
        {
            var config = new MapperConfiguration(config => config.CreateMap<Obj, Dto>());
            var mapper = config.CreateMapper();
            return mapper.Map<Dto>(obj);
        }
    }
}
