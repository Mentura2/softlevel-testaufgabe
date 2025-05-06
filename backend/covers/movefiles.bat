@echo off
setlocal enabledelayedexpansion

rem Loop through each subfolder
for /r %%i in (*) do (
	
	move "%%i" ".\"
)

endlocal