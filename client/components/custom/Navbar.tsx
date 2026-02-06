'use client'

import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/store/AuthContext'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const Navbar = () => {
  const { usertoken, logout } = useAuthContext()
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useRouter()

  return (
    <div className='w-full md:sticky mx-auto lg:px-24 md:px-16 px-8 py-4 flex justify-between items-center relative'>
      <div className='flex justify-center items-center'>
        <div
          className='text-3xl font-bold uppercase tracking-tighter cursor-pointer flex justify-center items-center gap-1'
          onClick={() => navigate.push('/')}>
          <p className='font-serif'>
            Chr
            <span className='text-blue-700 m-0 p-0'>o</span>
            no.
          </p>
        </div>
      </div>
      <div className='lg:flex hidden justify-center items-center'>
        <p className='text-md font-semibold'>How It Works</p>
      </div>
      {usertoken ? (
        <div className='space-x-2 hidden lg:flex flex-row justify-center items-center gap-4'>
          <Button
            className='bg-blue-700 hover:cursor-pointer hover:bg-blue-600 px-8 py-3 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20'
            onClick={() => navigate.push('/dashboard')}>
            Dashboard
          </Button>
          <Button
            className='bg-blue-700 hover:cursor-pointer hover:bg-red-600 px-8 py-3 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20'
            onClick={() => {
              toast.success('Logged out successfully')
              logout()
              navigate.push('/login')
            }}>
            Log Out
          </Button>
        </div>
      ) : (
        <>
          <div className='space-x-2 hidden lg:flex flex-row justify-center items-center gap-4'>
            <Button
              className='bg-blue-700 hover:cursor-pointer hover:bg-blue-600 px-8 py-3 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20'
              onClick={() => navigate.push('/login')}>
              Sign In
            </Button>
            <Button
              className='bg-blue-700 hover:cursor-pointer hover:bg-blue-600 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20'
              onClick={() => navigate.push('/register')}>
              Create Workspace
            </Button>
          </div>
        </>
      )}
      {open ? (
        <>
          <div className='fixed inset-0 bg-custom-background z-50 w-full h-screen max-h-full flex flex-col gap-12 justify-start items-start px-12 py-8'>
            <div className='flex justify-end items-end w-full'>
              <Button onClick={() => setOpen(false)} variant='secondary'>
                <X className='w-12 h-12 text-blue-700 hover:text-red-600' />
              </Button>
            </div>
            <div className='space-y-2'>
              <p
                className='text-3xl font-bold uppercase tracking-tighter cursor-pointer'
                onClick={() => navigate.push('/')}>
                Chrono.
              </p>
              <p>Your personal job tracking webapp</p>
            </div>
            {usertoken ? (
              <div className='w-full'>
                <Button
                  className='bg-blue-700 hover:cursor-pointer hover:bg-red-600 px-8 py-3 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20 w-full'
                  onClick={() => {
                    toast.success('Logged out successfully')
                    logout()
                    navigate.push('/login')
                    setOpen(false)
                  }}>
                  Log Out
                </Button>
              </div>
            ) : (
              <>
                <div className='space-x-2 flex flex-col justify-center items-start gap-4 w-full'>
                  <Button
                    className='bg-blue-700 hover:cursor-pointer hover:bg-blue-600 px-8 py-3 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20 w-full'
                    onClick={() => {
                      navigate.push('/login')
                      setOpen(false)
                    }}>
                    Sign In
                  </Button>
                  <Button
                    className='bg-blue-700 hover:cursor-pointer hover:bg-blue-600 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20 w-full'
                    onClick={() => {
                      navigate.push('/register')
                      setOpen(false)
                    }}>
                    Create Workspace
                  </Button>
                </div>
              </>
            )}
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                *More features will be coming soon. So stay tuned.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className='block lg:hidden'>
          <Button variant='outline' onClick={() => setOpen(!open)}>
            <Menu className='w-8 h-8 text-blue-700 bg-white' />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Navbar
