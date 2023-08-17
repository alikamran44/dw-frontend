import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
      {
        data ?
          <Helmet>
            <meta charSet="utf-8" />
            <title>{data.name}</title>
            <meta property='og:title' content={`${data.name}`} />
            <meta property='og:type' content='website' />
            <meta property='og:url' content={completeUrl} />
            <meta property='og:site_name' content={APP_NAME} />
            <link rel='canonical' href={completeUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-DNS-Prefetch-Control" content="on" />
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            {/* <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" /> */}
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta property='og:image' content={fCover || ''}
            />
            <meta property='og:image:secure_url' content={fCover || ''} />
            <meta property='og:image:type' content='image/jpeg' />

             {/*Twitter*/} 
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={completeUrl} />
            <meta property="twitter:title" content={`${data.name}`} />
            <meta property="twitter:image" content={fCover || ''} />
             {/*For Facebook Insights */}
            <meta property="fb:app_id" content="806413737804011" />

            {/*For Twitter Analytics*/}
            <meta name="twitter:site" content="@twitter-username" />
          </Helmet>
        :
          <Helmet>
            <title>{APP_NAME} News</title>
            <meta property='og:title' content={`${APP_NAME} News`} />
            <meta property='og:type' content='website' />
            <meta property='og:url' content={completeUrl} />
            <meta property='og:site_name' content={APP_NAME} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-DNS-Prefetch-Control" content="on" />
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            {/*Twitter*/} 
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={completeUrl} />
            <meta property="twitter:title" content={`${APP_NAME}`} />
            <meta property="fb:app_id" content="806413737804011" />
          </Helmet>
      }
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
