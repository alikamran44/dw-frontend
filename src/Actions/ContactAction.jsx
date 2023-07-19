import axios from "axios";
import * as types from '../Actions/Types'
import { allUsersRoute, getAllMessagesRoute } from "../utils/APIRoutes";

export const fetchContacts = () => async( dispatch ) => {
    const data = await  axios.get( `${allUsersRoute}/${'63279ed821e2f430f84c5c69'}` );
    dispatch({ type: types.FETCH_CONTACTS, payload: data.data })
}
export const fetchContact = ( contact, currentUser ) => async( dispatch ) => {
    await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: contact._id,
    }).then( (res) => {
        dispatch({ type: types.FETCH_CHAT, payload: res.data })
    })
    dispatch({ type: types.FETCH_CONTACT, payload: contact })
}
