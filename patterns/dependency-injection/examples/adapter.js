module.exports = function(diDb) {
  // here we suppose that diDb has query method but AWS for example name it as select
  return {
    query(field) {
      return diDb.select(field);
    }
  }
}