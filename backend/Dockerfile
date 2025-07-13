# Folosim o imagine oficială Python slim
FROM python:3.10-slim

# Setăm directorul de lucru în container
WORKDIR /app

# Copiem fișierul cu dependențe
COPY requirements.txt .

# Instalăm dependențele din requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiem tot codul sursă în container
COPY . .

# Expunem portul pe care rulează Gunicorn (5000)
EXPOSE 5000

# Comanda de start a aplicației
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
