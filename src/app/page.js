'use client';

import UserCreation from "@/components/admin/user/UserCreation";
import { ActionIcon, Anchor, Avatar, Breadcrumbs, Button, Card, Group, Pagination, ScrollArea, Select, Table, TextInput, Title } from "@mantine/core";
import { IconEdit, IconPlus, IconSearch, IconTrash, IconUser } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const [page, setPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [swalProps, setSwalProps] = useState({});
  const [editData, setEditData] = useState({});
  const [delayTimer, setDelayTimer] = useState(null)


  useEffect(() => {
    fetchRecords();
  }, [page, search]);

  const fetchRecords = async (perPage = 0) => {
    const { data } = await axios.get('http://localhost:8000/api/users', { params: { page, itemsPerPage: perPage == 0 ? itemsPerPage : perPage, search } });
    setUsers(data.data);
    setTotalRecords(data.total)
    setTotalPage(data.totalPage)
  }
  const perPageChange = async (val) => {
    setItemsPerPage(val)
    if (page == 1) {
      fetchRecords(val)
    } else {
      setPage(1)
    }
  }
  const editUser = async (data) => {

    setEditData(data)
    setShowDialog(true)
  }

  const deleteUser = async (data) => {
    console.log(data)
    const action = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (action.isConfirmed) {
      const res = await axios.delete("http://localhost:8000/api/users/" + data.id);
      if (res.status == 200) {
        setUsers(users.filter(row => row.id != data.id));
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User deleted successfully',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }

  }
  const insertRecord = (data) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Record inserted successfully',
      showConfirmButton: false,
      timer: 2000
    })
    setUsers([data, ...users])

  }


  const updateRecord = (data) => {
    setUsers(users.map(row => {
      if (row.id == data.id)
        return data
      return row
    }))
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Record updated successfully',
      showConfirmButton: false,
      timer: 2000
    })
  }

  const items = [
    { title: 'Home', href: '#' },
    { title: 'User List', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} className="text-greyDark" key={index}>
      {item.title}
    </Anchor>
  ));
  const ths = (
    <tr>
      <th>ID</th>
      <th>Profile</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
  );

  const rows = users.map((row, index) => (
    <tr key={index}>
      <td>{row.id}</td>
      <td>  <Avatar src={row.profile} alt="cropped image" size='sm' className='rounded-full' /></td>
      <td>{row.first_name}</td>
      <td>{row.last_name}</td>
      <td>{row.username}</td>
      <td>{row.email}</td>
      <td>
        <Group >
          <ActionIcon onClick={() => editUser(row)} className=' bg-primary rounded-full' variant="filled"  ><IconEdit size="1rem" /></ActionIcon>
          <ActionIcon onClick={() => deleteUser(row)} className=' bg-red-800 rounded-full' variant="filled"  ><IconTrash size="1rem" /></ActionIcon>
        </Group>
      </td>
    </tr>
  ));
  return <>
    <UserCreation setShowDialog={setShowDialog} editData={editData} showDialog={showDialog} updateRecord={updateRecord} insertRecord={insertRecord}></UserCreation>
    <Card className="mb-4" shadow="sm" padding="lg" radius="md" withBorder >
      <div className="flex items-center text-greyDark ">
        <Avatar radius={50} size={"xl"} className="me-3">
          <IconUser size={50} />
        </Avatar>
        <div className="flex flex-col justify-between">
          <Title
            mb={5}
            style={{ fontSize: "28px" }}
          >
            User List
          </Title>
          <Breadcrumbs separator="→" mt="xs" className="text-greyDark">{items}</Breadcrumbs>
        </div>
      </div>

    </Card>

    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <div className="flex  align-middle justify-between pb-3">
        <p className="text-[22px] font-[500]">User List ({totalRecords})</p>
        <TextInput
          value={search} onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="type something..." icon={<IconSearch size="1.4rem" />}
          className="w-[250px]"
          size="md"
        />
      </div>
      <div className="flex justify-end pb-5">
        <Button onClick={() => {
          setEditData({})
          setShowDialog(true)
        }} variant="filled" className="bg-primary" leftIcon={<IconPlus size="1.4rem" />}>
          Create
        </Button>
      </div>

      <ScrollArea
        style={{ height: 610, position: "relative" }}
        offsetScrollbars
      >
        <Table striped highlightOnHover verticalSpacing="sm">
          <thead className="bg-gray-200">{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Group position="right" className="pt-3">
        <Select
          className="w-[100px]" size="sm"
          data={[
            { value: 10, label: 10 },
            { value: 20, label: 20 },
            { value: 50, label: 50 },
            { value: 100, label: 100 },
            { value: -1, label: "All" },
          ]}
          value={itemsPerPage} onChange={perPageChange}
        />
        <Pagination className="ps-5" value={page} onChange={setPage} total={(totalPage)} />
      </Group>
    </Card>
  </>;
};
