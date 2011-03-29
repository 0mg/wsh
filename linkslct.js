if (WScript.arguments.length &&
WScript.arguments(0).split(".").pop() === "lnk") {
  var wsh = WScript.createObject("WScript.Shell");
  var lnk = wsh.createShortcut(WScript.Arguments(0));
  wsh.Run('explorer /select, "' + lnk.targetpath + '"');
}
