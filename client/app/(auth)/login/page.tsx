'use client'

import { loginUser } from '@/app/api/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthContext } from '@/store/AuthContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUsertoken } = useAuthContext()

  const navigate = useRouter()

  const userLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const userLogged = await loginUser({ email, password })
      console.log('User Data ', userLogged)
      if (userLogged.token) {
        setUsertoken(userLogged.token)
      } else {
        toast.error('No token received from server')
      }
    } catch (error) {
      console.error(error || 'Error while login')
      localStorage.clear() // why keep the empty value in localStorage
      toast.error('Error occurred while logging in')
    }
  }

  return (
    <section className="w-full mx-auto md:px-24 px-8 py-12">
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={(e) => userLogin(e)}
          className="w-full max-w-lg flex flex-col justify-center items-center gap-4 border border-gray-500 md:px-12 md:py-8 px-4 py-4  rounded-xl"
        >
          <div className="w-full text-left space-y-1">
            <h1 className="md:text-2xl text-xl font-bold hover:text-gray-600">
              Login Form
            </h1>
            <p className="md:text-sm text-xs font-normal">
              Welcome back Warrior!
            </p>
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="email" className="md:text-md text-xs">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none w-full max-w-xl focus-visible:ring-0 md:px-4 md:py-2 p-1 border border-gray-300 rounded-sm"
            />
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="password" className="md:text-md text-xs">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none w-full max-w-xl focus-visible:ring-0 md:px-4 md:py-2 p-1 border border-gray-300 rounded-sm"
            />
          </div>
          <div className="text-right w-full">
            <p className="text-gray-600 hover:text-blue-700 font-semibold hover:cursor-pointer md:text-sm text-xs">
              Forgot your password?
            </p>
          </div>
          <div>
            <Button
              className="bg-blue-700 hover:cursor-pointer hover:bg-blue-600 md:px-8 md:py-3 px-4 py-1 font-semibold w-48 shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20"
              size="lg"
            >
              Sign In
            </Button>
          </div>
          <div className="mt-2 w-full text-center font-semibold">
            <p className="text-xs md:text-md">
              Already have an account?{' '}
              <span
                className="text-blue-700 hover:text-blue-600 hover:cursor-pointer"
                onClick={() => navigate.push('/register')}
              >
                Sign Up Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
