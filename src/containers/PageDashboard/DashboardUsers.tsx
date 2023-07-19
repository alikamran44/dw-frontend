
import {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectLoading } from "app/auth/authSlice";
import { allUsers } from '../../Actions/AuthAction';
import { useHistory } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";

const DashboardUsers = () => {
  const history = useHistory()
  const [users, setUsers] = useState(null);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch()
  const deleteHandler = (id) => {
    let data = {skip: 0, limit: 3}
    /*dispatch(removeBlog(id)).then((res)=> dispatch(fetchPosts(data)).then((res)=> {
      setBlogs(res.blogs)
    }))*/
  }
  useEffect(() => {
    let data = {skip: 0, limit: 3}
    dispatch(allUsers(data)).then((res)=> {
      console.log(res)
      setUsers(res)
    })
  },[])

  if(!users) return <></>
  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Users
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
                {users.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                          src={`${item?.pic}`}
                        />
                        <div className="ml-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                            {item.firstName} {item.lastName}
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.liveStatus ? (
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
                      <span> {item.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      <button onClick={()=> history.push(`submit-post/${item.slug}`)}
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

      <Pagination />
    </div>
  );
};

export default DashboardUsers;
