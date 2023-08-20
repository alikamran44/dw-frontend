import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import { useHistory, useParams  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { fetchPost } from '../../Actions/PostAction'; 
import helperForm from './Helper'
import FormSchema from './Schema' 
import { FetchCategories } from '../../Actions/CategoryAction';
import { FetchTags } from '../../Actions/TagAction';
import Page1 from './SubmitOtherPages/Page1';
import Page2 from './SubmitOtherPages/Page2';
import Page3 from './SubmitOtherPages/Page3';
import Page4 from './SubmitOtherPages/Page4';

// import 'ckeditor/plugins/colorbutton';
interface RouteParams {
  slug: string;
  currentUrl: string;
}

interface InitialValues {
  id: any;
  isSideBar: any;
  title: any;
  description: any;
  content: any;
  tags: any;
  isBrakingNews: any;
  postType: any;
  categories: any;
  media: any;
  cover: any;
  published: any;
}
const DashboardSubmitPost = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const { slug, currentUrl } = useParams<RouteParams>();
  const [tagLoading, setTagLoading] = useState<boolean>(false);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<InitialValues | null>(null);
  const [categories, setCategories] = useState(null);
  const [initialCategories, setInitialCategories] = useState([]);
  const [initialTags, setInitialTags] = useState([]);
  const [tags, setTags] = useState(null);
  const [feature, setFeature] = useState({url: '', name: 'media', selected: null, 
    title: 'Upload or Select Feature Image', fileFolder: 'feature', text: 'Feature Image'
  });
  const [cover, setCover] = useState({url: '', name: 'cover', selected: null, 
    title: 'Upload or Select Cover Photo', fileFolder: 'cover', text: 'Cover Photo'
  });

  const { createPostHandler, fetchMediaFiles, uploadFile } = helperForm();

  const fetchGalleryData = (result: any, postType: string, categ: any, ta: any) => {
    const newCategories = categ.map((item: any) => ({
      value: item._id,
      label: item.name,
    }));
    setInitialCategories(newCategories)
    const newTags = ta.map((item: any) => ({
      value: item._id,
      label: item.name,
    }));
    setInitialTags(newTags)
    const m = result?.find((res: any) => res.fileFolder === 'feature')
    const c = result?.find((res: any) => res.fileFolder === 'cover')
    const ga = result?.filter((res: any) => res.fileFolder === 'gallery')
    setFeature({
      url: m?.url, name: 'media', selected: m?._id, fileFolder: 'feature',
      title: 'Upload or Select Feature Image', text: 'Feature Image'
    })

    if(!ga){
      setCover({url: c.url, name: 'cover', selected: c._id, fileFolder: 'cover',
        title: 'Upload or Select Cover Photo', text: 'Cover Photo'
      })
    }
    else{
      const se = ga.map((item: any) => item._id);
      const ur = ga.map((item: any) => item.url);
      setCover({url: ur, name: 'cover', selected: se, fileFolder: 'gallery',
        title: 'Upload or Select Cover Photo', text: 'Cover Photo'
      })
    }
    
  }
  useEffect(() => {
      setCategoryLoading(true)
      setTagLoading(true)
      const filter = {skip: 0,limit: 50};
      dispatch(FetchCategories(filter)).then((res: any)=> {
        setCategoryLoading(false)
        const newArray = res.categories.map((item: any) => ({
          value: item._id,
          label: item.name,
        }));
        setCategories(newArray)
      }).catch(() => setCategoryLoading(false))
      dispatch(FetchTags(filter)).then((res: any)=> {
        const newArray = res.tags.map((item: any) => ({
          value: item._id,
          label: item.name,
        }));
        setTags(newArray)
        setTagLoading(false)
      }).catch(() => setTagLoading(false))
      if(slug !== undefined && slug !== null){
      setPostLoading(true)
      fetchPost(slug).then((res: any) => {
        setInitialValues({id: res._id, isSideBar: res.isSideBar, title: res.title, description: res.description, 
          content: res.content, published: res.published,
          tags: res.tags.map((tag: any) => tag._id), 
          categories: res.categories.map((category: any) => category._id), 
          isBrakingNews: res.isBrakingNews, postType: res.postType, 
          media: res.media?.find((res: any) => res.fileFolder === 'feature')?._id, 
          cover: res.media?.find((res: any) => res.fileFolder === 'cover')?._id}
        )
        fetchGalleryData(res.media, res.postType, res.categories, res.tags)
        setPostLoading(false)
      }).catch(() => setPostLoading(false))
    }else{
      setInitialValues({
        id: null,
        title: '',
        description: '',
        content: '',
        tags: [],
        isSideBar: true,
        isBrakingNews: false,
        categories: [],
        media: '',
        cover: '',
        postType: '',
        published: 'Public'
      });
    }
  },[slug])

  if(!initialValues) return <></>
  let currentPage: number = 1;
  if (currentUrl) {
    const currentPageString = currentUrl.split("-").pop();
    if (currentPageString) {
      currentPage = parseInt(currentPageString);
    }
  }

  const nextPageUrl = `/dashboard/submit-post/page-${currentPage+1}${slug ? `/${slug}` : ''}`
  const prevPageUrl = `/dashboard/submit-post/page-${currentPage-1}${slug ? `/${slug}` : ''}`
  return (
    <>
      <div className='mb-4'>
        <span className="text-4xl font-semibold">{currentPage}</span> 
        <span className="text-lg text-neutral-500 dark:text-neutral-400">/ 4</span>
      </div>
      <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema.createPostSchema}
          onSubmit={createPostHandler}
          validateOnChange={true}
          validateOnBlur={true}

        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              {
                currentPage === 1 ?
                  <Page1 setCover={setCover}
                    values={values} setFieldValue={setFieldValue} errors={errors} touched={touched}
                  />
                : currentPage === 2 ?
                  <Page2
                    feature={feature} setFeature={setFeature} cover={cover} setCover={setCover}
                    values={values} setFieldValue={setFieldValue} errors={errors} touched={touched}
                    fetchMediaFiles={fetchMediaFiles} uploadFile={uploadFile}
                  />
                : currentPage === 3 ?
                  <Page3
                    categories={categories} tags={tags} categoryLoading={categoryLoading}
                    values={values} setFieldValue={setFieldValue} errors={errors} touched={touched}
                    tagLoading={tagLoading} initialCategories={initialCategories}
                    initialTags={initialTags} setInitialCategories={setInitialCategories}
                    setInitialTags={setInitialTags}
                  />
                  : currentPage === 4 &&
                  <Page4
                    values={values} setFieldValue={setFieldValue} errors={errors} touched={touched}
                  />
              }
              <div className="flex justify-end space-x-5 mt-5">
                
                {
                  currentPage > 1 &&
                  <button onClick={()=> history.push(prevPageUrl)}
                    type='button' className={`nc-Button relative h-auto inline-flex items-center 
                    justify-center rounded-full transition-colors text-sm sm:text-base 
                    font-medium px-4 py-3 sm:px-6  ttnc-ButtonSecondary font-medium border 
                    bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 
                    dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 
                    dark:hover:bg-neutral-800   focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0`} 
                  >
                    Go back
                  </button>
                }
                {
                  currentPage < 4 &&
                    <button onClick={()=> history.push(nextPageUrl)}
                      type='button' className={`nc-Button relative h-auto inline-flex items-center justify-center 
                      rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 
                      sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 
                      hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0`} 
                    >
                      Continue post
                    </button>
                  }
                  {
                  currentPage === 4 &&
                  <button type={currentPage === 4 ? 'submit' : 'button'} className={`nc-Button relative h-auto inline-flex items-center justify-center 
                    rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 
                    sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 
                    hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0`} 
                  >
                    Submit
                  </button>
                }
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default DashboardSubmitPost;
