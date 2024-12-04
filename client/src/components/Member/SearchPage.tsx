import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { users } from '../../helpers/data/user'
import { UserCard } from './UserCard'

export function SearchPage() {
  const [query, setQuery] = useState('')
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.role.toLowerCase().includes(query.toLowerCase()) ||
    user.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Users</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, role, or skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}