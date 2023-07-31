import React from "react";
interface SingleContentDemoProps {
  blogContent: string;
}
const SingleContentDemo: React.FC<SingleContentDemoProps> = ({blogContent}) => {
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
