import openai
import os

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_gpt():
    print("Hello! I'm your chatbot. Type 'bye' to exit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['bye', 'goodbye']:
            print("ChatBot: Goodbye!")
            break
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_input}]
        )
        
        print("ChatBot:", response["choices"][0]["message"]["content"])

# Start chat
if __name__ == "__main__":
    chat_with_gpt()