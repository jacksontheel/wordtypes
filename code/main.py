from gensim.models import KeyedVectors
from sklearn.metrics.pairwise import cosine_similarity
import csv

def getScore(word, elem):
  try:
    return cosine_similarity([word_vectors[word.lower()]],[word_vectors[elem.lower()]])[0][0]
  except:
    return 0

def getElementMax(word):
  types = ["fire", "water", "grass", "electric", "ice", "poison", "air", "mind", "rock"]
  max = 0
  for t in types:
    check = getScore(word, t)
    if check > max:
      max = check
  return max

def getGood(word):
  return max(getScore(word, "good"), getScore(word, "Good"))

def getEvil(word):
  return max(getScore(word, "evil"), getScore(word, "Evil"))

word_vectors = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin.gz', binary=True)

def main():
  read = open("words.txt", "r")
  lines = []
  words = read.readlines()
  for word in words:
    word = word.strip()
    if getElementMax(word) > 0.2:
      newLine = [word, getScore(word, "fire"), getScore(word, "water"), getScore(word, "grass"), getScore(word, "electric"), \
        getScore(word, "ice"), getScore(word, "poison"), getScore(word, "air"), getScore(word, "mind"), getScore(word, "rock"),]
      lines.append(newLine)

  write = open("output.txt", "w")
  csvWrite = csv.writer(write)
  csvWrite.writerow(["word", "fire", "water", "grass", "electric", "ice", "poison", "air", "mind", "rock"])
  csvWrite.writerows(lines)

if __name__=="__main__":
    main()