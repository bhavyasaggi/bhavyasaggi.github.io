s_size = int(input("Enter size: "))
s_mid = s_size // 2
for row in range(0, s_size):
    col_str = ""
    for col in range(0, s_size):
        if (
            (col == 0 and row < s_mid)
            or (col == s_size - 1 and row > s_mid)
            or (row == s_mid)
            or (col == s_mid)
            or (row == 0 and col > s_mid)
            or (row == s_size - 1 and col < s_mid)
        ):
            col_str += "*"
        else:
            col_str += " "
    print(col_str)
