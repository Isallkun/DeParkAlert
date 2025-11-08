'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Camera, MapPin } from 'lucide-react'

export default function ReportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Submit New Report
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Help the community by reporting current parking conditions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Upload Photo
          </CardTitle>
          <CardDescription>
            Take or upload a photo of the parking situation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Drop your image here, or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Support for JPG, PNG up to 10MB
            </p>
            <Button>
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Location Information
          </CardTitle>
          <CardDescription>
            Specify where this photo was taken
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Location will be automatically detected from your device GPS
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Submit Report</Button>
      </div>
    </div>
  )
}