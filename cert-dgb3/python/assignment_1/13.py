list_1 = ["red", "orange", "green", "blue", "white"]
list_2 = ["black", "yellow", "green", "blue"]
set_1 = set(list_1)
set_2 = set(list_2)
print("Color1-Color2: ", list(set_1.difference(set_2)))
print("Color2-Color1: ", list(set_2.difference(set_1)))
