import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import CommonHeader from "./CommonHeader";
import NcImage from "components/NcImage/NcImage";
const APP_NAME: string = import.meta.env.VITE_APP_NAME;

interface HeaderProps {
  data: any;
  blogs: any;
  blogsTotalCount: number
}
const Header: React.FC<HeaderProps> = ({ data, blogs, blogsTotalCount=0 }) => {
  const completeUrl = window.location.href;
  const fCover = data ? data.media?.url : ''
  return (
    <>
      <CommonHeader
        data={data}
        blogs={blogs}
      />
      {
        data ?
        <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
          <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 overflow-hidden ">
            <NcImage
              containerClassName="absolute inset-0"
              src={`${fCover || ''}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
              <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
                {data.name ? data.name.charAt(0).toUpperCase() + data.name.slice(1) : ''}
              </h2>
              <span className="block mt-4 text-neutral-300">
                {(blogs && `${blogsTotalCount > 0 && blogsTotalCount} Articles`)}
              </span>
            </div>
          </div>
        </div>
        :
        <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
          <div className=" relative aspect-w-16  py-8 lg:py-24 overflow-hidden ">
            <div className="absolute inset-0  text-white bg-opacity-30 flex flex-col items-center justify-center">
              <span className="block mt-4 text-neutral-600">
                {(blogs && `${blogsTotalCount > 0 && blogsTotalCount} Articles`)}
              </span>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Header;
