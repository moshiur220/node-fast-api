class Pagination {
  // sort function
  static sortOption(options) {
    let sort = {};
    if (options.sortBy) {
      options.sortBy.split(",").forEach((sortOption) => {
        const [key, order] = sortOption.split(":");
        if (order === "desc") {
          sort[key] = -1;
        } else {
          sort[key] = 1;
        }
      });
    } else {
      sort["createdAt"] = -1;
    }
    return sort;
  }
  // limit page
  static limitPage(options) {
    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;
    return {
      limit,
      page,
      skip,
    };
  }
  // main pagination function
  static paginate(model, filter, options) {
    const sort = Pagination.sortOption(options);
    const { limit, page, skip } = Pagination.limitPage(options);
    const countPromise = model.countDocuments(filter).exec();
    let docsPromise = model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        meta: {
          page,
          limit,
          totalPages,
          totalResults,
        },
      };
      return Promise.resolve(result);
    });
  }
}

module.exports = Pagination;
