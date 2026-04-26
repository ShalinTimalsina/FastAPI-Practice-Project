from fastapi import FastAPI , HTTPException, Depends
from backend.schemas import PostCreate , PostResponse
from sqlalchemy.orm import Session
from backend.models import Post
from backend.database import Base , engine , get_db


# Create Tables 
Base.metadata.create_all(bind=engine)


app = FastAPI()

#Now we need to make the endpoints 

text_post = {
    1: {"title": "New Post", "content": "This is my first post!"},
    2: {"title": "Morning Thoughts", "content": "Starting the day with positivity ☀️"},
    3: {"title": "Tech Update", "content": "Learning FastAPI and loving it!"},
    4: {"title": "Travel Diaries", "content": "Exploring the mountains of Nepal 🏔️"},
    5: {"title": "Food Post", "content": "Just had an amazing momo platter 😋"},
    6: {"title": "Workout Log", "content": "Completed a 5km run today!"},
    7: {"title": "Study Time", "content": "Preparing for my cloud certification"},
    8: {"title": "Random Thought", "content": "Consistency beats motivation"},
    9: {"title": "Coding Life", "content": "Debugging is like solving a puzzle"},
    10: {"title": "Night Reflection", "content": "Grateful for today 🙏"}
}


@app.get("/posts", response_model=list[PostResponse])
def get_all_posts(limit: int | None = None, db: Session = Depends(get_db)):
    query = db.query(Post)
    if limit:
        query = query.limit(limit)
    return query.all()
 
    

@app.get("/posts/{id}", response_model=PostResponse)
def get_posts_id(id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

  
  
@app.post("/posts", response_model=PostResponse)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    new_post = Post(**post.model_dump())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

    
    
