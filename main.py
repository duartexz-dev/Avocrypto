import requests

nomeBook = input("Search your favorite book !")

url = "https://www.googleapis.com/books/v1/volumes"

params = {
    "q": nomeBook,
    "maxResults":5
}

resposta = requests.get(url,params=params)
dados = resposta.json()

print(dados)

if "items" not in dados:
    print("No books found :(t :(")
else:
    for livro in dados["items"]:
        info = livro["volumeInfo"]  

        titulo = info.get("title","Sem titulo")
        autores= info.get("authors",["Autor Desconhecido"])

        print("\n----------------------")
        print("📚", titulo)
        print("✍️", ", ".join(autores))
