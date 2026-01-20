import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

#Configs do Banco
DB_PATH = "../data/jgp_credito.db"
engine = create_engine(f"sqlite:///{DB_PATH}")
Base = declarative_base()

#Tabelas
class Emissao(Base):
    __tablename__ = 'emissoes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    data = Column(Date, nullable=False)
    tipo = Column(String, nullable=False)
    emissor = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    link = Column(String)

Base.metadata.create_all(engine)

def importar_dados(caminho_excel):
    print("Lendo o arquivo..")
    df = pd.read_excel(caminho_excel)

    #tratando dados
    df.columns = [c.lower() for c in df.columns]
    df['data'] = pd.to_datetime(df['data']).dt.date
    df['valor'] = pd.to_numeric(df['valor'], errors='coerce').fillna(0).astype(float)

    print("Salvando no SQLite")
    df.to_sql('emissoes', con=engine, if_exists='replace', index=False)
    print("Importou!")

if __name__ == "__main__":
    arquivo = "../data/Primario_2025.xlsx"
    if os.path.exists(arquivo):
        importar_dados(arquivo)
    else:
        print("Arquivo não encontrado!")