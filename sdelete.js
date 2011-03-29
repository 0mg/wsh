//
// Secure Delete SendToTarget
//
if (WScript.arguments.length) {
  var wsh = WScript.createObject("WScript.Shell");
  var fso = WScript.createObject("Scripting.FileSystemObject");
  //
  //  引数オブジェクトを配列化
  //
  for (var wsh_args = [], i = 0; i < WScript.arguments.length; ++i) {
    wsh_args.push(WScript.arguments.item(i));
  }
  wsh_args = optArgs(wsh_args);
  //
  //  配列の重複をなくす
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
  //  引数の文字列が実在するファイル/フォルダ名なら配列に格納する
  //
  var files = [];
  for (var i = 0; i < wsh_args.length; ++i) {
    var arg = wsh_args[i];
    if (fso.fileExists(arg)) files.push(fso.getFile(arg));
    else if (fso.folderExists(arg)) files.push(fso.getFolder(arg));
    else WScript.echo(arg + " はファイルではないか、もう存在しません");
  }
  //
  //  ファイル/フォルダを削除する
  //
  if (files.length) {
    files = optArgs(files); // "hoge.bak" と ".\hoge.bak" などの重複を整理
    if (wsh.popup(files.length + " 個のアイテムを抹消しますか?\n\n" +
    files.join("\n"), 0, "Secure Delete", 3 + 48) === 6) {
      for (var i = 0; i < files.length; ++i) {
        wsh.run('sdelete -s "' + files[i].path + '"', 0);
      }
    }
  }
} else WScript.echo("ファイル名を引数として渡して下さい");
