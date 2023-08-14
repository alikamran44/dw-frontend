
import { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectUser, selectConfirmAlert } from "app/auth/auth";
import Avatar from "components/Avatar/Avatar";
import { setAlert } from "app/auth/auth";
import { avatarImgs } from "contains/fakeData";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from '../../Actions/AuthAction';

export default function AvatarDropdown() {
  const dispatch = useAppDispatch();
  interface UserInfo {
    name: string;
    email: string;
    role: string;
    pic: string;
    firstName: string;
    lastName: string;
    jobName: string;
    _id: string;
  }
  const userInfoString = localStorage.getItem('userInfo');
  const user: UserInfo | null = (userInfoString && JSON.parse(userInfoString)) || null;
  const confirmAlert = useAppSelector(selectConfirmAlert);
  const handleLogout = () => {
     dispatch(setAlert({
      children: "Are you sure you want to logout?",
      title: "Logout",
      emoji: "😔",
      containerClassName: "",
      type: "default",
      showCloseButton: true,
      showConfirmButton: true,
      alertAction : 'logout',
      showCancel: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }));
  }
 
  useEffect(()=>{
    if(confirmAlert === 'logout'){
      dispatch(logoutUser())
    }
  },[confirmAlert])

  if(!user) return <></>
  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ open, close  }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <Avatar
                radius="rounded-full"
                imgUrl={user.pic}
                sizeClass="w-8 h-8 sm:w-9 sm:h-9"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        // imgUrl={avatarImgs[1]}
                        imgUrl={user.pic}
                        sizeClass="w-12 h-12"
                        radius="rounded-full"
                      />

                      <div className="flex-grow">
                        <h4 className="font-semibold">{user.firstName} {user.lastName}</h4>
                        {
                          user.role !== 'user' &&
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {user.jobName}
                            </p>
                        }
                      </div>
                    </div>

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                    {/* ------------------ 1 --------------------- */}
                    <Link
                      to={`/author/${user._id}`} onClick={() => close()}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"My Profile"}</p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      to={"/author/demo-slug"} onClick={() => close()}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"My Items"}</p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}

                    {
                      user?.role !== 'user' ?
                        <Link
                          to={"/dashboard/"} onClick={() => close()}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <svg 
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M20.043 11.76c-.141-.427-.314-.844-.516-1.242l-2.454 1.106c.217.393.39.81.517 1.242l2.453-1.106zm-12.572-.904c.271-.354.579-.674.918-.957l-1.89-1.968c-.328.293-.637.614-.919.957l1.891 1.968zm1.714-1.514c.38-.221.781-.396 1.198-.523l-1.033-2.569c-.412.142-.813.317-1.2.524l1.035 2.568zm-2.759 3.615c.121-.435.287-.854.498-1.25l-2.47-1.066c-.196.403-.364.823-.498 1.25l2.47 1.066zm9.434-6.2c-.387-.205-.79-.379-1.2-.519l-1.023 2.573c.418.125.82.299 1.2.519l1.023-2.573zm2.601 2.131c-.281-.342-.59-.664-.918-.957l-1.891 1.968c.34.283.648.604.919.957l1.89-1.968zm-5.791-3.06c-.219-.017-.437-.026-.648-.026-.213 0-.432.009-.65.026v2.784c.216-.025.434-.038.65-.038.215 0 .434.013.648.038v-2.784zm11.33 8.172c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 2.583.816 5.042 2.205 7h19.59c1.389-1.958 2.205-4.417 2.205-7zm-9.08 5c-.007-1.086-.606-2.031-1.496-2.522l-1.402-6.571-1.402 6.571c-.889.491-1.489 1.436-1.496 2.522h-5.821c-.845-1.5-1.303-3.242-1.303-5 0-5.514 4.486-10 10-10s10 4.486 10 10c0 1.758-.458 3.5-1.303 5h-5.777z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            /></svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium ">{"Dashboard"}</p>
                          </div>
                        </Link>
                        :
                        <Link
                          to={"/setting/"} onClick={() => close()}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <svg xmlns="http://www.w3.org/2000/svg"  width="24"
                              height="24" 
                              viewBox="0 0 512 512" id="gear"
                            >
                              <path  stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round" d="M283.693,492.847H229.26c-14.972,0-27.153-12.177-27.153-27.144v-53.9c-19.271-6.774-37.417-17.271-52.977-30.643
                              l-46.764,26.991c-4.106,2.361-8.772,3.605-13.503,3.606c-9.703,0-18.727-5.173-23.55-13.5l-27.237-47.184
                              c-7.457-12.935-3.004-29.55,9.925-37.04l46.741-26.958c-1.903-10.071-2.867-20.341-2.867-30.6c0-10.258,0.963-20.527,2.867-30.6
                              l-46.73-26.95c-12.972-7.516-17.423-24.157-9.933-37.104l27.23-47.121c4.835-8.347,13.859-13.527,23.553-13.527
                              c4.743,0,9.417,1.257,13.517,3.635l46.754,26.946c15.576-13.353,33.724-23.837,52.974-30.604v-53.9
                              c0-14.968,12.181-27.145,27.153-27.145h54.434c14.974,0,27.155,12.177,27.155,27.145v53.899
                              c19.343,6.793,37.492,17.274,52.983,30.6l46.761-26.951c4.095-2.369,8.77-3.625,13.51-3.625c9.693,0,18.708,5.185,23.524,13.531
                              l27.25,47.118c7.477,12.977,3.021,29.615-9.928,37.1l-46.738,26.955c1.89,10.021,2.846,20.291,2.846,30.599
                              c0,10.388-0.953,20.659-2.839,30.603l46.726,26.948c6.236,3.572,10.721,9.399,12.611,16.398
                              c1.898,7.03,0.949,14.362-2.674,20.646l-27.233,47.178c-4.827,8.335-13.847,13.508-23.544,13.509
                              c-4.729,0-9.396-1.244-13.499-3.597l-46.775-27c-15.553,13.379-33.701,23.863-52.98,30.605v53.937
                              C310.849,480.67,298.667,492.847,283.693,492.847z M149.959,366.227c1.636,0,3.259,0.598,4.526,1.756
                              c16.143,14.748,35.631,26.02,56.358,32.597c2.787,0.885,4.68,3.472,4.68,6.395v58.729c0,7.569,6.162,13.728,13.736,13.728h54.434
                              c7.576,0,13.738-6.158,13.738-13.728v-58.774c0-2.928,1.899-5.518,4.691-6.397c20.731-6.537,40.215-17.791,56.344-32.546
                              c2.159-1.974,5.348-2.323,7.882-0.86l50.947,29.407c2.058,1.18,4.417,1.809,6.807,1.809c4.927-0.001,9.499-2.609,11.931-6.808
                              l27.227-47.166c1.827-3.17,2.305-6.88,1.343-10.442c-0.954-3.533-3.208-6.468-6.345-8.265l-50.938-29.378
                              c-2.539-1.465-3.834-4.408-3.196-7.27c2.334-10.482,3.518-21.429,3.518-32.536c0-11.004-1.185-21.955-3.521-32.55
                              c-0.63-2.857,0.664-5.794,3.199-7.256l50.921-29.367c6.547-3.783,8.8-12.207,5.017-18.773l-27.247-47.114
                              c-2.432-4.213-6.992-6.826-11.907-6.826c-2.383,0-4.734,0.632-6.8,1.827l-50.958,29.37c-2.533,1.46-5.721,1.11-7.879-0.864
                              c-16.047-14.687-35.533-25.941-56.354-32.548c-2.786-0.885-4.68-3.472-4.68-6.395V47.251c0-7.569-6.162-13.729-13.738-13.729
                              H229.26c-7.574,0-13.736,6.159-13.736,13.729v58.729c0,2.923-1.893,5.51-4.68,6.395c-20.706,6.569-40.196,17.828-56.366,32.559
                              c-2.157,1.967-5.339,2.311-7.867,0.854l-50.948-29.363c-2.073-1.203-4.419-1.834-6.801-1.834c-4.924,0-9.5,2.617-11.94,6.83
                              l-27.228,47.118c-3.789,6.55-1.531,14.97,5.033,18.772l50.909,29.36c2.535,1.462,3.83,4.398,3.2,7.256
                              c-2.351,10.662-3.542,21.613-3.542,32.55c0,10.938,1.192,21.889,3.542,32.55c0.63,2.857-0.665,5.794-3.199,7.256l-50.92,29.368
                              c-6.53,3.782-8.786,12.184-5.018,18.72l27.229,47.172c2.428,4.19,7.003,6.799,11.936,6.799c2.388,0,4.742-0.628,6.807-1.814
                              l50.938-29.401C147.652,366.521,148.809,366.227,149.959,366.227z">
                              </path>
                              <path  stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round" d="M256.491,337.764c-44.857,0-81.351-36.465-81.351-81.287c0-44.821,36.494-81.286,81.351-81.286
                              c44.842,0,81.323,36.465,81.323,81.286C337.814,301.299,301.333,337.764,256.491,337.764z M256.491,188.606
                              c-37.459,0-67.934,30.446-67.934,67.87s30.475,67.871,67.934,67.871c37.444,0,67.907-30.447,67.907-67.871
                              S293.936,188.606,256.491,188.606z">
                              </path>
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium ">{"Setting"}</p>
                          </div>
                        </Link>
                    }

                     {/* ------------------ 2 --------------------- */}
                    <Link
                      to={"/dashboard/edit-profile"} onClick={() => close()}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.7001 16.25C19.0001 17.33 19.84 18.17 20.92 18.47"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"Edit profile"}</p>
                      </div>
                    </Link>

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                    {/* ------------------ 2 --------------------- */}
                    <button
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44715 2 1.97 6.47715 1.97 12C1.97 17.5228 6.44715 22 11.97 22Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.89999 4.92993L8.43999 8.45993"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.89999 19.07L8.43999 15.54"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.05 19.07L15.51 15.54"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.05 4.92993L15.51 8.45993"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"Help"}</p>
                      </div>
                    </button>

                    {/* ------------------ 2 --------------------- */}
                    <button className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 12H3.62"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p onClick={handleLogout} className="text-sm font-medium ">{"Log Out"}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
