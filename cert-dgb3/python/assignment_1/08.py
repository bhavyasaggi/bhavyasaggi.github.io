string_maps = {
    "1": "abc",
    "2": "def",
    "3": "ghi",
    "4": "jkl",
    "5": "mno",
    "6": "pqrs",
    "7": "tuv",
    "8": "wxy",
    "9": "z",
}
num_first, num_second = [
    string_maps[i] for i in input("enter 2 digit number combination of 1-9")
]
for i_first in num_first:
    for i_second in num_second:
        print(i_first + i_second)
