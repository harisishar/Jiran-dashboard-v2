// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { UserDataType } from 'src/context/types'

const users: UserDataType[] = [
  {
    id: 1,
    role: 'admin',
    password: 'admin',
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'admin@jiran.com'
  },
  {
    id: 2,
    role: 'client',
    password: 'client',
    fullName: 'Jane Doe',
    username: 'janedoe',
    email: 'client@jiran.com'
  }
]

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET || 'jiran-32-character-long-secret-key-1234',
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION || '1h',
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET || 'jiran-refresh-secret-32-char-long-5678'
}

console.log('[MOCK] JWT Config:', jwtConfig)

type ResponseType = [number, { [key: string]: any }]

// Replace token generation with simple mock tokens
const generateMockToken = (userId: number) => `mock-token-${userId}-${Date.now()}`

mock.onPost('/jwt/login').reply(request => {
  console.log('[MOCK] Login request:', request.data)
  try {
    const { email, password } = JSON.parse(request.data)

    // Validate input format
    if (typeof email !== 'string' || typeof password !== 'string') {
      return [400, { error: { email: ['Invalid request format'] } }]
    }

    // Validate required fields
    if (!email?.trim() || !password?.trim()) {
      return [400, { error: { email: ['Please fill in all fields'] } }]
    }

    // Normalize inputs
    const cleanEmail = email.toLowerCase().trim()
    const cleanPassword = password.trim()

    // Find user with case-insensitive email match
    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword)

    console.log('[MOCK] User lookup result:', user ? 'Valid' : 'Invalid')

    if (user) {
      // Replace JWT sign with mock token generation
      const accessToken = generateMockToken(user.id)

      console.log('[MOCK] Generated mock token:', accessToken)

      return [
        200,
        {
          accessToken,
          userData: {
            ...user,
            password: undefined,
            ability: [{ action: 'manage', subject: 'all' }]
          }
        }
      ]
    }

    return [
      400,
      {
        error: {
          email: ['Invalid email or password'],
          password: ['Invalid email or password']
        }
      }
    ]
  } catch (error) {
    console.error('[MOCK] Login error:', error)

    return [500, { error: { email: ['Internal server error'] } }]
  }
})

mock.onPost('/jwt/register').reply(request => {
  if (request.data.length > 0) {
    const { email, password, username } = JSON.parse(request.data)
    const isEmailAlreadyInUse = users.find(user => user.email === email)
    const isUsernameAlreadyInUse = users.find(user => user.username === username)
    const error = {
      email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
      username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
    }

    if (!error.username && !error.email) {
      const { length } = users
      let lastIndex = 0
      if (length) {
        lastIndex = users[length - 1].id
      }
      const userData = {
        id: lastIndex + 1,
        email,
        password,
        username,
        avatar: null,
        fullName: '',
        role: 'admin'
      }

      users.push(userData)

      const accessToken = jwtConfig.secret as string

      const user = { ...userData }
      delete user.password

      const response = { accessToken }

      return [200, response]
    }

    return [200, { error }]
  } else {
    return [401, { error: 'Invalid Data' }]
  }
})

// Remove all jwt.verify references in /auth/me handler
mock.onGet('/auth/me').reply(config => {
  const token = config.headers?.Authorization
  const response: ResponseType = [401, { error: 'Invalid token' }]

  if (typeof token === 'string' && token.startsWith('mock-token')) {
    const userId = Number(token.split('-')[2])
    const user = users.find(u => u.id === userId)

    if (user) {
      response[0] = 200
      response[1] = { userData: { ...user, password: undefined } }
    }
  }

  return response
})
