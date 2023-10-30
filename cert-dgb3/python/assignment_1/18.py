inp_count = int(input("Enter number of rows"))
for row in range(1, inp_count + 1):
    col_str = ""
    for col in range(1, 2 * inp_count):
        if col <= row:
            col_str += str(col)
        elif col >= 2 * inp_count - row:
            col_str += str(2 * inp_count - col)
        else:
            col_str += " "
    print(col_str)
