// ライブラリ
var alert = function() {
  var args = [].slice.call(arguments);
  WScript.echo(args.join(" "));
};
var wsh = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");

// WSH ホスト
var isCScript = fso.getBaseName(WScript.fullName) === "cscript";

// 引数チェック
var wsargs = WScript.arguments;
var typeofOutputExeA;
var srcFilePathA;

if (!wsargs.length) {
  alert(
    "usage: . [-w|-c] filename.c\n" +
    "w: Window App\n" +
    "c: Console App"
  );
  WScript.quit();
} else if (wsargs.length === 1) {
  typeofOutputExeA = "-w";
  srcFilePathA = wsargs(0);
} else {
  typeofOutputExeA = wsargs(0);
  srcFilePathA = wsargs(1);
}
if (!fso.fileExists(srcFilePathA)) {
  alert(srcFilePathA + " is not exist");
  WScript.quit();
}

// 入力ファイル
var srcFilePath = fso.getAbsolutePathName(srcFilePathA);
var srcFileName = fso.getFileName(srcFilePath);
var srcFolderName = fso.getParentFolderName(srcFilePath);

// 出力ファイル
var dstFolderName = srcFolderName;
var dstFileName = fso.getBaseName(srcFileName) + ".exe";
var dstFilePath = dstFolderName + "\\" + dstFileName;

// コンパイルコマンド設定
var gccOption =
  typeofOutputExeA === "-w" ? "-mwindows" :
  "";
var gccCmd =
  "gcc " + gccOption + " -s -Wall " + srcFilePath + " -o " + dstFilePath;

// コンパイル
if (fso.fileExists(dstFilePath)) {
  fso.deleteFile(dstFilePath);
}
var gcc = wsh.exec(gccCmd);
while (gcc.status === 0) {
  WScript.sleep(100);
}

// 出力ファイル実行
if (isCScript || !fso.fileExists(dstFilePath)) {
  alert(gcc.stdout.readAll() + "\n" + gcc.stderr.readAll());
}
var dstExe = wsh.exec(dstFilePath);
if (typeofOutputExeA === "-c") {
  alert(dstExe.stdout.readAll());
}
