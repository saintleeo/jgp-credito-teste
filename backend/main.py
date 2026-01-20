from fastapi import FastAPI
from routes import emissoes


app = FastAPI()

app.include_router(emissoes.router)

@app.get("/")
def home():
    return {"mensagem": "API da rodando com sucesso!"}

