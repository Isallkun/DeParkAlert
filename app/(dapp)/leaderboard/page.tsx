'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award } from 'lucide-react'

export default function LeaderboardPage() {
  const topUsers = [
    { rank: 1, name: "ParkingHero", reports: 342, reputation: 98, rewards: 342.5, trend: "up" },
    { rank: 2, name: "TrafficWatcher", reports: 298, reputation: 95, rewards: 298.0, trend: "up" },
    { rank: 3, name: "CityGuard", reports: 256, reputation: 92, rewards: 256.0, trend: "down" },
    { rank: 4, name: "ParkRanger", reports: 234, reputation: 89, rewards: 234.0, trend: "up" },
    { rank: 5, name: "StreetSaver", reports: 198, reputation: 87, rewards: 198.0, trend: "same" },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <span className="text-green-500 text-xs">↑</span>
      case "down":
        return <span className="text-red-500 text-xs">↓</span>
      default:
        return <span className="text-gray-500 text-xs">—</span>
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Community Leaderboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Top contributors making our parking system better
        </p>
      </div>

      {/* Top 3 Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topUsers.slice(0, 3).map((user, index) => (
          <Card key={user.rank} className={
            index === 0 ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" : ""
          }>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                {getRankIcon(user.rank)}
              </div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <CardDescription>
                Rank #{user.rank} Contributor
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div className="text-2xl font-bold">{user.reports}</div>
              <div className="text-sm text-gray-500">Total Reports</div>
              <div className="flex justify-between items-center pt-2">
                <div>
                  <div className="font-medium">{user.reputation}</div>
                  <div className="text-xs text-gray-500">Reputation</div>
                </div>
                <div>
                  <div className="font-medium">{user.rewards} TON</div>
                  <div className="text-xs text-gray-500">Rewards</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Rankings</CardTitle>
          <CardDescription>
            All-time top performers in the DeParkAlert community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topUsers.map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(user.rank)}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">
                      {user.reports} reports • {user.reputation} reputation
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">{user.rewards} TON</div>
                    <div className="text-sm text-gray-500">Total Rewards</div>
                  </div>
                  {getTrendIcon(user.trend)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Ranking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">You</div>
                <div className="text-sm text-gray-500">Keep contributing to climb the ranks!</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">#42</div>
                <div className="text-sm text-gray-500">Current Rank</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}