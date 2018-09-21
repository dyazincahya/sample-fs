
const fsModule              = require("file-system");
const permissionsModule     = require("nativescript-permissions");
const platformModule        = require("platform");

const nsNode = require("./ns-node/fs");

const MainViewModel = require("./main-view-model");
var GetModel = new MainViewModel([]);

var context,
    androidApp = fsModule.knownFolders.documents().path,
    androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
    folder = fsModule.path.join(androidDownloadsPath, "kang-cahya"),
    file = fsModule.path.join(androidDownloadsPath, "kang-cahya", "xdata.csv");


function getPermission() {
    if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23) {
        let permisionOptions = [
            android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
            android.Manifest.permission.READ_EXTERNAL_STORAGE
        ];
        permissionsModule.requestPermission(permisionOptions, "I need these permissions to read from storage")
            .then(function () {
                console.log("Permissions granted!");
            })
            .catch(function () {
                console.log("Uh oh, no permissions - plan B time!");
            });
    }
}

exports.onNavigatingTo = function (args) {
    var page = args.object;
    context = GetModel;

    getPermission();

    context.set("titleData", "Lorem Ipsum");
    context.set("viewData", "Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting.");

    page.bindingContext = context;
};

exports.mkdir = function () {
    nsNode.mkdir(folder, null, function (err) { 
        // console.log("mkdir error: " + err) 
    });
    context.set("titleData", "Make Directory");
    context.set("viewData", "Folder berhasil dibuat "+ folder);
};

exports.writeFile = function () {
    nsNode.writeFile(file, "Hallo", null, function (err) { 
        // console.log("writeFile error: " + err); 
    });
    context.set("titleData", "Write File");
    context.set("viewData", "File berhasil dibuat " + file);
};

exports.readFile = function () {
    nsNode.readFile(file, function (err, data) {
        // console.log("readFile error: " + err);
        // console.log("readFile data: " + data);
        context.set("titleData", "Read File");
        context.set("viewData", data);
    });
};

exports.appendFile = function () {
    let text = ",Hihihi";
    nsNode.appendFile(file, text, null, function (err) { 
        // console.log("appendFile error: " + err); 
    });
    context.set("titleData", "Append File");
    context.set("viewData", text + " Berhasil ditabmbahkan");
};

exports.stat = function () {
    nsNode.stat(file, function (err, stats) {
        // console.log("stat error: " + err);
        // console.log("stat stats: " + JSON.stringify(stats));
        context.set("titleData", "Stat File");
        context.set("viewData", JSON.stringify(stats));
    });
};