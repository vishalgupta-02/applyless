'use client'

import { registerUser } from '@/app/api/register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const Login = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<unknown>('')

  const navigate = useRouter()

  const userRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const userRegistered = await registerUser({ email, password, name })
      console.log('User Data ', userRegistered)
      setUser(userRegistered)
      if (!userRegistered) {
        navigate.push('/register')
        toast.error('User register failed')
      } else {
        navigate.push('/dashboard')
        toast.success('User registered successfully')
      }
    } catch (error) {
      console.error(error || 'Error while login')
      toast.error('Error occurred while logging in')
    }
  }

  return (
    <section className="w-full mx-auto px-24 py-12">
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={(e) => userRegister(e)}
          className="w-full max-w-lg flex flex-col justify-center items-center gap-4 border border-gray-500 px-12 py-8 rounded-xl"
        >
          <div className="w-full text-left space-y-1">
            <h1 className="text-2xl font-bold hover:text-gray-600">
              Sign Up Form
            </h1>
            <p className="text-sm font-normal">New to Chrono?</p>
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="name" className="text-md">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none w-full max-w-xl focus-visible:ring-0 px-4 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="email" className="text-md">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none w-full max-w-xl focus-visible:ring-0 px-4 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="password" className="text-md">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none w-full max-w-xl focus-visible:ring-0 px-4 py-2 border border-gray-300 rounded-sm"
            />
          </div>
          <div className="text-right w-full">
            <p className="text-gray-800 hover:text-[#3B82F6] font-semibold hover:cursor-pointer text-sm">
              Forgot your password?
            </p>
          </div>
          <div>
            <Button
              className="bg-[#3B82F6] hover:cursor-pointer hover:bg-blue-400 px-8 py-3 font-semibold w-48"
              size="lg"
            >
              Register
            </Button>
          </div>
          <div className="mt-2 w-full text-center font-semibold">
            <p>
              Don&apos;t have an account?{' '}
              <span
                className="text-gray-800 hover:text-[#3B82F6] hover:cursor-pointer"
                onClick={() => navigate.push('/login')}
              >
                Sign In Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
