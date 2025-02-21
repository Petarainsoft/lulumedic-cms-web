import { useRef, useState } from 'react';

const useQueryElementTable = () => {
  const [tableWidth, setWidth] = useState(0);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const setCurrentTableWidth = (headerClassName: string, timer?: number) => {
    setTimeout(() => {
      let count = 0;

      if (tableWrapperRef.current) {
        const elements = tableWrapperRef.current.querySelectorAll<HTMLElement>(headerClassName);
        if (elements.length) {
          for (let i = 0; i < elements.length; i++) {
            if ('offsetWidth' in elements[i]) {
              count += elements[i].offsetWidth;
            }
          }
        }

        setWidth(count + 10); // need  + 10 fir scrollbar
      }
    }, timer || 200);
  };

  return {
    tableWrapperRef,
    tableWidth,
    setCurrentTableWidth,
  };
};

export default useQueryElementTable;
