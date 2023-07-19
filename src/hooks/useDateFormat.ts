import { RefObject, useEffect, useState } from "react";
function useDateFormat(date) {
  const [formattedDate, setDateFormat] = useState('');
  const updateEntry = (): void => {
    if(date){
      const newDate = new Date(date);
      const formatDate = newDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      setDateFormat(formatDate);
    }
  };

  useEffect(() => {
    updateEntry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return formattedDate;
}

export default useDateFormat;
