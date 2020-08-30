const Redis = require("ioredis");
const config = require('config');

export default class Storage{

  constructor(){
    this.redis = new Redis({
      host: config.get("db.redis.host"),
      port: config.get("db.redis.port"),
      db: config.get("db.redis.db") 
    });
  }
  
  timestamp(){
    let t = new Date();
    let y =  t.getFullYear();
    let M = (t.getMonth()+1) < 10 ? '0'+(t.getMonth()+1) : (t.getMonth()+1);
    let d = t.getDate() < 10 ? '0'+t.getDate() : t.getDate();
    let h = t.getHours() < 10 ? '0'+t.getHours() : t.getHours();
    let m = t.getMinutes() < 10 ? '0'+t.getMinutes() : t.getMinutes(); 
    let s = t.getSeconds() < 10 ? '0'+t.getSeconds() : t.getSeconds();

    let date = y +'-'+ M +'-'+d;
    let time = h + ":" + m + ":" + s;

    let dateTime = date+' '+time;
    return dateTime;
  }

  botset({id}, {login}, {token},refresh_token){
    let key = "bot";
    let validate = this.redis.hget("bot", id);

      if(id == validate){
        return `${login} bot already exist`;
      }else{

        let proc = this.redis.hmset(key, "id", id, "login", login, "access_token", token,"refresh_token", refresh_token);
        let botrep = `${login} bot successfully added on ${this.timestamp()}`;
        let res = (proc) ? botrep : 'Error';
        return validate;

      }
  }

  botuser(){
    let key = 'user';
    let proc = this.redis.hmset();
  }

  botChannel(){
    let key = 'user';
    let proc = this.redis.hmset();
  }

}
  