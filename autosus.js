var sec = 60;
var attime = new Date(+new Date + (sec * 1000)).toLocaleTimeString();
var w = WScript.CreateObject("WScript.Shell");
var q = w.Popup("Standby at " + attime + "\n[OK] to abort", sec);
if (q === -1) {
  w.Run("nircmd standby");
}
