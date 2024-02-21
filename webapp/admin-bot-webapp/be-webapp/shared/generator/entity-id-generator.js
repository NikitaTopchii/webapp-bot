
class EntityIdGenerator{

  generateId(data){
    const current_time = new Date().getMilliseconds();

    return Math.floor(Math.random() * data + current_time * 100000).toString();
  }
}

module.exports = EntityIdGenerator;
