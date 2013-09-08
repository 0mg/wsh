// ���C�u����
var alert = function() {
  var args = [].slice.call(arguments);
  WScript.echo(args.join(" "));
};
var wsh = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");

// WSH �z�X�g
var isCScript = fso.getBaseName(WScript.fullName) === "cscript";

// �����`�F�b�N
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

// ���̓t�@�C��
var srcFilePath = fso.getAbsolutePathName(srcFilePathA);
var srcFileName = fso.getFileName(srcFilePath);
var srcFolderName = fso.getParentFolderName(srcFilePath);

// �o�̓t�@�C��
var dstFolderName = srcFolderName;
var dstFileName = fso.getBaseName(srcFileName) + ".exe";
var dstFilePath = dstFolderName + "\\" + dstFileName;

// �R���p�C���R�}���h�ݒ�
var gccOption =
  typeofOutputExeA === "-w" ? "-mwindows" :
  "";
var gccCmd =
  "gcc " + gccOption + " -s -Wall " + srcFilePath + " -o " + dstFilePath;

// �R���p�C��
if (fso.fileExists(dstFilePath)) {
  fso.deleteFile(dstFilePath);
}
var gcc = wsh.exec(gccCmd);
while (gcc.status === 0) {
  WScript.sleep(100);
}

// �o�̓t�@�C�����s
if (isCScript || !fso.fileExists(dstFilePath)) {
  alert(gcc.stdout.readAll() + "\n" + gcc.stderr.readAll());
}
var dstExe = wsh.exec(dstFilePath);
if (typeofOutputExeA === "-c") {
  alert(dstExe.stdout.readAll());
}
