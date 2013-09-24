@echo off

REM �����`�F�b�N
if "%1"=="" goto argerr
if not exist "%1" goto srcerr

REM �o�̓v���O�����̎��
set win=0
if "%2"=="-c" set win=0
if "%2"=="-w" set win=1
if "%2"=="" for /f "tokens=2 delims=<>" %%a in (%1) do (
  if "%%a"=="windows.h" set win=1
)

:var
  REM �R���p�C���I�v�V����
  set copt=
  if %win%==1 set copt=-mwindows
  set src=%~dpnx1
  set srb=%~dpn1

:main
  REM �R���p�C���O����
  set rcopt=
  if exist "%srb%.exe" del "%srb%.exe"
  if exist "%srb%.rc" goto rccompile
  goto compile

:rccompile
  REM ���\�[�X�t�@�C���t���R���p�C�����s
  if exist "%srb%.o" del "%srb%.o"
  windres "%srb%.rc" "%srb%.o" -c 65001
  set rcopt="%srb%.o"
  goto compile

:compile
  REM �ʏ�R���p�C�����s
  gcc %copt% "%src%" %rcopt% -o "%srb%.exe" -s -Wall -std=gnu99
  goto run

:run
  REM �o�̓v���O�������s
  if %win%==1 (start "" "%srb%.exe") else "%srb%.exe"
  goto end

:argerr
  REM �����G���[
  goto err

:srcerr
  REM ���̓t�@�C���G���[
  echo file "%1" is not exist
  goto err

:err
  REM ��ʃG���[
  echo usage: %~nx0 filename.c [-c^|-w]
  goto end

:end
