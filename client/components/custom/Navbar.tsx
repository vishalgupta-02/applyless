'use client'

import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/store/AuthContext'

const Navbar = () => {
  const { usertoken, logout } = useAuthContext()
  const navigate = useRouter()

  return (
    <div className="w-full sticky mx-auto px-24 py-4 flex justify-between items-center">
      <div className="flex justify-center items-center">
        <p className="text-3xl font-bold uppercase tracking-tighter">Chrono.</p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-md font-semibold">How It Works</p>
      </div>
      {usertoken ? (
        <div className="space-x-2">
          <Button
            className="bg-[#3B82F6] hover:cursor-pointer hover:bg-red-600 px-8 py-3 font-semibold"
            onClick={logout}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <>
          <div className="space-x-2">
            <Button
              className="bg-[#3B82F6] hover:cursor-pointer hover:bg-blue-400 px-8 py-3 font-semibold"
              onClick={() => navigate.push('/login')}
            >
              Sign In
            </Button>
            <Button
              className="bg-[#3B82F6] hover:cursor-pointer hover:bg-blue-400 font-semibold"
              onClick={() => navigate.push('/register')}
            >
              Create Workspace
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
