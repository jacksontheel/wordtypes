from gensim.models import KeyedVectors
from sklearn.metrics.pairwise import cosine_similarity
import csv
import json
import argparse


def getScore(vector, word, types):
    try:
        max = 0
        for t in types:
            check = cosine_similarity([vector[word.lower()]],[vector[t.lower()]])[0][0]
            if check > max:
                max = check
        return max
    except:
        return 0

def getElementMax(vector, word, typeInfo):
    max = 0
    for t in typeInfo["Types"]:
        check = getScore(vector, word, t["Keywords"])
        if check > max:
            max = check
    return max


def main(vectorFile, wordFile, typesFile, outputFile):
    # Load vector file (this takes a long time for large files)
    vector = KeyedVectors.load_word2vec_format(vectorFile, binary=True)

    # Get list of words
    read = open(wordFile, "r")
    lines = []
    words = read.readlines()

    # Get typeInfo from JSON 
    file = open(typesFile)
    typeInfo = json.load(file)

    # Get typenames into array
    types = []
    for t in typeInfo["Types"]:
        types.append(t["Name"])

    for word in words:
        word = word.strip()
        if getElementMax(vector, word, typeInfo) > 0.2: # Arbitrary threshold
            newLine = []
            newLine.append(word)
            for t in typeInfo["Types"]:
                newLine.append(getScore(vector, word, t["Keywords"]))
            lines.append(newLine)

    # Writes to output file as csv
    write = open(outputFile, "w")
    csvWrite = csv.writer(write)
    # Write a header row
    csvWrite.writerow(["word"] + types)
    # Write all data rows
    csvWrite.writerows(lines)

if __name__=="__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("vector_file", help="The word vector file to calculate connections from")
    parser.add_argument("words_file", help="The list of words to determine an association for")
    parser.add_argument("types_file", help="The JSON file to get types from")
    parser.add_argument("output_file", help="The file to create and output results to")

    args = parser.parse_args()

    main(args.vector_file, args.words_file, args.types_file, args.output_file)