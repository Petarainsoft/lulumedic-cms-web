const scrollbarStyle = `
  // Global scrollbar
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar

  // The entire scrollbar
  ::-webkit-scrollbar {
    width: 0.1rem;
    height: 0.4rem;
    scrollbar-gutter: stable;
    background-color: #F8F8F8;
    //margin-bottom: -0.4rem !important;
    //padding-bottom: 0.4rem !important;
    //margin-right: -0.4rem !important;
    //padding-right: 0.4rem !important;
    //position: absolute;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #F8F8F8;
    background-color: #F8F8F8;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ADAAAA;
    border-radius: 0.4rem;
  }

  //// The track (progress bar) of the scrollbar
  //::-webkit-scrollbar-track {
  //  box-shadow: inset 0 0 0.125rem #F8F8F8;
  //}
  //
  //// The draggable scrolling handle
  //::-webkit-scrollbar-thumb {
  //  background-color: darkgrey;
  //  outline: 1px solid slategrey;
  //}

  .Scrollbar-hideX::-webkit-scrollbar {
    width: 0;
  }

  //.Scrollbar-x::-webkit-scrollbar {
  //  height: 0.125rem;
  //}
`;

export default scrollbarStyle;
