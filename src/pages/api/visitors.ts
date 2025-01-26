import { NextApiRequest, NextApiResponse } from 'next'

// Define a Visitor type if not already defined
interface Visitor {
  id: number
  name: string
  residenceNo: string
  dateVisit: string
  timeVisit: string
}

// Mock data for visitors
const mockVisitors: Visitor[] = [
  { id: 1, name: 'John Doe', residenceNo: '101', dateVisit: '2023-10-01', timeVisit: '10:00 AM' },
  { id: 2, name: 'Jane Smith', residenceNo: '102', dateVisit: '2023-10-02', timeVisit: '11:00 AM' }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Visitor[]>) {
  // Return mock data instead of fetching from Swagger
  res.status(200).json(mockVisitors)
}
