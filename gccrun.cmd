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
  set src=%~dp1%~nx1
  set srb=%~dp1%~n1

:main
  REM �R���p�C���O����
  if exist %srb%.exe del %srb%.exe
  if exist %srb%.rc goto rccompile
  goto compile

:rccompile
  REM ���\�[�X�t�@�C���t���R���p�C�����s
  windres %srb%.rc %srb%.o
  gcc %copt% %src% %srb%.o -o %srb%.exe -s -Wall
  goto run

:compile
  REM �ʏ�R���p�C�����s
  gcc %copt% %src% -o %srb%.exe -s -Wall
  goto run

:run
  REM �o�̓v���O�������s
  if %win%==1 (start %srb%.exe) else %srb%.exe
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
