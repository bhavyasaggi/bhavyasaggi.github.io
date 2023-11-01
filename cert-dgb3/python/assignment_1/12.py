inp_range = int(input("Enter range"))
inp_sample = ["p", "q"]
out_list = list()
for i_sample in inp_sample:
    for i_range in range(1, inp_range + 1):
        out_list.append(i_sample + str(i_range))
print(out_list)