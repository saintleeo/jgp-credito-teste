import sqlite3

# Conecta ao banco que seu script criou
conn = sqlite3.connect('data/jgp_credito.db')
cursor = conn.cursor()

# Tenta ler as 5 primeiras linhas
try:
    cursor.execute("SELECT * FROM emissoes LIMIT 5")
    linhas = cursor.fetchall()
    
    print("\n--- TESTE DE DADOS ---")
    for linha in linhas:
        print(linha)
    print("----------------------\n")
    print(f"Sucesso! Foram encontradas {len(linhas)} linhas para teste.")

except Exception as e:
    print(f"Erro ao ler o banco: {e}")

conn.close()