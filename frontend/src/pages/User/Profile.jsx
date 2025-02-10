import {useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/feature/auth/authSlice";
import { Link } from "react-router";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const {userInfo} = useSelector(state => state.auth)

const[updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

useEffect(() => {
    setUsername(userInfo.username)
    setEmail(userInfo.email)
}, [userInfo.email, userInfo.username])

const dispatch = useDispatch();

const submitHandler = async (e) => {
    e.preventDefault()

    if(password != confirmPassword){
        toast.error('Password do not match')
    } else{
        try{
            const res = await updateProfile({
                _id: userInfo._id, 
                username, 
                email, 
                password,
            }).unwrap();
            dispatch(setCredientials({...res}));
            toast.success("Profile update successfully");
        } catch (error){
            toast.error(error?.data?.message || error.message);
        }
    }
}

  return (
  <div className="container mx-auto p-4 mt-[10rem]">
    <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <lable className="block text-black mb-2">Name</lable>
                <input
                    type="text"
                    placeholder="Enter name"
                    className="form-input p-4 rounded-sm w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </div>
            <div className="mb-4">
                <lable className="block text-black mb-2">Email</lable>
                <input
                    type="email"
                    placeholder="Enter email"
                    className="form-input p-4 rounded-sm w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
            <div className="mb-4">
                <lable className="block text-black mb-2">Password</lable>
                <input
                    type="password"
                    placeholder="Enter password"
                    className="form-input p-4 rounded-sm w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <div className="mb-4">
                <lable className="block text-black mb-2">Confirm Password</lable>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-input p-4 rounded-sm w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
            </div>
            <div className="flex justify-between">
                <button 
                type="submit" 
                className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-600"
                >
                    Update
                </button>

                <Link 
                    to="/user-orders" 
                    className="bg-green-600 text-black py-2 px-4 rounded hover:bg-green-700"
                >
                    My Orders
                </Link>
            </div>
        </form>
        </div>
        {loadingUpdateProfile && <Loader></Loader>}
        </div>
    </div>
  );  
};

export default Profile;