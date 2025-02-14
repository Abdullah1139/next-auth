import React from 'react'

const UserProfile = ({params}:any) => {
  return (
    <div className='text-4xl '>
      Hello {params.id}
    </div>
  )
}

export default UserProfile
