import Button from "../../components/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import {EnvelopeIcon, LockClosedIcon} from "@heroicons/react/24/outline";
import {login} from "../../redux/user/userThunk.js";
import FormLayout from "../../components/Form.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import CheckboxInput from "../../components/inputs/CheckboxInput.jsx";
import SideBarAdd from "./components/SideBarAdd.jsx";
import Spinner from "../../components/Spinner.jsx";
import VerificationModal from "../../components/modals/VerificationModal.jsx";
import {selectCurrentUser} from "../../redux/user/userSlice.js";

const LoginForm = () => {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();
    const remember = useRef(null);

    const inputData = [{
        id: 1, placeHolder: 'Your Email', label: '', type: 'email', btnIcon: EnvelopeIcon, ref: email
    }, {
        id: 2, placeHolder: 'Password', label: '', type: 'password', btnIcon: LockClosedIcon, ref: password
    }]

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const body = {
            username: email.current?.value,
            password: password.current?.value,
        }
        const data = await dispatch(login(body))
        if (typeof data.payload === 'string') {
            setOpen(true)
        }
        setLoading(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('cw-access-token');
        if (currentUser && token) {
            if (currentUser.workspaces.length === 1) {
                localStorage.clear();
                window.location.href = `http://${currentUser.workspaces[0].domain}.localhost:3333/dashboard?token=${token}`
            } else {
                navigate('/domain/select')
            }
        }
        // eslint-disable-next-line
    }, [currentUser]);


    return (
        <section className='flex justify-center items-center w-full min-h-screen bg-gray-200 py-6'>
            <div className='flex w-11/12 sm:w-8/12 border rounded-3xl bg-white shadow-md'>
                <FormLayout handleSubmit={handleSubmit} title='Hi, Welcome Back' subtitle='Please enter your details'>
                    {inputData.map((item) => (<Input
                        key={item.id}
                        type={item.type}
                        placeholder={item.placeHolder}
                        BtnIcon={item.btnIcon}
                        inputRef={item.ref}
                        extraClasses='mb-6'
                    />))}
                    <div className='flex justify-between mb-4 flex-wrap gap-3'>
                        <CheckboxInput label='Remember me' inputRef={remember} extraClasses='text-sm'/>
                        <Link className='text-sm font-medium text-blue-600' to='/forgot-password'>Forgot
                            password?</Link>
                    </div>
                    <Button btnText='Login' fullWidth='w-9/12 mx-auto block my-4'
                            btnClasses='bg-bgDark border-textDark lg:px-16 sm:px-8 sm:py-3.5 py-3.5 w-full'/>
                    <div>
                        <p className="font-medium text-textDark text-sm">Don't have an account? <Link
                            to="/register" className="text-blue-600">Signup</Link></p>
                    </div>
                    {loading && <Spinner/>}
                </FormLayout>
                <VerificationModal open={open} setOpen={setOpen}/>
                <SideBarAdd/>
            </div>
        </section>
    )
}

export default LoginForm