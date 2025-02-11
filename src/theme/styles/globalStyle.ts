// RESPONSIVE DEFAULT
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

import scrollbarStyle from './scrollbarStyle';

const globalStyles = `

    body {
        font-family: 'pretendard', sans-serif;
        font-style: normal;
        margin: 0;
        padding: 0;
        overflow: hidden;
    },


    ul, li {
        margin: 0;
        padding: 0;
    },

    a {
        text-decoration: none;
        color: inherit;
    }
    
    .MuiDialogContent-root {
        scrollbar-width: 4px;
        -ms-overflow-style: none;
    }
    .MuiDialogContent-root::-webkit-scrollbar {
        width: 4px;
    }

    .MuiDialogContent-root::-webkit-scrollbar-thumb {
        background-color: #adaaaa;
        border-radius: 10px;
    }

    .MuiDialogContent-root::-webkit-scrollbar-track {
        background: #f8f8f8;
        border-radius: 10px;
    }

    .MuiDialogContent-root::-webkit-scrollbar-thumb:hover {
        background: #888;
    }

`;

export function createGlobalStyles(additionalStyles?: string[]) {
  return `
      ${globalStyles}

      ${scrollbarStyle}
      
      ${(additionalStyles || []).join(' ')}
    `;
}
