// Windows Update に必要なサービスを開始する
var w = WScript.CreateObject("Wscript.Shell");
w.Run("sc config wuauserv start= auto", 0);
w.Run("sc start wuauserv", 0);
w.Run("sc config BITS start= demand", 0);
w.Run("sc start BITS", 0);
w.Run("sc config Eventlog start= auto", 0);
w.Run("sc start Eventlog", 0);
