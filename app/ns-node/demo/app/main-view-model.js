var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var fs = require("file-system");
var nodefs = require("nativescript-node/fs");

var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }

  var folder = fs.path.join(fs.knownFolders.documents().path, "nodefiles");
  var file = fs.path.join(fs.knownFolders.documents().path, "nodefiles", "myfile.txt");

  DemoAppModel.prototype.mkdir = function () {
    nodefs.mkdir(folder, null, function (err) { console.log("mkdir error: " + err)});
  };

  DemoAppModel.prototype.readFile = function () {
    nodefs.readFile(file, function (err, data) {
      console.log("readFile error: " + err);
      console.log("readFile data: " + data);
    });
  };

  DemoAppModel.prototype.writeFile = function () {
    nodefs.writeFile(file, "foo", null, function (err) {
      console.log("writeFile error: " + err);
    });
  };

  DemoAppModel.prototype.appendFile = function () {
    nodefs.appendFile(file, "bar", null, function (err) {
      console.log("appendFile error: " + err);
    });
  };

  DemoAppModel.prototype.stat = function () {
    nodefs.stat(file, function (err, stats) {
      console.log("stat error: " + err);
      console.log("stat stats: " + JSON.stringify(stats));
    });
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();