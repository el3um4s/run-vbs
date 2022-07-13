set args = wscript.Arguments

Dim name, surname

Dim count
count = wscript.arguments.count

if count = 0 then
    name = ""
    surname = ""
    wscript.Echo "hello world"
end if

if count = 1 then
    name = args(0)
    surname = ""
    wscript.Echo "hello" & " " & name & "!"
end if

if count = 2 then
    name = args(0)
    surname = args(1)
    wscript.Echo "hello" & " " & name & " " & surname  & "!"
end if
