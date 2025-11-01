mm_list = list(map(int, input("Enter comma-separated list of numbers").split(",")))
min_list = None
max_list = None
for item_list in mm_list:
    if min_list == None or min_list > item_list:
        min_list = item_list
    if max_list == None or max_list < item_list:
        max_list = item_list
print("Minimum Number in list: ", min_list)
print("Maximum Number in list: ", max_list)