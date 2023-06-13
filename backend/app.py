 
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import pickle
import json
import datetime as dt
from dateutil.relativedelta import relativedelta
from typing import Optional


import bs4 as bs
import urllib.request
import requests
import zipfile
import io

#########################################################################################################

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv('seattle-weather.csv')

@app.get("/")
async def root():
    return {"message": "seatle data from csv "}


@app.get("/data")
async def data():
    return {"data": df.to_dict(orient="records")}








