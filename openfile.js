if (WScript.arguments.length) {
  WScript.createObject("WScript.Shell").run(WScript.arguments(0));
} else {
  WScript.echo("usage: " + WScript.ScriptName + " \"<command line>\"");
}
