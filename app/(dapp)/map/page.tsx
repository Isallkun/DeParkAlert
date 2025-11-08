'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Map as MapIcon, Filter } from 'lucide-react'

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Live Parking Map
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time parking conditions across the city
          </p>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapIcon className="w-5 h-5 mr-2" />
            Interactive Map
          </CardTitle>
          <CardDescription>
            Click on markers to see detailed parking information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Interactive Map Coming Soon
              </p>
              <p className="text-sm text-gray-500">
                Will display real-time parking reports and conditions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="font-medium">Normal Parking</div>
                <div className="text-sm text-gray-500">Available spots</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <div className="font-medium">Full Parking</div>
                <div className="text-sm text-gray-500">No spots available</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <div className="font-medium">Illegal Parking</div>
                <div className="text-sm text-gray-500">Violations detected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}