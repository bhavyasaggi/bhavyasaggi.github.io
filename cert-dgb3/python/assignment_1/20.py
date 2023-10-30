inp_rows = int(input("Enter Pascal Number: ")) + 1
for row in range(1, inp_rows):
    row_str = " " * (inp_rows - row)
    col_int = 1
    for col in range(1, row + 1):
        row_str += " " + str(col_int)
        col_int = col_int * (row - col) // col
    print(row_str)
