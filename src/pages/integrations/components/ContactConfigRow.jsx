import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import SelectInput from "../../../components/inputs/SelectInput";

const ContactConfigRow = ({item}) => {
    const user = useSelector(selectCurrentUser)
    const [folders, setFolders] = useState([])
    const [selected, setSelected] = useState(item.Inputs)

    useEffect(() => {
        axios.get(`http://localhost:3000/Integration/all-folders/${user._id}?integration_type=constant_contact`).then((value) => {
            setFolders(value.data.map((folder) => folder.name))
            console.log("folder", folders)
        }).catch((reason) => {
            toast.error(reason.response.data.message)
        })
    }, []);

    return (
        <tr>
            <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.templateName}</td>
            <td className='px-6 text-sm text-gray-900 whitespace-nowrap'>
                <SelectInput extraClasses='grow md:grow-0' options={folders} setState={setSelected}
                             state={selected}/>
            </td>

        </tr>
    );
};

export default ContactConfigRow;
