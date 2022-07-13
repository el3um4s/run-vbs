set args = Wscript.Arguments

Dim name, surname

Dim count
count = WScript.arguments.count

if count = 0 then
    name = ""
    surname = ""
end if

if count = 1 then
    name = args(0)
    surname = ""
end if

if count = 2 then
    name = args(0)
    surname = args(1)
end if


