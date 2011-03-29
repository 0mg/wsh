// 不要なサービスを停止する
var w = WScript.CreateObject("Wscript.Shell");
w.Run("sc config wuauserv start= disabled", 0);
w.Run("sc stop wuauserv", 0);
w.Run("sc config BITS start= disabled", 0);
w.Run("sc stop BITS", 0);
