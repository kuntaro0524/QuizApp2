#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os,sys, json
import pprint
import pandas as pd
from pymongo import MongoClient
client = MongoClient('localhost', 27017)


# CSVファイルを読み込んでJSONにする
df = pd.read_csv(sys.argv[1],encoding='utf-8')
# collectionの名前を定義する
collection_name = sys.argv[2]

# 新しい列を追加する　
df['ntrial']=0
df['ncorr']=0
df['corr_ratio']=0

print(df.columns)

# ページ数を数値に変換しておく
def str2f(page_str):
    print(type(page_str))
    if type(page_str) is int:
        return page_str
    else:
        print(type(page_str))
        int_page = int(page_str.replace("P","").replace("p",""))
        return int_page

df['page'] = df['page'].map(str2f)

# 選択したカラムだけ抽出することに
selected_df = df[['question', 'answer', 'page', 'made_date', 'ntrial', 'ncorr', 'corr_ratio','category']]

# ページ数の記述などがない場合にP999で埋めることに
pure_df=selected_df.fillna("P999")

# JSON へ変換
json_strings = df.to_json(orient='records')
parsed = json.loads(json_strings)

db = client.ibukiquiz
col = db[collection_name]

# 指定した collection_name　でクイズを登録
result = col.insert_many(parsed)
