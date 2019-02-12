// At the top of your webpack config, insert this
var fs = require("fs");
var gracefulFs = require("graceful-fs");
gracefulFs.gracefulify(fs);

var lineReader = require("readline").createInterface({
  input: fs.createReadStream("../src/constants/words.js")
});

lineReader.on("line", function(line) {
  fs.appendFile(
    "../src/constants/wordsGerman.js",
    '"' + `${line}` + '",' + "\n",
    err => {
      // throws an error, you could also catch it here
      if (err) throw err;
    }
  );
});
