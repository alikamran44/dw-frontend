import {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectPosts } from "app/blog/blogSlice";
import { fetchPosts, removeBlog } from '../../Actions/PostAction';
import { useHistory } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import helperForm from './Helper'

const DashboardPosts = () => {
  const history = useHistory()
  const [blogs, setBlogs] = useState<any[] | null>(null);
  const [selectedPage, setSelectedPage] = useState(0)
  const [pages, setPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({skip: 0, limit: 3})
  const { createPostHandler } = helperForm();
  const dispatch = useAppDispatch()
  const deleteHandler = (id: any) => {
    let data = {skip: 0, limit: 3}
    dispatch(removeBlog(id)).then((res: any)=> dispatch(fetchPosts(data)).then((res)=> {
      setBlogs(res.blogs)
    }) 
  )}
  useEffect(() => {
    let data = {skip: 0, limit: 3}
    let initialFilter = {skip: data.limit + data.skip, limit: data.limit}
    setFilter(initialFilter)
    setLoading(true)
    dispatch(fetchPosts(data)).then((res: any)=> {
      setPages(res.size)
      setLoading(false)
      setBlogs(res.blogs)
    }).catch((err) => setLoading(false))
  },[])

  const loadMore = (index: any) => {
    setSelectedPage(index)
    let data = {skip: index, limit: filter.limit}
    setFilter(data)
    setLoading(true)
    dispatch(fetchPosts(filter)).then((res: any)=> {
      setLoading(false)
      setBlogs(res.blogs)
    }).catch((err) => setLoading(false))

  }

  const className="mt-1 nc-Select block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
  const publishedOptions = [
    { value: 'Public', label: 'Public' },
    { value: 'Private', label: 'Private' },
    { value: 'FollowersOnly', label: 'FollowersOnly' },
  ]; 

  const handleStatusChange = (e: any, id: any) => {
    const values = {id: id, published: e.target.value}
    if (values.id !== null && values.published !== null && 
      values.id !== undefined && values.published !== undefined 
    ) {
      createPostHandler(values).then((res: any) => {
        if(blogs && res){
          const data=blogs.map((rec)=> rec._id === res.blog._id ? res.blog : rec)
          setBlogs(data)
        }
      })
    }
  }

  if(!blogs) return <></>
  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Article
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Post Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {(blogs || []).map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                          src={`${item.media.find(((data: any)=> data.fileFolder === 'feature'))?.url}`}
                        />
                        <div className="ml-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                            {item.title}
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === 'active' ? (
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
                      <span>{item.postType}</span>
                    </td> 
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <span> 
                         <select name={'published'}
                          value={item.published}
                          className={`nc-Select h-10 ${className} block w-full text-sm rounded-lg border-neutral-100 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
                          onChange={(e) => handleStatusChange(e, item._id)}
                        >
                          {publishedOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      <button onClick={()=> history.push(`submit-post/page-1/${item.slug}`)}
                        className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                      >
                        Edit
                      </button>
                      {` | `}
                      <button onClick={()=> deleteHandler(item._id)}
                        className="text-rose-600 hover:text-rose-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination 
        selectedPage={selectedPage}
        setSelectedPage={loadMore}
        pages={pages}
        limit={filter.limit}
      />
    </div>
  );
};

export default DashboardPosts;
