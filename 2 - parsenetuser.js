var lineparse = netuseroutput.split("\n");
for (var i = 0; i < 6; i++) {
 lineparse.shift();
}
while (lineparse[lineparse.length - 1] != "The command completed successfully.") {
 lineparse.pop();
}
lineparse.pop();
var usernames = [];
for (var a = 0; a < lineparse.length; a++) {
 var linenames = lineparse[a].split(" ");
 for (var b = 0; b < linenames.length; b++) {
  if (linenames[b] != "") {
   usernames.push(linenames[b]);
  }
 }
}
var file = usernames.join("\n");