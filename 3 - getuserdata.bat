for /F "tokens=*" %%A in (netuserparsed.txt) do net user /domain %%A > userdata/%%A
