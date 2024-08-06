import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <main className='bg-white text-black h-[100vh] space-x-4'>
      <Link href={'/auth/login'}>Log In</Link>
      <Link href={'/auth/signup'}>Sign Up</Link>
    </main>
  )
}

export default page