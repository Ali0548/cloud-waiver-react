import Modal from "../../../components/modals/Modal";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, CheckIcon, ClipboardIcon, PencilIcon } from "@heroicons/react/24/outline";
import Tabs from "../../../components/Tabs";
import { limitChars, tabsData } from "../../../utils/generalFunctions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getSingleWaiver } from "../../../redux/waivers/waiverThunk";
import { selectSingleWaiver, updateWaiver } from "../../../redux/waivers/waiverSlice";
import { getDynamicTenantId, patchRequest } from "../../../redux/cwAPI";
import toast from 'react-hot-toast';
import Button from "../../../components/Button";
import QRCodeComponent from "../../../components/QrCode";
import backArrow from '../../../assets/images/icons/backArrow.png'
import './Template.scss'
const TemplateContainer = ({ children }) => {
  const dispatch = useDispatch();
  const waiver = useSelector(selectSingleWaiver);
  const [editMode, setEditMode] = useState(false);
  const [copyState, setCopyState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation().pathname;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getSingleWaiver(id)).finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      setCopyState(false)
    }, 5000)
  }, [copyState]);


  function handleEdit(name) {
    if (name === 'cancel') {
      setEditMode(false);
      return
    }
    setLoading(true);
    patchRequest(`/waivers/${id}`, { name })
      .then(r => {
        toast.success('Updated Successfully');
        dispatch(updateWaiver(name))
      })
      .catch(e => e.response.data.message)
      .finally(() => {
        setLoading(false);
        setEditMode(false);
      })
  }

  return (
    <main >
      {loading && <Spinner />}
      <div className="bg-white shadow rounded-md">
        <div className="flex items-center px-4 py-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            {/* <ArrowLeftIcon className="w-5 h-5 mr-2" /> */}
           
              <img src={backArrow} className="w-2 h- mr-2" alt="" />
          
            <span className="mr-2">Back</span>
          </button>
          <Tabs tabs={tabsData} />
        </div>
   
          {children}
      </div>

    </main>


  )
}

export default TemplateContainer