var w = WScript.CreateObject("Wscript.Shell");
w.Run("sc stop Dhcp",0);
w.Run("sc stop Netman",0);
