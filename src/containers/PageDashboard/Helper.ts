import { useAppDispatch } from "app/hooks";
import { CreateCategory, updateCategory } from '../../Actions/CategoryAction';
import { updateUser } from '../../Actions/AuthAction';
import { CreateTag, UpdateTag } from '../../Actions/TagAction';
import { CreatePost, UploadFile, UpdatePost, FetchMediaFiles, FetchMedia } from '../../Actions/PostAction';

const HelperAutFoamh = () => {
  const dispatch = useAppDispatch();

  const createPostHandler = (values: any) => {
    if(values.id)
      dispatch(UpdatePost(values))
    else
      dispatch(CreatePost(values))
  };

  const createCategory = (values: any) => {
    if(values._id)
      return dispatch(updateCategory(values,values._id))
    else
      return dispatch(CreateCategory(values))
  };
  const createTag = (values: any) => {
    if(values._id)
      return dispatch(UpdateTag(values, values._id))
    else
      return dispatch(CreateTag(values))
  };

  const fetchMediaFiles = (id: any) => {
    dispatch(FetchMediaFiles(id))
  };

  const fetchMedia = (id: any) => {
    dispatch(FetchMedia(id))
  };

  const uploadFile = (values: any) => {
    return dispatch(UploadFile(values))
  };

  const editHandler = (id: any) => {
    console.log('edit')
  }

  const deleteHandler = (id: any, func: any) => {
    dispatch(func(id))
  }

  const viewCategoryBlog = (id: any) => {
    console.log(id, 'view');
  }

  const profileSubmitHandler = (values: any) => {
    dispatch(updateUser(values, values.id))
  }

  return { createPostHandler,  createCategory, createTag, uploadFile, editHandler, deleteHandler,
     viewCategoryBlog, fetchMediaFiles, fetchMedia, profileSubmitHandler };
};

export default HelperAutFoamh;
