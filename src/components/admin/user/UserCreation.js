import CropperComponent from '@/components/commons/CropperComponent';
import { ActionIcon, Avatar, Box, Button, CloseButton, Group, Image, Loader, Modal, Notification, TextInput, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { createRef, useEffect, useState } from 'react'
import axios from 'axios';
import { IconEdit, IconPencil, IconX } from '@tabler/icons-react';

function UserCreation({ showDialog, setShowDialog, insertRecord, updateRecord, editData }) {
  const theme = useMantineTheme();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = createRef(null);
  const [errorMessage, setErrorMessage] = useState('')
  const [submiting, setSubmiting] = useState(false)

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      form.setValues(editData);
      setPreviewImage(editData.profile)
    }
  }, [editData])



  const handleEmulatedFileInput = () => {
    fileInputRef.current.click();
  };
  const cancelCrop = () => {
    setImage(null)
    setShowCropper(false)
  }
  const form = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      profile: ''
    },
    validate: {

    },
  });

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    setShowCropper(true)
    reader.readAsDataURL(files[0]);
  };
  const onCrop = (blob) => {
    setPreviewImage(blob.path)
    form.values.profile = blob.file
    setShowCropper(false)
  }



  const submit = async () => {
    try {
      if (submiting)
        return
      const formData = new FormData();
      if (typeof form.values.profile == 'object')
        formData.append('profile', form.values.profile, 'profile.jpeg');
      formData.append('first_name', form.values.first_name);
      formData.append('email', form.values.email);
      formData.append('last_name', form.values.last_name);
      formData.append('username', form.values.username);

      if (Object.keys(editData).length == 0) {
        formData.append('password', form.values.password);
        formData.append('confirm_password', form.values.confirm_password);
      }
      setSubmiting(true)
      const url = Object.keys(editData).length > 0 ? `users/${editData.id}?_method=PUT` : 'users?_method=POST'
      const res = await axios.post('http://localhost:8000/api/' + url, formData);
      if (Object.keys(editData).length == 0) {
        insertRecord(res.data)
      } else {
        updateRecord(res.data)
      }
      closeDialog()
    } catch (error) {
      if (error.response) {
        setErrorMessage(error?.response?.data)
        setTimeout(() => setErrorMessage(''), 3000)
      }
      console.log('error', error)
    }
    setSubmiting(false)
  }



  const closeDialog = () => {
    const val = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      profile: ''
    }
    form.setValues(val)
    setPreviewImage(null)
    setShowDialog(false)
  }
  return (
    <>
      <Modal
        closeOnClickOutside={false}
        opened={showDialog} onClose={() => setShowDialog(false)}
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        centered
        withCloseButton={false}
        size={800}

      >

        <CropperComponent
          showCropper={showCropper}
          setShowCropper={setShowCropper}
          image={image}
          cancel={cancelCrop}
          onCrop={onCrop}
        ></CropperComponent>
        <input type="file" onChange={onChange} className='hidden' ref={fileInputRef} />
        <div className='flex align-center justify-between'>
          <p className='font-normal text-[16px]'>  {Object.keys(editData).length > 0 ? "Edit User" : "Create User"}</p>
          <CloseButton title="Close Form" size="md" className="rounded-full bg-primary text-white p-1"
            onClick={closeDialog}
            aria-label="Close modal" />
        </div>

        <Box >
          <form onSubmit={() => { }}>
            <div className='flex justify-center pb-10'>
              <div className='p-[2px] flex rounded-full border-2 border-dashed border-greyOpacity relative'>
                <Avatar src={previewImage} alt="cropped image" size='xl' className='rounded-full' />
                <ActionIcon onClick={handleEmulatedFileInput} className='absolute right-0 bottom-[-4px] bg-primary rounded-full' variant="filled"  ><IconEdit size="1rem" /></ActionIcon>
              </div>
            </div>


            <div className="md:flex md:space-x-4 w-full pb-3">

              <div className="w-full">
                <TextInput
                  withAsterisk
                  label="First name"
                  placeholder="First name"
                  {...form.getInputProps('first_name')}
                />
              </div>
              <div className="w-full">
                <TextInput
                  withAsterisk
                  label="Last name"
                  placeholder="Last name"
                  {...form.getInputProps('last_name')}
                />
              </div>
            </div>
            <div className="md:flex md:space-x-4 w-full  pb-3">
              <div className="w-full">
                <TextInput
                  withAsterisk
                  label="Username"
                  placeholder="username"
                  {...form.getInputProps('username')}
                />
              </div>
              <div className="w-full">
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps('email')}
                />
              </div>
            </div>
            {
              Object.keys(editData).length > 0 ? <></> :
                <div className="md:flex md:space-x-4 w-full  pb-3">
                  <div className="w-full">
                    <TextInput
                      type='password'
                      withAsterisk
                      label="Password"
                      placeholder="password"
                      {...form.getInputProps('password')}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      withAsterisk
                      label="Confirm password"
                      placeholder="Confirm password"
                      {...form.getInputProps('confirm_password')}
                    />
                  </div>
                </div>
            }
            <Group position="right" mt="md">
              <Button className='bg-primary' onClick={submit}>
                {submiting ? 'Submitting...' : 'Submit'} </Button>
            </Group>
          </form>
        </Box>
      </Modal>
      {
        errorMessage != '' ? <Group position="right" mt="md" >
          <Notification icon={<IconX size="1.1rem" />} onClose={() => setErrorMessage("")} color="red" className='absolute z-[10000] w-[300px]'>
            {errorMessage}
          </Notification>
        </Group> : <></>
      }
    </>
  )
}

export default UserCreation