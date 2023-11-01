inp_str = input("Enter a string: ")
chk_str = inp_str[-3:]
if len(chk_str) < 3:
    print(inp_str)
elif chk_str == "ing":
    print(inp_str + "ly")
else:
    print(inp_str + "ing")
