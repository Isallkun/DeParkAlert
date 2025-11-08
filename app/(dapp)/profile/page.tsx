'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { User, Trophy, Shield, Camera, Settings } from 'lucide-react'

export default function ProfilePage() {
  const userStats = {
    totalReports: 156,
    verifiedReports: 142,
    reputation: 85,
    totalRewards: 125.5,
    joinDate: "October 2024",
    achievements: [
      { name: "First Report", unlocked: true, date: "Oct 15, 2024" },
      { name: "Verified Reporter", unlocked: true, date: "Oct 28, 2024" },
      { name: "Community Hero", unlocked: true, date: "Nov 5, 2024" },
      { name: "Master Reporter", unlocked: false, date: null },
      { name: "Parking Expert", unlocked: false, date: null },
    ]
  }

  const recentActivity = [
    { type: "report", description: "Reported illegal parking at Jl. Sudirman", date: "2 hours ago", status: "verified" },
    { type: "reward", description: "Earned 2.5 TON for verified report", date: "4 hours ago", status: "completed" },
    { type: "report", description: "Reported full parking at Grand Indonesia", date: "6 hours ago", status: "pending" },
    { type: "achievement", description: "Unlocked 'Verified Reporter' badge", date: "2 days ago", status: "completed" },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your contributions and achievements in DeParkAlert
          </p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Anonymous User</h2>
                <p className="text-gray-500">Member since {userStats.joinDate}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                  <Badge variant="outline">Level 5</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold">{userStats.totalReports}</div>
                <div className="text-sm text-gray-500">Total Reports</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold">{userStats.verifiedReports}</div>
                <div className="text-sm text-gray-500">Verified</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold">{userStats.reputation}</div>
                <div className="text-sm text-gray-500">Reputation</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold">{userStats.totalRewards}</div>
                <div className="text-sm text-gray-500">TON Earned</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Reputation Progress</span>
                <span className="text-sm text-gray-500">85 / 100</span>
              </div>
              <Progress value={userStats.reputation} />
              <p className="text-xs text-gray-500 mt-1">15 more points to reach Level 6</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Achievements
            </CardTitle>
            <CardDescription>
              {userStats.achievements.filter(a => a.unlocked).length} of {userStats.achievements.length} unlocked
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userStats.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </div>
                    {achievement.unlocked && (
                      <div className="text-xs text-gray-500">{achievement.date}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest contributions and rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'verified' ? 'bg-green-500' :
                    activity.status === 'pending' ? 'bg-yellow-500' :
                    activity.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <div className="font-medium">{activity.description}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                </div>
                <Badge variant={
                  activity.status === 'verified' ? 'default' :
                  activity.status === 'pending' ? 'secondary' : 'outline'
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}