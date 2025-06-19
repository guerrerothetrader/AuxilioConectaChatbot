from flask import Flask, request, jsonify
from main import chain # Asumo que 'chain' ya es tu cadena LangChain para la IA
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Lista de videos de YouTube (puedes expandirla)
# Asegúrate de que sean URLs embed de YouTube (ej. https://www.youtube.com/embed/VIDEO_ID)
YOUTUBE_VIDEOS = {
    "rcp": {
        "src": "https://www.youtube.com/embed/FEayzgNGGBQ", # Ejemplo de URL embebible de YouTube
        "titulo": "Tutorial de RCP (reanimación cardiopulmonar)"
    },
    "dea": {
        "src": "https://www.youtube.com/embed/ExXA1CPOYSc", # Reemplaza con ID real
        "titulo": "Cómo usar un DEA"
    },
    "hemorragia": {
        "src": "https://www.youtube.com/embed/GgPbGbVZDRs", # Reemplaza con ID real
        "titulo": "Control de hemorragias externas"
    },
    # Añade más videos según necesites
}

@app.route('/ask', methods=['POST'])
def ask():
    try:
        user_input = request.json.get('mensaje', '')
        print("Mensaje recibido:", user_input)

        # Invoca la cadena LangChain para obtener la respuesta de texto
        # Asegúrate de que `chain.invoke` devuelve el texto directamente o en un atributo accesible
        llm_response = chain.invoke({"context": "", "question": user_input})
        print("Respuesta de Llama3 (sin procesar):", llm_response)

        # El formato de la respuesta del LLM puede variar, asegúrate de extraer el texto
        # Si llm_response es un objeto, podrías necesitar `llm_response.content` o similar.
        # Asumo que `llm_response` ya es la cadena de texto para simplificar el ejemplo.
        ai_response_text = str(llm_response) # Convertir a string por si acaso

        # Inicializa la respuesta JSON con la respuesta de texto de la IA
        response_payload = {'respuesta': ai_response_text, 'multimedia': []} # <--- Nuevo campo para multimedia

        lower_input = user_input.lower()

        # Lógica para añadir audios (lo que ya tenías)
        if "rcp" in lower_input or "reanimación" in lower_input:
            response_payload['multimedia'].append({
                'tipo': 'audio',
                'src': '../public/audios/rcp-audio.v2.mp3',
                'titulo': 'Audio Explicación de RCP'
            })
            # También podrías añadir el video si el LLM no lo ha incluido en su respuesta textual
            if "rcp" in YOUTUBE_VIDEOS:
                 response_payload['multimedia'].append({
                     'tipo': 'video',
                     'src': YOUTUBE_VIDEOS["rcp"]["src"],
                     'titulo': YOUTUBE_VIDEOS["rcp"]["titulo"]
                 })
        elif "heimlich" in lower_input or "atragantamiento" in lower_input:
            response_payload['multimedia'].append({
                'tipo': 'audio',
                'src': '/audios/heimlich-audio.mp3',
                'titulo': 'Audio de Maniobra de Heimlich'
            })
            # Y el video de Heimlich si existe y quieres que aparezca por esta palabra clave
        elif "fuga de gas" in lower_input:
            response_payload['multimedia'].append({
                'tipo': 'audio',
                'src': '/audios/gas-audio.mp3',
                'titulo': 'Audio de Fuga de Gas'
            })
        elif "accidente de tráfico" in lower_input or "accidente de coche" in lower_input:
            response_payload['multimedia'].append({
                'tipo': 'audio',
                'src': '/audios/accidente-audio.mp3',
                'titulo': 'Audio de Accidente de Tráfico'
            })
        elif "shock" in lower_input or "estado de shock" in lower_input:
            response_payload['multimedia'].append({
                'tipo': 'audio',
                'src': '/audios/shock-audio.mp3',
                'titulo': 'Audio de Shock'
            })

        # Lógica para añadir videos (AHORA EN EL BACKEND)
        # Puedes decidir si esto es redundante si ya lo hace la IA o si es una regla fija
        if "reanimación" in lower_input or "rcp" in lower_input:
            if "rcp" in YOUTUBE_VIDEOS:
                 # Añadimos el video solo si aún no está presente para evitar duplicados
                 if not any(item['tipo'] == 'video' and item['src'] == YOUTUBE_VIDEOS["rcp"]["src"] for item in response_payload['multimedia']):
                     response_payload['multimedia'].append({
                         'tipo': 'video',
                         'src': YOUTUBE_VIDEOS["rcp"]["src"],
                         'titulo': YOUTUBE_VIDEOS["rcp"]["titulo"]
                     })
        if "desfibrilador" in lower_input or "dea" in lower_input:
            if "dea" in YOUTUBE_VIDEOS:
                 response_payload['multimedia'].append({
                     'tipo': 'video',
                     'src': YOUTUBE_VIDEOS["dea"]["src"],
                     'titulo': YOUTUBE_VIDEOS["dea"]["titulo"]
                 })
        if "hemorragia" in lower_input or "sangrado" in lower_input:
            if "hemorragia" in YOUTUBE_VIDEOS:
                 response_payload['multimedia'].append({
                     'tipo': 'video',
                     'src': YOUTUBE_VIDEOS["hemorragia"]["src"],
                     'titulo': YOUTUBE_VIDEOS["hemorragia"]["titulo"]
                 })

        return jsonify(response_payload)

    except Exception as e:
        print("Error en el backend:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Asegúrate de que 'host' y 'port' coincidan con lo que tu frontend espera
    app.run(debug=True, host='127.0.0.1', port=5000)