import $ from "jquery";
import React, {createRef, useEffect, useState} from "react";
import {capitalize, makeTemplate, staticForm,} from "../../../utils/generalFunctions";
import Button from "../../../components/Button";
import {TrashIcon} from "@heroicons/react/24/outline";
import {patchRequest} from "../../../redux/cwAPI";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetStatus, selectSingleWaiver, selectWaiverStatus,} from "../../../redux/waivers/waiverSlice";
import Spinner from "../../../components/Spinner";
import toast from "react-hot-toast";
import Modal from "../../../components/modals/Modal";
import {getSingleWaiver} from "../../../redux/waivers/waiverThunk";
import {hideList, options} from "../../../utils/builder";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("jq-signature");

const FormBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const waiver = useSelector(selectSingleWaiver);
  const status = useSelector(selectWaiverStatus);
  const fb = createRef();
  const [loading, setLoading] = useState(false);
  const [FormBuilder, setFormBuilder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    if (!FormBuilder?.formData && waiver && status === "fulfilled") {
      setFormBuilder(
        $(fb.current).formBuilder({
          disabledActionButtons: ["data", "clear", "save"],
          formData:
            waiver?.form_data?.length > 0 ? waiver?.form_data : staticForm,
          ...options,
          controlOrder: [
            "primaryAdultParticipant",
            "editable",
            "additionalParticipants",
            "additionalMinors",
            "signature",
            "address",
            "richTextEditor",
            "filesUpload",
            "electronicSignatureConsent",
            "capturePhoto",
          ],
        }),
      );

      //to conditionally hide and show additional Participants
      makeTemplate(waiver);
      //for template Gallery
      dispatch(resetStatus());
    }
    // eslint-disable-next-line
  }, [waiver, status]);

  function saveData(e, status) {
    setLoading(true);
    let jsonData = JSON.parse(FormBuilder.formData);
    let textAreaArr = document.querySelectorAll(".textarea-selector")[0];
    if (textAreaArr && jsonData) {
      // const richEditor = tinymce.get(textAreaArr.id);
      jsonData.map((item, index) => {
        if (item.type === "richTextEditor") {
          jsonData[index]["userData"] = <p>Start Typing here...</p>;
        }
        return item;
      });
    }
    patchRequest(`/waivers/${id}`, {form_data: jsonData})
      .then(() => toast.success("Saved Successfully"))
      .catch((e) => toast.error(e.response.data.message))
      .finally(() => {
        setOpenModal(false);
        dispatch(getSingleWaiver(id)).finally(() => dispatch(resetStatus()));
        !status && setLoading(false);
      });
    if (status) {
      patchRequest(`/waivers/${id}`, {status: "published"}).finally(() =>
        setLoading(false),
      );
    }
  }

  function handlePreview(status) {
    if (status && status !== 'draft') {
      navigate(`/template/${id}/public`)
    } else {
      toast.error('Waiver not published!')
    }
  }

  return (
    <div className="common main-form-builder">
      {/* <div className="flex justify-between pb-5 items-center flex-wrap gap-5 px-4 py-4">
        <Button
          btnText="Discard"
          btnClasses="text-red-500 bg-red-100 px-6 grow sm:grow-0"
          fullWidth="w-fit grow sm:grow-0"
          onClick={() => setOpenModal(true)}
          BtnIcon={TrashIcon}
          iconClasses="text-red-500"
        />
        <div className="flex gap-3 items-center flex-wrap ">
          <span
            className="text-yellow-800 text-sm font-semibold px-2.5 py-0.5 rounded text-center dark:bg-yellow-200 dark:text-yellow-900 grow sm:grow-0">
            {capitalize(waiver?.status)}
          </span>
          <Button btnText='Preview' onClick={() => handlePreview(waiver?.status)}
                  btnClasses='bg-gray-200 px-6 py-3 text-gray-900'/>
          {waiver?.status === "draft" ? (
            <>
              <Button
                btnText="Publish"
                btnClasses="bg-btnBg grow sm:grow-0"
                fullWidth="w-fit grow sm:grow-0"
                onClick={(e) => saveData(e, "publish")}
              />
              <Button
                btnText="Save"
                btnClasses="bg-btnBg grow sm:grow-0"
                fullWidth="w-fit grow sm:grow-0"
                onClick={saveData}
              />
            </>
          ) : (
            <Button
              btnText="Save/Publish"
              btnClasses="bg-btnBg grow sm:grow-0"
              fullWidth="w-fit grow sm:grow-0"
              onClick={saveData}
            />
          )}
        </div>
      </div> */}
     <div ref={fb}/>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        btnText="Confirm"
        functionCall={(name) => {
          if (name === "cancel") {
            setOpenModal(false);
            return;
          }
          hideList("block");
          FormBuilder.actions?.clearFields();
          for (let i = 0; i < staticForm.length; i++) {
            FormBuilder.actions.addField(staticForm[i]);
          }
          setOpenModal(false);
        }}
        description="Do you want to proceed with this action? This cannot be undone."
        title="Are you sure?"
      />
      {loading && <Spinner/>}
    </div>
  );
};

export default FormBuilder;
