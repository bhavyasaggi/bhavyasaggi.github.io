notes = [500, 200, 100, 50, 20, 10]
amount = int(input("input amount to breakdown"))
count = 0
for note in notes:
    note_amount = amount // note
    amount -= note * note_amount
    count += note_amount
print("Number of notes: ", count)