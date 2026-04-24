from fastapi import FastAPI

app = FastAPI()

#Now we need to make the endpoints 

@app.get("/shalin-tim")
def getShalin():
    return {"message": "Hiiiiiiiii this is shalin"}
    


    
    
