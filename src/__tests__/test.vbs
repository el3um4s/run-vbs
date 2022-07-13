set args = Wscript.Arguments

Dim name, surname

Dim count
count = WScript.arguments.count

if count = 0 then
    name = ""
    surname = ""
    Wscript.Echo "hello world"
end if

if count = 1 then
    name = args(0)
    surname = ""
    Wscript.Echo "hello" & " " & name & "!"
end if

if count = 2 then
    name = args(0)
    surname = args(1)
    Wscript.Echo "hello" & " " & name & " " & surname  & "!"
end if
