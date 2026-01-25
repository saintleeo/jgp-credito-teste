import pandas as pd
from models import Base
from database import engine
import os

def importar():
    caminho = "../data/Primario_2025.xlsx"
    if not os.path.exists(caminho):
        print("Erro: Arquivo não encontrado")
        return

    df = pd.read_excel(caminho)

    df.columns = [c.lower() for c in df.columns]
    df['data'] = pd.to_datetime(df['data']).dt.date
    df['valor'] = pd.to_numeric(df['valor'], errors='coerce').fillna(0)

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    df.to_sql('emissoes', con=engine, if_exists='append', index=False)
    print("Dados importados com sucesso!")

if __name__ == "__main__":
    importar()