import sys
import pandas as pd

def main():
    question = sys.argv[1]
    answer = sys.argv[2]

    try:
        # Load the existing qas.xlsx file or create a new one if it doesn't exist
        try:
            df = pd.read_excel("QAs.xlsx")
        except FileNotFoundError:
            df = pd.DataFrame(columns=["Questions", "Answers"])  # Create a new DataFrame with headers

        # Append the new question and answer
        new_row = {"Questions": question, "Answers": answer}
        df = df.append(new_row, ignore_index=True)

        # Save the DataFrame to the Excel file
        df.to_excel("QAs.xlsx", index=False)

        print("Question and answer added successfully.")
    except Exception as e:
        print({"message": str(e)}, file=sys.stderr)

if __name__ == "__main__":
    main()
