# https://www.analyticsvidhya.com/blog/2021/06/twitter-sentiment-analysis-a-nlp-use-case-for-beginners/
# Utilities
import re, string
import pandas as pd
import numpy as np

# Plotting
import seaborn as sns
import matplotlib.pyplot as plt
from wordcloud import WordCloud

# NLTK
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
import contractions

# SKLearn
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import confusion_matrix, classification_report, roc_curve, auc


def preprocess_text(data_original):
    # Copy original data before processing
    data = data_original.copy(deep=True)

    # Convert text to all lowercase characters
    print("Converting all text to lowercase...")
    data = data.str.lower()

    # Clean and remove urls from text using built in python regex
    print("Filtering urls...")
    data = data.apply(
        # https://gist.github.com/gruber/8891611
        lambda text: re.sub(r"""(?i)\b((?:https?:(?:/{1,3}|[a-z\d%])|[a-z\d.\-]+[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)/)(?:[^\s()<>{}\[\]]+|\([^\s()]*?\([^\s()]+\)[^\s()]*?\)|\([^\s]+?\))+(?:\([^\s()]*?\([^\s()]+\)[^\s()]*?\)|\([^\s]+?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])|(?:(?<!@)[a-z\d]+(?:[.\-][a-z\d]+)*[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)\b/?(?!@)))""", '', text)
    )

    # Clean twitter mentions from text
    print("Filtering mentions...")
    data = data.apply(
        lambda text: re.sub(r'@\w+', '', text)
    )

    # Expand contractions
    print("Expanding contractions...")
    data = data.apply(
        lambda text: " ".join([contractions.fix(word) for word in text.split()])
    )

    # Get list of english stopwords from NLTK package
    stops = set(stopwords.words('english'))

    # Use stopword list from nltk to clean stopwords from dataset
    print("Filtering stopwords...")
    data = data.apply(
        # Split all words from given text into list and create new list using only
        # words that are not in the stopwords list
        lambda text: " ".join([word for word in str(text).split() if word not in stops])
    )

    # Use built in python punctuation list to clean punctuation from dataset
    print("Filtering punctuation...")
    data = data.apply(
        # Take given text and replace all punctuation characters with empty
        # characters.
        lambda text: text.translate(str.maketrans('', '', string.punctuation))
    )

    # Clean numeric characters from dataset
    print("Filtering numeric characters...")
    data = data.apply(
        lambda text: re.sub(r'\d+', '', text)
    )

    # Split text into lists of words rather thing strings
    print("Tokenizing data...")
    data = data.apply(
        # Use NLTK tokenizer to split into list of words or "tokens"
        RegexpTokenizer(r'\w+').tokenize
    )

    # Apply stemming to text
    print("Stemming tokens...")
    data = data.apply(
        lambda text: [nltk.PorterStemmer().stem(word) for word in text]
    )

    # Rejoin tokens into strings
    data = data.str.join(" ")

    return data


def generate_wordcloud(data):
    # Generate wordcloud for negative tweets
    plt.figure(figsize=(20, 20))
    wc = WordCloud(max_words=1000, width=1600, height=800, collocations=False).generate(" ".join(data))
    plt.imshow(wc)
    plt.show()


def generate_confusion_matrix(y_test, y_pred):
    print(classification_report(y_test, y_pred))
    # Compute and plot the confusion matrix
    cf_matrix = confusion_matrix(y_test, y_pred)
    categories = ['Negative', 'Positive']
    group_names = ['True Neg', 'False Pos', 'False Neg', 'True Pos']
    group_percentages = ['{0:.2%}'.format(value) for value in cf_matrix.flatten() / np.sum(cf_matrix)]
    labels = [f'{v1}\n{v2}' for v1, v2 in zip(group_names, group_percentages)]
    labels = np.asarray(labels).reshape(2, 2)
    sns.heatmap(cf_matrix, annot=labels, cmap='Blues', fmt='', xticklabels=categories, yticklabels=categories)
    plt.xlabel("Predicted Values", fontdict={'size': 14}, labelpad=10)
    plt.ylabel("Actual Values", fontdict={'size': 14}, labelpad=10)
    plt.title("Confusion Matrix", fontdict={'size': 14}, pad=20)
    plt.show()


def generate_roc_curve(y_test, y_pred):
    print("Generating ROC Curve...")
    fpr, tpr, thresholds = roc_curve(y_test, y_pred)
    roc_auc = auc(fpr, tpr)
    plt.figure()
    plt.plot(fpr, tpr, color='darkorange', lw=1, label="ROC Curve (area = %0.2f)" % roc_auc)
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("ROC Curve")
    plt.legend(loc="lower right")
    plt.show()


def main():
    print("Loading Sentiment140 dataset...")
    sentiment140 = pd.read_csv("sentiment140_training.csv", encoding="ISO-8859-1",
                               names=['target', 'id', 'date', 'flag', 'user', 'text'])
    print("Extracting fields of interest...")
    sentiment140 = sentiment140[['text', 'target']].replace(4, 1)

    print("Preprocessing Sentiment140 dataset...")
    sentiment140['text'] = preprocess_text(sentiment140['text'])

    print("Preparing preprocessed data for model training...")
    x_train, x_test, y_train, y_test = train_test_split(sentiment140['text'], sentiment140['target'], test_size=0.20, random_state=26105111)

    # Vectorize the data so that it may be used with the nltk models
    vectoriser = TfidfVectorizer(ngram_range=(1, 2), max_features=500000)
    vectoriser.fit(x_train)

    x_train = vectoriser.transform(x_train)
    x_test = vectoriser.transform(x_test)

    print("Training Logistic Regression model...")
    model = LogisticRegression(C=2, max_iter=1000, n_jobs=-1)
    model.fit(x_train, y_train)

    print("Generating confusion matrix...")
    y_pred = model.predict(x_test)
    generate_confusion_matrix(y_test, y_pred)

    print("Generating ROC Curve...")
    generate_roc_curve(y_test, y_pred)

    print("Loading redtide dataset...")
    redtide_tweets = pd.read_csv("tweet_archive.csv")
    print("Extracting fields of interest...")
    redtide_tweets = redtide_tweets[['id_str', 'tweet_full_contents']]

    print("Preprocessing Redtide Dataset...")
    redtide_tweets_preprocessed = preprocess_text(redtide_tweets['tweet_full_contents'])

    print("Preparing preprocessed data for use with model...")
    redtide_tweets_vectorized = vectoriser.transform(redtide_tweets_preprocessed)

    print("Applying model to predict redtide sentiment...")
    redtide_sentiment = model.predict(redtide_tweets_vectorized)

    print("Appending predicted sentiments to redtide dataset...")
    redtide_tweets['predicted_sentiment'] = redtide_sentiment

    print("Splitting data into postitive and negative collections...")
    # Sentiment values 0 and 1 mean negative and positive respectively
    redtide_tweets_pos = redtide_tweets_preprocessed[redtide_tweets['predicted_sentiment'] == 1]
    redtide_tweets_neg = redtide_tweets_preprocessed[redtide_tweets['predicted_sentiment'] == 0]

    print("Generating negative wordcloud...")
    generate_wordcloud(redtide_tweets_neg)
    print("Generating positive wordcloud...")
    generate_wordcloud(redtide_tweets_pos)

    print("Saving redtide dataset to csv...")
    # Drop tweet content because we already have it in another database collection
    redtide_tweets = redtide_tweets[['id_str', 'predicted_sentiment']]
    redtide_tweets.to_csv('historical_tweets_with_sentiment.csv', index=False)


if __name__ == "__main__":
    main()
