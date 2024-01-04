import React, { useEffect, useState } from 'react'
import Loader from '../../component/Loader';
import Footer from '../../component/Footer';
import Navlink from '../../component/Navlink';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../component/MetaData';
import { clearErrors, deleteUser, getAllUsers, updateUser } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { CLEAR_ERRORS, DELETE_USER_RESET, UPDATE_USER_RESET } from '../../constants/userConstants';

const Userlist = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [role, setRole] = useState();

    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const { error, users } = useSelector(state => state.allUsers)
    const { error: deleteError, isDeleted, isUpdated } = useSelector(state => state.userDetails)


    const updateUserHandler = (e, id) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("role", role);

        dispatch(updateUser(id, myForm));
    }

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(CLEAR_ERRORS())
        }

        if (isDeleted) {
            alert.success("User deleted");
            navigate("/admin/dashbord");
            dispatch({ type: DELETE_USER_RESET });
        }

        if (isUpdated) {
            alert.success("order updated");
            navigate("/admin/dashbord");
            dispatch({ type: UPDATE_USER_RESET });
        }

        dispatch(getAllUsers());

    }, [error, alert, dispatch, isDeleted, deleteError, navigate, isUpdated]);
    return (
        <>
            {loading ? <Loader /> : <>
                {isAuthenticated ? <>
                    {user.role === "admin" ? <>
                        <MetaData title={"User list --Hadiya-mart"} />
                        <div className='container-fluid bg-super'>
                            <div className='container py-5'>
                                <div class="row">
                                    <div class="col-md-2  pt-5">
                                        <Navlink />
                                    </div>
                                    <div class="col-md-10">
                                        <div className='container ob pt-5'>
                                            <table className='table'>
                                                <thead>
                                                    <th>Id</th>
                                                    <th>Avater</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Edit Role</th>
                                                    <th>Delete</th>
                                                </thead>
                                                {users && users.map((item) => (
                                                    <tbody key={item._id}>
                                                        <td>{item._id}</td>
                                                        <td><img src={item.avatar.url} className="img-fluid adimgpre" alt="profile" /></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.role}</td>
                                                        <td><select id="" className=' mx-auto adinput my-2' onChange={(e) => setRole(e.target.value)}>
                                                            <option value="">select option</option>
                                                            <option value="user">User</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                            <button onClick={(e) => updateUserHandler(e, item._id)} className='btn btn-outline-success'>Update</button>
                                                        </td>
                                                        <td><button onClick={() => deleteUserHandler(item._id)} className='btn btn-outline-danger'>Delete</button></td>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : navigate("/")}
                </> : navigate("/login")}
            </>}
            <Footer />
        </>
    )
}

export default Userlist