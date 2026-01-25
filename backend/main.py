import os
from fastapi import FastAPI
from routes import emissoes
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(emissoes.router)

frontend_url = os.getenv("FRONTEND_URL", "").rstrip("/")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://jgp-credito-teste.vercel.app",
]

if frontend_url and frontend_url not in origins:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"mensagem": "API da rodando com sucesso!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)