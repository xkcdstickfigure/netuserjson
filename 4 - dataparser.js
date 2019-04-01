/*

IMPORTANT: If you stopped the net user script before completion, the last file alphabetically will be invalid. Delete it or it will cause errors!

*/

var fs = require('fs');
var users = {};
var prefixes = {
  group: "Global Group memberships     ",
  name: "Full Name                    ",
  blank: "                             "
};

fs.readdir('userdata', function(err, userdatafiles) {
  for (var i = 0; i < userdatafiles.length; i++) {
    console.log("Parsing " + userdatafiles[i] + "...");
    var userdata = fs.readFileSync("userdata/" + userdatafiles[i], 'utf8').split("\n");
    userdata.shift();
    userdata.shift();
    userdata.pop();
    userdata.pop();
    userdata.pop();
    var grouplines = [];
    var groups = [];
    for (var j = userdata.length - 1; userdata[j].indexOf(prefixes.group) === -1 && j > 0; j--) {
      grouplines.push(userdata[j].replace(prefixes.blank, ""));
    }
    grouplines.push(userdata[j].replace(prefixes.group, ""));
    grouplines.reverse();

    if (j > 0) {
      for (var j = 0; j < grouplines.length; j++) {
        var groupsinline = grouplines[j].split("*");
        groupsinline.shift();
        groupsinline[groupsinline.length - 1] = groupsinline[groupsinline.length - 1].replace("\r", "");
        groups = groups.concat(groupsinline);
      }
      for (var j = 0; j < groups.length; j++) { //Trim whitespace
        groups[j] = groups[j].trim();
      }
    }
    users[userdatafiles[i]] = {
      "name" : userdata[1].replace(prefixes.name, "").replace("\r", ""),
      "groups" : groups
    };
  }
  fs.writeFileSync("users.json", JSON.stringify(users, null, '\t'));
  console.log("Done!");
});