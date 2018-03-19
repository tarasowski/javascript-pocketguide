
// тут наш код, который нам бы не хотелось сильно менять, а лучше совсем не менять ))

module.exports = function(diDatabaseInstance) {
  let dbInstance = diDatabaseInstance;
  console.log(dbInstance, 'check the value');

  // тут мы предполагаем что dbInstance содержит несколько методов для работы с какой-либо базой данных
  // для примера я вызываю только один "query" - для получения записи из базы, инстанс которой мы получили в diDatabaseInstance

  return {
    get(field) {
      return dbInstance.query(field);
    },
    set(field) {
      return dbInstance.logme(field);
    }
  }
}
