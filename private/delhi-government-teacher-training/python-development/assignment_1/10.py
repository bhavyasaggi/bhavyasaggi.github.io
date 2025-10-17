inp_str = input("Enter a string: ")
inp_dict = dict()
for inp_char in inp_str:
    inp_dict[inp_char] = inp_dict.get(inp_char, 0) + 1

print("Character frequencies: ", inp_dict)