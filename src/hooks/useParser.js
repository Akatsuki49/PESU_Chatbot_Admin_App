//only gonna be used in dev mode, after integrating with BE
//the BE will do the parsing and return the response
import { useState, useEffect } from 'react';

export const useParser = ({ file }) => {
  const [QAList, setQAList] = useState([]);

  useEffect(() => {
    const parseCSV = async () => {
      if (!file) return;

      try {
        // Read the file as text
        const text = await file.text();

        // Split the text into lines
        const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');

        // Parse the CSV
        const parsedData = lines
          .map((line) => {
            // Handle cases where commas might be in the questions or answers
            const match = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

            if (!match || match.length < 2) return null;

            let question = match[0].replace(/^"|"$/g, '').trim();
            let answer = match[1].replace(/^"|"$/g, '').trim();

            // If there are more matches, join them as part of the answer
            if (match.length > 2) {
              answer = match.slice(1).join(',').replace(/^"|"$/g, '').trim();
            }

            return { question, answer };
          })
          .filter((item) => item !== null);

        // Remove header row if it exists
        if (
          parsedData.length > 0 &&
          (parsedData[0].question.toLowerCase() === 'questions' ||
            parsedData[0].question.toLowerCase() === 'question') &&
          (parsedData[0].answer.toLowerCase() === 'answers' ||
            parsedData[0].answer.toLowerCase() === 'answer')
        ) {
          setQAList(parsedData.slice(1));
        } else {
          setQAList(parsedData);
        }
      } catch (err) {
        console.error('Error parsing CSV file:', err);
        setQAList([]);
      }
    };

    parseCSV();
  }, [file]);

  return QAList;
};
