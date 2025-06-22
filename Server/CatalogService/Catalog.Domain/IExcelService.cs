﻿using Catalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Domain
{
    public interface IExcelService
    {
        public Task<List<Product>> ParseAsync(FileInfo file, string wwwRootDirectory);
    }
}
