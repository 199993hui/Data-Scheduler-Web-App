import pandas as pd 
import numpy as np 

import seaborn as sns
import matplotlib.pyplot as plt 
import statsmodels.api as sm
from mpl_toolkits.mplot3d import Axes3D

from sklearn.cluster import KMeans 
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

def clustering(df):
    numerical, categorical, df_cleaned = preprocessing(df)
    scaled_df = label_encoding(df_cleaned, categorical)
    relevant_features = feature_selection(scaled_df)

    return numerical, categorical, relevant_features, df_cleaned, scaled_df

def preprocessing(df):
    df_cleaned = df

    # Remove all the remaining null values
    df_cleaned = df.dropna(inplace=False)
    
    #Remove outlier
    # Remove outlier using standardized residuals
    # Select numerical and categorical attributes
    numerical_columns = df_cleaned.select_dtypes(include='number').columns.tolist()
    categorical_columns = df_cleaned.select_dtypes(include=['object', 'bool']).columns.tolist()

    return numerical_columns, categorical_columns, df_cleaned

def label_encoding(df_cleaned,categorical_columns):
    # Encode all categorical attributes 
    encoded_df = df_cleaned.copy()
    for col in categorical_columns:
        # Convert all entries of col to string, then apply LabelEncoder
        encoded_df[col] = encoded_df[col].astype('category').cat.codes
    # Initialise a StandardScaler
    scaler = StandardScaler()
    # Scale all attributes using StandardScaler
    scaled_df = scaler.fit_transform(encoded_df)
    scaled_df = pd.DataFrame(scaled_df, columns=encoded_df.columns)
    return scaled_df

def feature_selection(scaled_df):
    cor = scaled_df.corr()
    cor_target = abs(cor['LINE'])
    relevant_features = cor_target[cor_target>0.5]
    relevant_features = relevant_features.drop(index='LINE')
    return relevant_features.to_json(orient='index')


def number_k(scaled_df, features):

    inertia = []
    sil = []

    
    scaled_feature = scaled_df[features]

    # Dissimilarity would not be defined for a single cluster, thus, minimum number of clusters should be 2
    for k in range(2, 10):
        kmeans = KMeans(n_clusters = k).fit(scaled_feature)
        labels = kmeans.labels_
        inertia.append(kmeans.inertia_)
        sil.append(silhouette_score(scaled_feature, labels, metric = 'euclidean'))

    return inertia, sil, scaled_feature

def result(df_cleaned, scaled_df, scaled_feature, k):

    kmeans = KMeans(n_clusters=k).fit(scaled_feature)
    labels = kmeans.labels_
    df_cleaned['cluster'] = labels + 1
    scaled_df['cluster'] = labels + 1

    clusters = df_cleaned.groupby('cluster').agg({'cluster':'count'})
    clust_means = df_cleaned.groupby('cluster').agg('mean').round(2)

    return df_cleaned, scaled_df, clusters, clust_means