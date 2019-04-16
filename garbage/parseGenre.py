of = open("./vocab.txt", 'w')
of.write("vocab (GenreList) {\n")
with open("./genres.txt", 'r') as f:
    for line in f:
        of.write("  \"" + line[:-1] + "\"\n")
    of.write("}")
