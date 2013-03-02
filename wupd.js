// サービス情報を取得
function getSvc(svcname) {
  var wmi = GetObject("winmgmts:");
  var ctx = wmi.ExecQuery("select * from Win32_Service where name='" +
    svcname + "'");
  return new Enumerator(ctx).item();
}

// WindowsUpdate に必要なサービスについて、
// 現在の スタートアップの種類, スタート状態 を記憶しておく
var svc = {
  wuau: getSvc("wuauserv"),
  bits: getSvc("bits"),
  evlg: getSvc("eventlog")
};

// WindowsUpdate に必要なサービスの 状態変更・開始
for (var i in svc) {
  var target = svc[i];
  target.ChangeStartMode("Automatic");
  target.StartService();
}

// WindowsUpdate 実行
var shell = WScript.CreateObject("Wscript.Shell");
shell.Run("iexplore http://update.microsoft.com", 1, true);

// WindowsUpdate ウィンドウが閉じたらサービスの状態を元の状態に戻す
var CHANGE_START_MODE_ARG_MAP = {
  "Auto": "Automatic",
  "Manual": "Manual",
  "Disabled": "Disabled"
};
for (var i in svc) {
  var target = svc[i];
  target.ChangeStartMode(CHANGE_START_MODE_ARG_MAP[target.StartMode]);
  target.Started || target.stopService();
}
