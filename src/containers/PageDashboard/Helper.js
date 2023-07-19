import { useDispatch } from 'react-redux';
import { CreateCategory, updateCategory } from '../../Actions/CategoryAction';
import { updateUser } from '../../Actions/AuthAction';
import { CreateTag, UpdateTag } from '../../Actions/TagAction';
import { CreatePost, UploadFile, UpdatePost, FetchMediaFiles, FetchMedia } from '../../Actions/PostAction';

const HelperAutFoamh = () => {
  const dispatch = useDispatch();

  const createPostHandler = (values) => {
    if(values.id)
      dispatch(UpdatePost(values,values.id))
    else
      dispatch(CreatePost(values))
  };

  const createCategory = (values) => {
    if(values._id)
      return dispatch(updateCategory(values,values._id))
    else
      return dispatch(CreateCategory(values))
  };
  const createTag = (values) => {
    if(values._id)
      return dispatch(UpdateTag(values, values._id))
    else
      return dispatch(CreateTag(values))
  };

  const fetchMediaFiles = (id) => {
    dispatch(FetchMediaFiles(id))
  };

  const fetchMedia = (id) => {
    dispatch(FetchMedia(id))
  };

  const uploadFile = (values) => {
    return dispatch(UploadFile(values))
  };

  const editHandler = (id) => {
    console.log('edit')
  }

  const deleteHandler = (id, func) => {
    dispatch(func(id))
  }

  const viewCategoryBlog = (id) => {
    console.log(id, 'view');
  }

  const profileSubmitHandler = (values) => {
    dispatch(updateUser(values, values.id))
  }

  return { createPostHandler,  createCategory, createTag, uploadFile, editHandler, deleteHandler,
     viewCategoryBlog, fetchMediaFiles, fetchMedia, profileSubmitHandler };
};

export default HelperAutFoamh;
