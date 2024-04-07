from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os

this_file_directory_full_path = os.path.dirname(os.path.realpath(__file__))
serve_directory = os.path.join(this_file_directory_full_path, "../frontend-mockup")

app = FastAPI()
app.mount("/", StaticFiles(directory=serve_directory), name="static")
    