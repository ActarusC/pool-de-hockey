import pandas as pd, sqlite3, requests
import hockey_scraper as hs
import numpy as np
from datetime import date, timedelta, datetime

conn = sqlite3.connect('C:/Users/huber/OneDrive/Hockey/NHL/DbMatchs.db')

def scrapePoints():
    ok = "Scrape fait"
    pbpDates = pd.read_sql("SELECT MAX(Date) FROM PBP", conn)
    maxDate = pbpDates.iloc[0]["MAX(Date)"]
    maxDate = pd.to_datetime(maxDate) + timedelta(days=1)
    maxDate = maxDate.strftime("%Y-%m-%d")
    ajd = date.today()
    ajd = ajd.strftime("%Y-%m-%d")

    try:
        scrape = hs.nhl.scrape_functions.scrape_date_range(maxDate, ajd,
                                if_scrape_shifts=True, data_format='pandas', preseason=False, rescrape=False, docs_dir=True)
        
        #pbp
        dfPBP = scrape["pbp"]
        dfPBP.to_sql('PBP', conn, if_exists='append', index = False)

        #shifts
        dfshifts = scrape["shifts"]
        dfshifts.to_sql('SHIFTS', conn, if_exists='append', index = False)
    except:
        print("erreur")
    return ok

scrapePoints()
print("Scrape fait")