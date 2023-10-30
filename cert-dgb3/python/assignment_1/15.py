repl_val = int(input("Enter Replaced Value: "))


def repl_last(repl_set):
    if len(repl_set) == 0:
        return repl_set
    else:
        repl_list = list(repl_set)
        repl_list[-1] = repl_val
        return tuple(repl_list)


list_sample = [(10, 20, 40), (40, 50, 60), (70, 80, 90)]
list_update = list(map(repl_last, list_sample))
print(list_update)