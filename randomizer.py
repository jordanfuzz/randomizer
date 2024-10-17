import random
import json
import os
import string
import argparse

list_by_word_type = {
    "verb": "lists/words/verb.json",
    "verbs": "lists/words/verbs.json",
    "verbed": "lists/words/verbed.json",
    "verbing": "lists/words/verbing.json",
    "noun": "lists/words/noun.json",
    "nouns": "lists/words/nouns.json",
    "adjective": "lists/words/adjective.json",
    "first_name": "lists/names/first_name.json",
    "last_name": "lists/names/last_name.json",
    "all_nouns": "lists/words/all_nouns.json",
}

word_combinations = [
    "[first_name]",
    "[first_name] [last_name]",
    "[last_name]",
    "[adjective] [first_name]",
    "[adjective] [last_name]",
    "[adjective] [noun]",
    "[adjective] [adjective] [noun]",
    "[adjective] [nouns]",
    "[noun]",
    "[noun] [noun]",
    "[noun] [verber]",
    "The [noun] of [noun]",
    "The [verber]",
    "The [verber] of [noun]",
    "The [noun]",
    "The [noun] [verber]",
]


def rand(end):
    return random.randint(0, end - 1)


def get_base_word():
    roll = rand(3)
    if roll == 0:
        existing_word = get_random_word_from_list(
            random.choice(
                ["lists/special/list_o_words.json", "lists/special/cat_names.json"]
            )
        )
        return existing_word
    else:
        return generate_word()


def generate_word():
    word_combination = random.choice(word_combinations)
    return replace_words(word_combination)


def replace_words(word_combination):
    while "[" in word_combination:
        start = word_combination.find("[")
        end = word_combination.find("]")
        word_type = word_combination[start + 1 : end]
        if word_type == "verber":
            word = get_random_word_from_list("lists/words/verb.json")
            if word[-1] == "e":
                word = word[:-1]
            word_combination = (
                word_combination[:start] + word + "er" + word_combination[end + 1 :]
            )
        elif word_type == "noun":
            roll = rand(4)
            if roll == 0:
                word = get_random_word_from_list("lists/words/noun.json")
            else:
                word = get_random_word_from_list("lists/words/all_nouns.json")
            word_combination = (
                word_combination[:start] + word + word_combination[end + 1 :]
            )
        elif word_type in list_by_word_type:
            word = get_random_word_from_list(list_by_word_type[word_type])
            word_combination = (
                word_combination[:start] + word + word_combination[end + 1 :]
            )
    return word_combination


def get_random_word_from_list(json_file):
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, json_file)
    with open(file_path, "r", encoding="utf-8") as file:
        words = json.load(file)
    return random.choice(words)


def swap_letters(word):
    if not word:
        return word
    if word.lower() in ["a", "i", "the", "of", "and", "or", "to", "in", "on"]:
        return word
    random_letter = random.choice(string.ascii_lowercase)
    return random_letter + word[1:]


def swap_letters_in_string(sentence):
    words = sentence.split()
    swapped_words = [swap_letters(word) for word in words]
    return " ".join(swapped_words)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-s",
        "--swap",
        help="Swap the first letter of each word with a random letter",
        action="store_true",
    )

    args = parser.parse_args()

    base_word = get_base_word()
    if args.swap:
        print(swap_letters_in_string(base_word).title())
    else:
        print(base_word.title())


if __name__ == "__main__":
    main()
