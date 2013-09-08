@echo off
if "%1"=="" goto argerr
if not exist "%1" goto srcerr
set type=-mwindows
if "%2"=="-c" set type=
set src=%~dp1%~nx1
set srb=%~dp1%~n1
goto main
:main
  if exist %srb%.exe del %srb%.exe
  if exist %srb%.rc goto rccompile
  goto compile
:rccompile
  windres %srb%.rc %srb%.o
  gcc %type% %src% %srb%.o -o %srb%.exe -s -Wall
  goto run
:compile
  gcc %type% %src% -o %srb%.exe -s -Wall
  goto run
:run
  if "%1"=="-w" (start %srb%.exe) else %srb%.exe
  goto end
:argerr
  goto err
:srcerr
  echo file "%1" is not exist
  goto err
:err
  echo usage: %~nx0 filename.c [-c]
  goto end
:end
