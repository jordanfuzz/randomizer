import random
import json
import os

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
        return get_random_word_from_list(
            random.choice(
                ["lists/special/list_o_words.json", "lists/special/cat_names.json"]
            )
        )
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
    with open(file_path, "r") as file:
        words = json.load(file)
    return random.choice(words)


def main():
    base_word = get_base_word()
    print(base_word.title())


if __name__ == "__main__":
    main()
