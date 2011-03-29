var w = WScript.CreateObject("Wscript.Shell");
w.Run("sc config Dhcp start =auto",0);
w.Run("sc config Netman start =demand",0);
w.Run("sc start Dhcp",0);
w.Run("sc start Netman",0);
