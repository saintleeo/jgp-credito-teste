from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base

# cria a base do bando de dados
Base = declarative_base()

class Emissao(Base):
    __tablename__ = 'emissoes'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    data = Column(Date, nullable=False)
    tipo = Column(String, nullable=False)
    emissor = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    link = Column(String)