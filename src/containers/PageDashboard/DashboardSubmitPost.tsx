import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import { useHistory, useParams  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ModalGallery from "components/ModalGallery/ModalGallery";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import { fetchPost } from '../../Actions/PostAction';  
import TagInputs from "components/Tag/Input";
import Label from "components/Label/Label"; 
import helperForm from './Helper'
import FormSchema from './Schema' 
import { FetchCategories } from '../../Actions/CategoryAction';
import { FetchTags } from '../../Actions/TagAction';
import Page1 from './SubmitOtherPages/Page1';
import Page2 from './SubmitOtherPages/Page2';
import Page3 from './SubmitOtherPages/Page3';
import Page4 from './SubmitOtherPages/Page4';

// import 'ckeditor/plugins/colorbutton';

const DashboardSubmitPost = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [postLoading, setPostLoading] = useState(false);
  const {slug, currentUrl} = useParams()
  const [tagLoading, setTagLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  const [feature, setFeature] = useState({url: '', name: 'media', selected: null, 
    title: 'Upload or Select Feature Image', fileFolder: 'feature', text: 'Feature Image'
  });
  const [cover, setCover] = useState({url: '', name: 'cover', selected: null, 
    title: 'Upload or Select Cover Photo', fileFolder: 'cover', text: 'Cover Photo'
  });

  const { createPostHandler, fetchMediaFiles, fetchMedia, uploadFile } = helperForm();

  const tool = 'custom';
  const tool_custom = [
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Scayt' ] },
      { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
      { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },
      { name: 'tools', items: [ 'Maximize' ] },
      { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source' ] },
      { name: 'others', items: [ '-' ] },
      '/',
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
      { name: 'styles', items: [ 'Styles', 'Format' ] },
      { name: 'about', items: [ 'About' ] },
      { name : 'new_group', items: ['jsplus_image_editor'] }
  ];

  
  useEffect(() => {
      setCategoryLoading(true)
      setTagLoading(true)
      dispatch(FetchCategories()).then((res)=> {
        setCategoryLoading(false)
        const newArray = res.map(item => ({
          value: item._id,
          label: item.name,
        }));
        setCategories(newArray)
      }).catch(() => setCategoryLoading(false))
      dispatch(FetchTags()).then((res)=> {
        const newArray = res.map(item => ({
          value: item._id,
          label: item.name,
        }));
        setTags(newArray)
        setTagLoading(false)
      }).catch(() => setTagLoading(false))
      if(slug !== undefined && slug !== null){
      setPostLoading(true)
      fetchPost(slug).then((res) => {
        setInitialValues({id: res._id, isSideBar: res.isSideBar, title: res.title, description: res.description, 
          content: res.content, 
          tags: res.tags.map((tag) => tag._id), isBrakingNews: res.isBrakingNews, 
          postType: res.postType, categories: res.categories.map((category) => category._id), 
          media: res.media?.find((res) => res.fileFolder === 'feature')?._id, 
          cover: res.media?.find((res) => res.fileFolder === 'cover')?._id}
        )
        setPostLoading(false)
      }).catch(() => setPostLoading(false))
    }else{
      setInitialValues({ title: '', description: '', content: '', tags: [], isSideBar: true, 
        isBrakingNews: false, categories: [], media: '', cover: '', postType: ''}
      )
    }
  },[slug])

  if(!initialValues) return <></>
  let currentPage = currentUrl.split("-").pop();
  currentPage = parseInt(currentPage)

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
                    fetchMediaFiles={fetchMediaFiles} fetchMedia={fetchMedia} uploadFile={uploadFile}
                  />
                : currentPage === 3 ?
                  <Page3
                    categories={categories} tags={tags} categoryLoading={categoryLoading}
                    values={values} setFieldValue={setFieldValue} errors={errors} touched={touched}
                    tagLoading={tagLoading}
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
                  currentPage < 4 ?
                    <button onClick={()=> history.push(nextPageUrl)}
                      type='button' className={`nc-Button relative h-auto inline-flex items-center justify-center 
                      rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 
                      sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 
                      hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0`} 
                    >
                      Continue post
                    </button>
                  :
                  <button type='submit' className={`nc-Button relative h-auto inline-flex items-center justify-center 
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
