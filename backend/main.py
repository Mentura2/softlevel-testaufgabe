from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from typing import List
import json
import re
import random
import time
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Book model
class Book(BaseModel):
    isbn: str
    image_name: str
    title: str
    author: str
    pages: str
    category: str
    price: float

# Load books from JSON file
def load_books(file_path: str) -> List[Book]:
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)
        return [Book(**book) for book in data]

books = load_books("books.json")

# Search service
class SearchService:
    def __init__(self, books: List[Book], slow: bool = False):
        self.books = books
        self.slow = slow

    def search(self, query: str) -> List[Book]:
        regex = re.compile(query, re.IGNORECASE)
        results = []

        for book in self.books:
            book_json = json.dumps(book.dict())
            if regex.search(book_json):
                results.append(book)
            if len(results) >= 25:
                break

        return results

    def get_random_delay(self):
        return random.uniform(0.5, 2.0)  # Delay between 500ms and 2000ms

search_service = SearchService(books, slow=False)
search_service_slow = SearchService(books, slow=True)

# Search endpoint
@app.get("/search")
async def search(query: str = Query(..., description="Search query")):
    if search_service.slow:
        time.sleep(search_service.get_random_delay())

    results = search_service.search(query)
    return JSONResponse(content=[book.dict() for book in results])

@app.get("/search-slow")
async def search_slow(query: str = Query(..., description="Search query")):
    if search_service_slow.slow:
        time.sleep(search_service_slow.get_random_delay())

    results = search_service_slow.search(query)
    return JSONResponse(content=[book.dict() for book in results])

# Image endpoint
@app.get("/images/{image_name}")
async def serve_image(image_name: str):
    image_path = os.path.join("./covers", image_name)
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(image_path)

@app.get("/")
async def root():
    return {"message": "Welcome to the Bookstore API!"}