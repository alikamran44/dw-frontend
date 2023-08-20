import React from 'react';
import {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectLoading } from "app/auth/auth";
import { allUsers } from '../../Actions/AuthAction';
import { useHistory } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import helperForm from './Helper'

interface DashboardUsersProps {
  
}
const DashboardUsers: React.FC<DashboardUsersProps> = ({ }) => {
  const history = useHistory()
  const [users, setUsers] = useState<any[] | null>(null);
  const loading = useAppSelector(selectLoading);
  const [selectedPage, setSelectedPage] = useState(0)
  const [pages, setPages] = useState(0)
  const [filter, setFilter] = useState({skip: 0, limit: 3})
  const dispatch = useAppDispatch();
  const { profileSubmitHandler } = helperForm();

  const deleteHandler = (id: any) => {
    let data = {skip: 0, limit: 3}
    /*dispatch(removeBlog(id)).then((res)=> dispatch(fetchPosts(data)).then((res)=> {
      setBlogs(res.blogs)
    }))*/
  }
  useEffect(() => {
    let data = {skip: 0, limit: filter.limit}
    dispatch(allUsers(data)).then((res: any)=> {
      setPages(res.total)
      setUsers(res.users)
    })
  },[])

  const loadMore = (index: any) => {
    setSelectedPage(index)
    let data = {skip: index + 1, limit: filter.limit}
    dispatch(allUsers(data)).then((res: any)=> {
      setUsers(res.users)
    })

  }
  const className="mt-1 nc-Select block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
  const statusOptions = [
    { value: 'block', label: 'Block' },
    { value: 'deleted', label: 'Deleted' },
    { value: 'active', label: 'Active' },
  ]; 
  const handleStatusChange = (e: any, id: any) => {
    const values = {id: id, status: e.target.value}
    if(values && e.target.value)
      profileSubmitHandler(values).then((res: any) => {
        if(users && res){
          const data=users.map((rec)=> rec._id === res._id ? res : rec)
          setUsers(data)
        }
      })
  }

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
                    Role
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
                {(users || []).map((item: any) => (
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
                      {item.status === 'active' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                          Block
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <span> {item.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <span> 
                        <select name={'status'}
                          value={item.status}
                          className={`nc-Select h-10 ${className} block w-full text-sm rounded-lg border-neutral-100 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
                          onChange={(e) => handleStatusChange(e, item._id)}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
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

export default DashboardUsers;
