const options = { limit: 30, page: 3 };
const limit =
  options.limit && parseInt(options.limit, 10) > 0
    ? parseInt(options.limit, 10)
    : 10;
const page =
  options.page && parseInt(options.page, 10) > 0
    ? parseInt(options.page, 10)
    : 1;
const skip = (page - 1) * limit;

console.log(limit);
console.log(page);
console.log(skip);
