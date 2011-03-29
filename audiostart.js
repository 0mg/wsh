var w = WScript.CreateObject("Wscript.Shell");
w.Run("sc start AudioSrv",0);
w.Run("net start Beep",0);
