// Windows Update
var w = WScript.CreateObject("Wscript.Shell");
w.Run("wuau.js", 0);
w.Run("iexplore http://update.microsoft.com", 1, true);
w.Run("wuaustop.js", 0);
