import functions_framework
from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

chat = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

@functions_framework.http
def hello_http(request):    
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }
        return ('', 204, headers)
    
    headers = {
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
    }

    data = request.get_json()
    question = data.get("translate")
    if not question or not isinstance(question, str) or len(question) == 0:
        return ("Invalid question", 400, headers)
    messages = [
      SystemMessage(content="You are a helpful assistant that translates English to Italian."),
      HumanMessage(content=question)
    ]
    answer = chat(messages)
    response = {"text": answer.content}
    return (response, 200, headers)
