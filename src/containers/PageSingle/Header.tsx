import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NcImage from "components/NcImage/NcImage";
const APP_NAME: string = import.meta.env.VITE_APP_NAME;

interface HeaderProps {
  pageData: any;
}
const Header: React.FC<HeaderProps> = ({ pageData }) => {
  const completeUrl = window.location.href;
  const fImage = pageData ? pageData.media?.find(((data: any)=> data.fileFolder === 'feature'))?.url : ''
  function generateKeywordsString(data: any) {
    const names = data.map((item: any) => item.name);
    return names.join(", ");
  }
  const keywords = generateKeywordsString(pageData?.tags || []);
  return (
    <>
      {
        pageData ?
          <Helmet>
            <meta charSet="utf-8" />
            <title>{pageData.mtitle}</title>
             <meta name='description' content={pageData.mdesc} />
            <meta 
              property='og:description' content={pageData.mdesc || ''}
            />
            <meta property='og:title' content={`${pageData.mtitle}`} />
            <meta property='og:type' content='website' />
            <meta property='og:url' content={completeUrl} />
            <meta property='og:site_name' content={APP_NAME} />
            <link rel='canonical' href={completeUrl} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-DNS-Prefetch-Control" content="on" />
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            {/* <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" /> */}
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta property='og:image' content={fImage || ''}
            />
            <meta property='og:image:secure_url' content={fImage || ''} />
            <meta property='og:image:type' content='image/jpeg' />

             {/*Twitter*/} 
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={completeUrl} />
            <meta property="twitter:title" content={`${pageData.mtitle}`} />
            <meta property="twitter:description" content={pageData.mdesc || ''} />
            <meta property="twitter:image" content={fImage || ''} />
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
      
    </>
  );
};

export default Header;
