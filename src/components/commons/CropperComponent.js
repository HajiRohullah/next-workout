import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button, CloseButton, Group, Modal } from "@mantine/core";
import axios from 'axios';

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const CropperComponent = ({ showCropper, setShowCropper, image, onCrop, cancel }) => {
  const cropperRef = createRef(Cropper);


  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
      const imagePath = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          onCrop({ file: blob, path: imagePath })
        }
      }, 'image/jpeg');

    }
  };

  return (
    // closeOnClickOutside={false}
    <Modal
      closeOnClickOutside={false}

      opened={showCropper} onClose={() => setShowCropper(false)}
      centered
      withCloseButton={false}
      size={800}
    >

      <div className='flex align-center justify-between  pb-3'>
        <p className='font-normal text-[16px]'>Crop Image</p>
        <CloseButton
          title="Close Form" size="md" className="rounded-full bg-primary text-white p-1"
          onClick={() => setShowCropper(false)}
          aria-label="Close modal" />
      </div>
      <Cropper
        ref={cropperRef}
        style={{ height: 400, width: "100%" }}
        zoomTo={0}
        initialAspectRatio={1}
        src={image}
        viewMode={1}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        guides={true}
      />
      <Group position="right" mt="md">
        <Button className='bg-greyDark' onClick={cancel}>Cancel</Button>
        <Button className='bg-primary' onClick={getCropData}>Crop</Button>
      </Group>
    </Modal>
  );
};

export default CropperComponent;
