import React from 'react';
import {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectTagLoading } from "app/tag/tagSlice";
import { FetchTags, deleteTag } from '../../Actions/TagAction';
import CreateModal from './Modal/CreateModal';
import { useHistory } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import helperForm from './Helper'

interface DashboardTagsProps {
  
}

const DashboardTags: React.FC<DashboardTagsProps> = ({ }) => {
  const history = useHistory() 
  const loading = useAppSelector(selectTagLoading)
  const { createTag } = helperForm();
  const [tags, setTags] = useState<any[]>([]);
  const [selectedDeleteLoading, setSelectedDeleteLoading] = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  interface InitialValuesType {
    name: string | null;
    _id: string | null; // Replace 'string' with the appropriate type for _id
    media: string | null; // Replace 'string' with the appropriate type for media
  }

  const [initialValues, setInitialValues] = useState<InitialValuesType>({ name: null, _id: null, media: null });
  const dispatch = useAppDispatch()
  const toggle = (data: any) => {
    if(isOpen){
      setInitialValues({name: null, _id: null, media: null})
    }else{
      if(data.name)
        setInitialValues({name: data.name, _id: data._id, media: data.media})
      else
        setInitialValues({name: null, _id: null, media: null})
    }
    setIsOpen(!isOpen)
  }
  const deleteHandler = (id: any) => {
    setSelectedDeleteLoading(id)
    dispatch(deleteTag(id)).then((res: any)=> {
      let removeData = tags.filter((data: any) => data._id !== id )
      setSelectedDeleteLoading(null)
      setTags(removeData)
    })
  }
  useEffect(() => {
    let data = {skip: 0, limit: 3}
    dispatch(FetchTags()).then((res: any)=> {
      setTags(res)
    })
  },[])
  const submitHandler = (values: any) => {
      createTag(values).then((res: any) => {
        if(!values._id){
          setInitialValues({name: null, _id: null, media: null})
          setTags([res, ...tags])
        }else{
          let updatedData = tags.map((data: any) => data._id === res._id ? res : data)
          setTags(updatedData)
        }
        setIsOpen(!isOpen)
      })
  }
  if(!tags) return <></>
  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="py-2 align-end inline-block min-w-full">
            <CreateModal
              uploadButtonText={'Create'}
              buttonText={'Create New Tag'}
              loading={loading}
              submitHandler={submitHandler} 
              title={'Create Tag'}
              toggle={toggle}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              initialValues={initialValues}
            />
          </div>
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                <>
                  {
                    !loading || tags.length > 0 ?
                    tags.map((item: any) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                            <NcImage
                              containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                              src={`${item.media?.url}`}
                            />
                            <div className="ml-4 flex-grow">
                              <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                                {item.name}
                              </h2>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.name ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                              Offline
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                          <span> {item.name}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                          <button onClick={()=> toggle(item)}
                            className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                          >
                            Edit
                          </button>
                          {` | `}
                          <button onClick={()=> deleteHandler(item._id)}
                            className="text-rose-600 hover:text-rose-900 align-center"
                          >
                            {
                              selectedDeleteLoading === item._id && loading 
                              ? 
                                <svg className="animate-spin -ml-1 text-primary-800 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              :
                                'Delete'
                            }
                          </button>
                        </td>
                      </tr>
                    ))
                  :
                  <tr >
                    <td colSpan={4}>
                      <div className="text-center mx-auto my-10 md:my-16">
                        <button disabled={true}
                          className="text-rose-600 hover:text-rose-900"
                        >
                        <svg className="animate-spin -ml-1 text-primary-800 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       </button>
                      </div>
                    </td>
                  </tr>
                  }
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default DashboardTags;
