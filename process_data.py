import json
from textblob import TextBlob
from itertools import permutations

def process_comments(input_file, write_file):
    with open(input_file) as data_file:
        data = json.load(data_file)['data']

    processed = [comment for comment in data if len(comment['text']) > 0]
    processed = [dict(
                    text=comment['text'],
                    likes=comment['likes'],
                    sentiment=TextBlob(comment['text']).sentiment.polarity
                ) for comment in processed]

    with open(write_file, 'w') as fp:
        json.dump(processed, fp)

def process_statuses(input_file, write_file):
    with open(input_file) as data_file:
        data = json.load(data_file)['data']

    processed = [dict(
                    message=status['message'],
                    likes=status['like_info']['like_count'],
                    sentiment=TextBlob(status['message']).sentiment.polarity
                ) for status in data]

    with open(write_file, 'w') as fp:
        json.dump(processed, fp)

process_comments('data/comments.json', 'data/comments_processed.json')
process_statuses('data/statuses.json', 'data/statuses_processed.json')


def check_permutations(str):
    """
    I was curious if TextBlob calculates the sentiment of a sentence
    by just summing the sentiment for all the words, so I checked if all
    permutations of the words in a sentence result in the same sentiment polarity.
    They do.
    """
    perms = [' '.join(p) for p in permutations(str.split())]
    polarity = TextBlob(perms[0]).sentiment.polarity
    return all([TextBlob(text).sentiment.polarity == polarity for text in perms])

# print check_permutations('TextBlob really favors =D')