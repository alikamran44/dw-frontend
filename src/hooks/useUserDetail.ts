function useUserDetail(date: any) {
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

  return user;
}

export default useUserDetail;
