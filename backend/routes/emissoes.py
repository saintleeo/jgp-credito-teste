from fastapi import APIRouter, HTTPException, Body
from datetime import datetime
from database import SessionLocal
from models import Emissao
from typing import Optional
from sqlalchemy import func 

router = APIRouter(prefix="/emissoes", tags=["Emissões"])

@router.get("/")
def listar_tudo(
    id: Optional[int] = None,
    data: Optional[str] = None,
    tipo: Optional[str] = None,
    emissor: Optional[str] = None,
    valor: Optional[float] = None,
    link: Optional[str] = None
):

    db = SessionLocal()

    try:
        consulta = db.query(Emissao)
        
        if id:
            consulta = consulta.filter(Emissao.id == id)
        if data:
            consulta = consulta.filter(Emissao.data == data)
        if tipo:
            consulta = consulta.filter(Emissao.tipo == tipo)
        if emissor:
            consulta = consulta.filter(Emissao.emissor.contains(emissor))
        if valor:
            consulta = consulta.filter(Emissao.valor == valor)
        if link: 
            consulta = consulta.filter(Emissao.link == link)

        resultados = consulta.all()
        return resultados
    finally:
        db.close()

@router.get("/stats")
def estatisticas():
    """
    Esta rota gera um resumo dos dados para o Dashboard.
    Retorna o total de emissões, o valor total e o valor por tipo.
    """
    db = SessionLocal()
    try:

        total_emissoes = db.query(func.count(Emissao.id)).scalar()

        valor_total = db.query(func.sum(Emissao.valor)).scalar() or 0

        resumo_por_tipo = db.query(
            Emissao.tipo, 
            func.sum(Emissao.valor)
        ).group_by(Emissao.tipo).all()

        estatisticas = {
            "contagem_total": total_emissoes,
            "valor_total_puro": valor_total,
            "valor_total_formatado": f"R$ {valor_total:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
            "por_tipo": [
                {
                    "tipo": tipo, 
                    "valor": valor,
                    "valor_formatado": f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
                } 
                for tipo, valor in resumo_por_tipo
            ]
        }

        return estatisticas

    finally:
        db.close()

@router.get("/{id}")
def listar_id(id: int):

    db = SessionLocal()
    try:
        item = db.query(Emissao).filter(Emissao.id == id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Emissão não encontrada")
        
        resultado = {
            "id": item.id,
            "data": item.data,
            "tipo": item.tipo,
            "emissor": item.emissor,
            "valor": item.valor,
            "valor_formatado": f"R$ {item.valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
            "link": item.link
        }

        return resultado
    finally:
        db.close()

@router.put("/{id}")
def editar_id(id: int, novos_dados: dict = Body(...)): # Adicionado Body(...)
    db = SessionLocal()
    try:
        emissao_db = db.query(Emissao).filter(Emissao.id == id).first()

        if not emissao_db:
            raise HTTPException(status_code=404, detail="Emissão não encontrada!")

        # Atualização simples e direta
        if "data" in novos_dados:
            try:
                # Converte a string 'YYYY-MM-DD' em um objeto date do Python
                data_string = novos_dados["data"]
                emissao_db.data = datetime.strptime(data_string, "%Y-%m-%d").date()
            except ValueError:
                raise HTTPException(status_code=400, detail="Formato de data inválido. Use AAAA-MM-DD")
        
        if "tipo" in novos_dados:
            emissao_db.tipo = str(novos_dados["tipo"]).upper().strip()
            
        if "emissor" in novos_dados:
            emissao_db.emissor = str(novos_dados["emissor"]).strip()

        if "valor" in novos_dados:
            try:
                # Converte e arredonda antes de salvar
                emissao_db.valor = round(float(novos_dados["valor"]), 2)
            except (ValueError, TypeError):
                raise HTTPException(status_code=400, detail="Valor numérico inválido")

        if "link" in novos_dados:
            emissao_db.link = novos_dados["link"]

        db.commit()
        db.refresh(emissao_db)
        return emissao_db
    
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        db.rollback()
        # Esse print aparecerá no seu terminal onde o Python está rodando
        print(f"ERRO DE SISTEMA: {e}") 
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.close()
