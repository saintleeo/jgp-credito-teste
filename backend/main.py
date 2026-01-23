from fastapi import FastAPI
from routes import emissoes
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(emissoes.router)
app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="frontend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"mensagem": "API da rodando com sucesso!"}

