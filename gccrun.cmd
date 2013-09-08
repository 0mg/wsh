@echo off

REM 引数チェック
if "%1"=="" goto argerr
if not exist "%1" goto srcerr

REM 出力プログラムの種類
set win=0
if "%2"=="-c" set win=0
if "%2"=="-w" set win=1
if "%2"=="" for /f "tokens=2 delims=<>" %%a in (%1) do (
  if "%%a"=="windows.h" set win=1
)

:var
  REM コンパイルオプション
  set copt=
  if %win%==1 set copt=-mwindows
  set src=%~dp1%~nx1
  set srb=%~dp1%~n1

:main
  REM コンパイル前処理
  if exist %srb%.exe del %srb%.exe
  if exist %srb%.rc goto rccompile
  goto compile

:rccompile
  REM リソースファイル付きコンパイル実行
  windres %srb%.rc %srb%.o
  gcc %copt% %src% %srb%.o -o %srb%.exe -s -Wall
  goto run

:compile
  REM 通常コンパイル実行
  gcc %copt% %src% -o %srb%.exe -s -Wall
  goto run

:run
  REM 出力プログラム実行
  if %win%==1 (start %srb%.exe) else %srb%.exe
  goto end

:argerr
  REM 引数エラー
  goto err

:srcerr
  REM 入力ファイルエラー
  echo file "%1" is not exist
  goto err

:err
  REM 一般エラー
  echo usage: %~nx0 filename.c [-c^|-w]
  goto end

:end
