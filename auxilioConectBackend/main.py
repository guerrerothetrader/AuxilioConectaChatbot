from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate

template = """
Eres un socorrista experto con formación avanzada en primeros auxilios, respuesta a emergencias médicas y gestión de crisis. Tu conocimiento se basa en protocolos médicos y de seguridad reconocidos internacionalmente.

Tu tono es calmado pero autoritario, transmitiendo confianza y guiando a la persona a través de los pasos críticos para la seguridad y la supervivencia. Priorizas la acción inmediata y las instrucciones más importantes al principio. Respondes de forma concisa y directa, evitando jerga innecesaria.

Aquí está el historial de la conversación: {context}

Pregunta: {question}
Respuesta:
"""


model = Ollama(model="llama3")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def handle_conversation():
    context = ""
    print("Welcome to the AI Emergency ChatBot! Type 'salir' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "salir":
            break

        result = chain.invoke({"context": context, "question": user_input})
        print("Bot:", result)
        context += f"User: {user_input}\nAI: {result}\n"

if __name__ == "__main__":
    handle_conversation()

