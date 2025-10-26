import random
import json
import os

list_by_word_type = {
    "noun": "lists/noun.json",
    "adjective": "lists/adjective.json",
    "first_name": "lists/first_name.json",
    "last_name": "lists/last_name.json",
    "of": "lists/of.json",
    "ofthe": "lists/ofthe.json",
    "preadjective": "lists/preadjective.json",
    "prefix": "lists/prefix.json",
    "suffix": "lists/suffix.json",
    "title": "lists/title.json",
}

word_combinations = [
    "[title] [first_name]",
    "[title] [last_name]",
    "[title] [first_name] [suffix]",
    "[title] [last_name] [suffix]",
    "[title] of [of]",
    "[title] of the [ofthe]",
    "[title] [noun]",
    "[title] [noun] of [of]",
    "[title] [noun] of the [ofthe]",
    "[adjective] [title]",
    "[adjective] [title] [last_name]",
    "[adjective] [title] of [of]",
    "[adjective] [title] of the [ofthe]",
    "[adjective] [title] [noun]",
    "[adjective] [title] [noun] of [of]",
    "[adjective] [title] [noun] of the [ofthe]",
    "[adjective] [title] [noun] of [of] of the [ofthe]",
    "[adjective] [title] [noun] of the [ofthe] of [of]",
    "[adjective] [title] [noun] of the [ofthe] of the [ofthe]",
    "[preadjective] [adjective] [title]",
    "[preadjective] [adjective] [title] of [of]",
    "[preadjective] [adjective] [title] of the [ofthe]",
    "[preadjective] [adjective] [title] [noun]",
    "[preadjective] [adjective] [title] [noun] of [of]",
    "[preadjective] [adjective] [title] [noun] of the [ofthe] of the [ofthe]",
    "[prefix] [title] [first_name]",
    "[prefix] [title] [last_name]",
    "[prefix] [title] of [of]",
    "[prefix] [title] of the [ofthe]",
    "[prefix] [title] [noun]",
    "[prefix] [title] [noun] of [of]",
    "[prefix] [title] [noun] of the [ofthe]",
    "[adjective] [noun]",
    "[adjective] [adjective] [noun]",
    "[preadjective] [adjective] [noun]",
    "[noun]",
    "[noun] [suffix]",
    "The [noun]",
    "[noun] [noun]",
    "The [noun] of [noun]",
    "The [noun] [suffix]",
    "The [last_name] [suffix]",
]


def generate_word():
    word_combination = random.choice(word_combinations)
    return replace_words(word_combination)


def replace_words(word_combination):
    while "[" in word_combination:
        start = word_combination.find("[")
        end = word_combination.find("]")
        word_type = word_combination[start + 1 : end]
        if word_type in list_by_word_type:
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


def main():
    print(generate_word().title())


if __name__ == "__main__":
    main()
