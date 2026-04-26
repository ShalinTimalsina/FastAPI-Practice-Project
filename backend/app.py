from fastapi import FastAPI , HTTPException, Depends
from backend.schemas import PostCreate , PostResponse
from sqlalchemy.orm import Session
from backend.models import Post
from backend.database import Base , engine , get_db
from fastapi.middleware.cors import CORSMiddleware


# Create Tables 
Base.metadata.create_all(bind=engine)


app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite
    "http://localhost:3000",  # CRA
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Now we need to make the endpoints 

@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts", response_model=list[PostResponse])
def get_all_posts(limit: int | None = None, db: Session = Depends(get_db)):
    query = db.query(Post)
    if limit:
        query = query.limit(limit)
    return query.all()
 
    
 ## Get Endpoint
@app.get("/posts/{id}", response_model=PostResponse)
def get_posts_by_id(id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

  
## Post Endpoint  
@app.post("/posts", response_model=PostResponse)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    new_post = Post(**post.model_dump())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

## Update Endpoint
@app.put("/posts/{id}", response_model=PostResponse)
def update_post(id: int, updated_post: PostCreate, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    for key, value in updated_post.model_dump().items():
        setattr(post, key, value)

    db.commit()
    db.refresh(post)

    return post


## Delete Endpoint
@app.delete("/posts/{id}")
def delete_post(id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    db.delete(post)
    db.commit()

    return {"message": "Post deleted successfully"}
    
    
