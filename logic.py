import sys
import pandas as pd
from sentence_transformers import SentenceTransformer, util

# Load the Hugging Face model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def main():
    question = sys.argv[1]

    try:
        # Load the existing qas.xlsx file or create a new one if it doesn't exist
        try:
            df = pd.read_excel("QAs.xlsx")
        except FileNotFoundError:
            df = pd.DataFrame(columns=["Questions", "Answers"])  # Create a new DataFrame with headers

        # Embed the new question
        new_question_embedding = model.encode(question, convert_to_tensor=True)

        # Check for similar questions
        if not df.empty:
            existing_questions = df["Questions"].tolist()
            existing_embeddings = model.encode(existing_questions, convert_to_tensor=True)
            similarities = util.pytorch_cos_sim(new_question_embedding, existing_embeddings)
            max_similarity = similarities.max().item()

            # Define a similarity threshold (e.g., 0.95)
            similarity_threshold = 0.98
            # print(max_similarity)
            if max_similarity >= similarity_threshold:
                print("A similar question already exists in the dataset.")
                return

        print("Such Question doesn't exist. You can add your answer.")
        
    except Exception as e:
        print({"message": str(e)}, file=sys.stderr)

if __name__ == "__main__":
    main()
