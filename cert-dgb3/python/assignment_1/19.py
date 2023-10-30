inp_rows = int(input("Enter number of rows")) + 1
for row in range(1, inp_rows):
    print(" " * (inp_rows - row) + "*" * row)
