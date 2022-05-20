import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


def main():
    # Load csv
    redtide_tweets = pd.read_csv('historical_tweets_with_sentiment.csv', encoding="ISO-8859-1")
    redtide_tweets['created_at'] = pd.to_datetime(redtide_tweets['created_at'], infer_datetime_format=True)
    # print(redtide_tweets['created_at'])

    print("Splitting positive and negative detections...")
    for i in range(len(redtide_tweets['predicted_sentiment'])):
        if redtide_tweets['predicted_sentiment'][i]:
            redtide_tweets.loc[i, 'positive'] = 1
            redtide_tweets.loc[i, 'negative'] = 0
            redtide_tweets.loc[i, 'predicted_sentiment'] = "Positive"
        else:
            redtide_tweets.loc[i, 'positive'] = 0
            redtide_tweets.loc[i, 'negative'] = 1
            redtide_tweets.loc[i, 'predicted_sentiment'] = "Negative"

    redtide_tweets['positive'] = redtide_tweets['positive'].astype(int)
    redtide_tweets['negative'] = redtide_tweets['negative'].astype(int)

    pd.set_option("display.max_columns", None)
    redtide_tweets_grouped_months = redtide_tweets[['positive', 'negative']].groupby(redtide_tweets['created_at'].dt.month).sum()

    print("Generating bar chart...")
    redtide_tweets_grouped_months.plot(kind='bar')
    plt.title("Redtide Sentiment (2017-2018)")
    plt.xlabel("Month")
    plt.ylabel("Number of Tweets")
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    main()
