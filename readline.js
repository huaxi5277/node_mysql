const readline = require('readline')
const fs = require('fs')
const stream = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})




function get(key){
    fs.readFile('./data.json',(err , data)=>{
        if(err){
            throw err
        }
        let json = JSON.parse(data)
        console.log(json[key])
    })
}



function set(key, value) {
    fs.readFile("./data.json", (err, data) => {
      // 可能是空文件，则设置为空对象
      const json = data ? JSON.parse(data) : {};
      json[key] = value; // 设置值
      // 重新写入文件
      fs.writeFile("./data.json", JSON.stringify(json), err => {
        if (err) {
          console.log(err);
        }
        console.log("写入成功！");
      });
    });
  }





stream.on("line", function (input) {
    console.log(input)
    const [op, key, value] = input.split(" ");
  
    if (op === 'get') {
      get(key)
    } else if (op === 'set') {
      set(key, value)
    } else if (op === 'quit') {
      stream.close();
    } else {
      console.log('没有该操作');
    }
  });
  
  stream.on("close", function () {
    console.log("程序结束");
    process.exit(0);
  });