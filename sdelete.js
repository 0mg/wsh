//
// Secure Delete SendToTarget
//
if (WScript.arguments.length) {
  var wsh = WScript.createObject("WScript.Shell");
  var fso = WScript.createObject("Scripting.FileSystemObject");
  //
  //  �����I�u�W�F�N�g��z��
  //
  for (var wsh_args = [], i = 0; i < WScript.arguments.length; ++i) {
    wsh_args.push(WScript.arguments.item(i));
  }
  wsh_args = optArgs(wsh_args);
  //
  //  �z��̏d�����Ȃ���
  //
  function optArgs(args) {
    base: for (var opted_args = [], i = 0; i < args.length; ++i) {
      for (var j = i + 1; j < args.length; ++j) {
        if (args[i] === args[j]) continue base;
      }
      opted_args.push(args[i]);
    }
    return opted_args;
  }
  //
  //  �����̕����񂪎��݂���t�@�C��/�t�H���_���Ȃ�z��Ɋi�[����
  //
  var files = [];
  for (var i = 0; i < wsh_args.length; ++i) {
    var arg = wsh_args[i];
    if (fso.fileExists(arg)) files.push(fso.getFile(arg));
    else if (fso.folderExists(arg)) files.push(fso.getFolder(arg));
    else WScript.echo(arg + " �̓t�@�C���ł͂Ȃ����A�������݂��܂���");
  }
  //
  //  �t�@�C��/�t�H���_���폜����
  //
  if (files.length) {
    files = optArgs(files); // "hoge.bak" �� ".\hoge.bak" �Ȃǂ̏d���𐮗�
    if (wsh.popup(files.length + " �̃A�C�e���𖕏����܂���?\n\n" +
    files.join("\n"), 0, "Secure Delete", 3 + 48) === 6) {
      for (var i = 0; i < files.length; ++i) {
        wsh.run('sdelete -s "' + files[i].path + '"', 0);
      }
    }
  }
} else WScript.echo("�t�@�C�����������Ƃ��ēn���ĉ�����");
