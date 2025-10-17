int_lines = int(input("Enter number of lines"))
for ix in range(1, 2 * int_lines):
    print("*" * (ix if ix <= int_lines else 2 * int_lines - ix))
