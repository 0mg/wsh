var w = WScript.CreateObject("Wscript.Shell");
w.Run("sc stop AudioSrv",0);
w.Run("net stop Beep",0);
