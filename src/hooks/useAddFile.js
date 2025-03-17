import { useContext, useState } from 'react';
import { useParser } from './useParser';
import { QAContext } from '../context/QAContextProvider';

export const useAddFile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const parsedQAListFromCSV = useParser({ file });
  const { addQA } = useContext(QAContext);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file || !file.name) {
      alert('Please select a file');
      return;
    }

    if (
      file.type !== 'text/csv' &&
      file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      alert('Please select a CSV or Excel file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    for await (const item of parsedQAListFromCSV) {
      const payload = { question: item.question, answer: item.answer };
      addQA(payload);
    }

    // try {
    //   const response = await axios.post('/api/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log('File uploaded successfully:', response.data);
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    // }
  };

  return { file, handleFileChange, handleFileSubmit };
};
