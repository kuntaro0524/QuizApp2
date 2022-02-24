import sys
import pandas as pd

names=["JP","EN"]

try:
    df=pd.read_csv(sys.argv[1], encoding="utf-8", names=names)
except:
    try:
        df=pd.read_csv(sys.argv[1], encoding="shift-jis", names=names)
    except:
        df=pd.read_csv(sys.argv[1], encoding="cp932", names=names)

outname=sys.argv[1].replace(".csv","_read.csv")

#df= pd.read_csv("sample.csv", index_col=0,parse_dates=True,names=["DATE","CLOSE","OPEN","HIGH","LOW","VOL"])
df['trial']=0
df['ratio']=0
df['n_ok']=0

df.to_csv(outname,encoding="shift_jis",index=False)
df.to_csv("tmp.csv",encoding="shift_jis",index=False)

outname=sys.argv[1].replace(".csv",".json")
df.to_json(outname, force_ascii=False, orient='records')
