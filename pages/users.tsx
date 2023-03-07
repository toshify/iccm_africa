import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })


function Users() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('/api/users')
      .then((res) => {
        res.json().then((payload) => {
          if (payload && payload.data){
            setData(payload.data)
            setLoading(false)
          } else {
            console.log('no data')
          }
        });
      })
  }, [])
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No users found</p>

  const userList = data.map(function(user){
    return (
      <li>
        {user.id} {user.name} {user.email} {user.role} {user.accomodation_id} {user.group_id} {user.gender}
      </li>
    )
  });

  return (
    <ul>
      {userList}
    </ul>
  )
}

export default function UserList() {
  return (
    <>
      <Head>
        <title>ICCM User List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col justify-center items-center p-24 min-h-screen'>
        <div className='flex flex-col justify-center items-center font-sm w-full z-2 font-mono'>
          <h1 className='text-2xl mb-2'>User List</h1>
          <Users />
        </div>
      </main>
    </>
  );
}