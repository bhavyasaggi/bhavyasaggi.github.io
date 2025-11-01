def precomb(pre_str, post_list):
    if len(post_list) == 0:
        print(pre_str)
    else:
        it_list = post_list[0]
        nx_list = post_list[1:]
        for post_char in it_list:
            precomb(pre_str + post_char, nx_list)


sample_dict = {"1": ["a", "b"], "2": ["c", "d"], "3": ["e", "f"]}
precomb("", list(sample_dict.values()))