async function checkDuplicate(model, name) {
  return await model.findOne(name);
}

module.exports = checkDuplicate;
