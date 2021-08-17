const fs = require('fs');
const path = require('path');
const moment = require('moment');
const cron = require('node-cron');


class Logger {

  constructor(dest=path.join(__dirname, '/logfiles/'), fileName= 'log.json'){
    this.dest = dest;
    this.fileName = fileName;
    this.task=null;
  }

  errorParser(error){
    const errorData = {
      message:error.message,
      time: moment(),
      code: error.code,
      stackTrace: error.stack,
    };
    return errorData;
  }

  file(error){
    try{
      const filepath = path.join(this.dest, this.fileName);
      if(!fs.existsSync(this.dest)){
        fs.mkdirSync(this.dest, { recursive: true });
      }
      if(!fs.existsSync(filepath)){
        const errorData = this.errorParser(error);
        const data = [];
        data.push(errorData);
        fs.writeFileSync(filepath, JSON.stringify(data));
      }
      else{
        const existDataString = fs.readFileSync(filepath, { encoding:'utf8' });
        const existData = JSON.parse(existDataString);
        const errorData = this.errorParser(error);
        existData.push(errorData);
        fs.writeFileSync(filepath, JSON.stringify(existData));
      }
    }
    catch(e){
      console.error(e);
    }
  }

  console(error){
    const data = this.errorParser(error);
    console.error(data);
  }

  copyAndClear(tofileName){
    try{
      const filepath = path.join(this.dest, this.fileName);
      const newPath = path.join(this.dest, tofileName);
      if(!fs.existsSync(filepath)){
        return;
      }
      else{
        const existDataString = fs.readFileSync(filepath, { encoding:'utf8' });
        const existData = JSON.parse(existDataString);
        const newData = existData.map((item)=>{
          return {
            message: item.message,
            code: item.code,
            time: item.time,
          };
        });
        fs.writeFileSync(newPath, JSON.stringify(newData));
        fs.unlinkSync(filepath);
      }
    }
    catch(e){
      this.console.error(e);
    }
  }

  runEveryDayAt(time){
    const hour = time.split(':')[0];
    const minutes = time.split(':')[1];
    const croneTime = `00 ${minutes} ${hour} * * *`;
    if(cron.validate(croneTime)){
      this.task = cron.schedule(croneTime, ()=>{
        this.copyAndClear(`log${moment().format('_YYYY_MM_DD')}.json`);
      });
    }
    else{
      const error = new Error('Task not running. Invalid cron time syntax');
      this.file(error);
      this.console(error);
    }
  }

  stop(){
    this.task.stop();
  }
}

module.exports=Logger;
