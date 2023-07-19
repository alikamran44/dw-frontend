import React from "react";

const SingleContentDemo = ({blogContent}) => {
  return (
    <>
      {/* THIS IS THE DEMP CONTENT */}
      {/* IF YOUR DATA IS JSON, YOU CAN USE render with html-react-parser (https://www.npmjs.com/package/html-react-parser) */}
      <div className='row'>
        <div dangerouslySetInnerHTML={{ __html: blogContent }} />
      </div>
    </>
  );
};

export default SingleContentDemo;
