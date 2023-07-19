import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

export const BloggerRoute = () => {
    const {profile} = useSelector( ( state ) => state.AuthReducer)
    return (
        <>
        { profile ? ((profile.role === 'blogger' || profile.role === 'admin') ? <Outlet /> : <Navigate to={-1} /> ) : <Navigate to="/login" /> }
        </>
      );
}
