def permute_string(p_string, start=0):
    end = len(p_string)
    if start == end:
        print('"', p_string, '",')
    else:
        for idx in range(start, end):
            p_string_copy = [c_string for c_string in p_string]
            p_string_copy[start], p_string_copy[idx] = (
                p_string_copy[idx],
                p_string_copy[start],
            )
            p_string_copy = "".join(p_string_copy)
            permute_string(p_string_copy, start + 1)


permute_string("aeiou")