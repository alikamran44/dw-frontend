import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import CommonHeader from "./CommonHeader";
import NcImage from "components/NcImage/NcImage";
const APP_NAME: string = import.meta.env.VITE_APP_NAME;

interface HeaderProps {
  data: any;
  blogs: any;
  blogsTotalCount: number;
  postType?: any;
}
const Header: React.FC<HeaderProps> = ({ data, blogs, blogsTotalCount=0,postType }) => {
  const completeUrl = window.location.href;
  const fCover = data ? data.media?.url : ''
  const filterImage = 'https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  const postText = postType ? (postType === 'video' ? 'Video' : 
      postType === 'audio' ? 'Audio' :  postType === 'gallery' && 'Gallery' )
      : ''
  return (
    <>
      <CommonHeader
        data={data}
        blogs={blogs}
      />
      {
        data ?
        <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
          <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 
          lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden"
          >
            <NcImage
              containerClassName="absolute inset-0"
              src={`${fCover || ''}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black text-white bg-opacity-30 
              flex flex-col items-center justify-center">
              <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
                {data.name ? data.name.charAt(0).toUpperCase() + data.name.slice(1) : ''}
              </h2>
              <span className="block mt-4 text-neutral-300">
                {(blogs && `${blogsTotalCount > 0 && blogsTotalCount} ${postText} Articles`)}
              </span>
            </div>
          </div>
        </div>
        :
        <div className="w-full xl:max-w-screen-2xl mx-auto">
          <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 
          lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden">
            <NcImage
              containerClassName="absolute inset-0"
              src={`${filterImage || ''}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
              <h2 className="inline-block align-middle ml-3 text-5xl font-semibold md:text-7xl ">
                {postText || 'Articles'}
              </h2>
              <span className="block mt-4 text-neutral-300">
                {(blogs && `${blogsTotalCount > 0 && blogsTotalCount} ${postText} articles`)}
              </span>
            </div>
            
          </div>
        </div>
      }
    </>
  );
};

export default Header;
