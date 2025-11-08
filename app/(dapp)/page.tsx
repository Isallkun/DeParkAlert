'use client'

import { useTonWallet } from '@tonconnect/ui-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import {
  Car,
  Upload,
  Map,
  TrendingUp,
  Users,
  Camera,
  Shield,
  Trophy,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function DAppDashboard() {
  const wallet = useTonWallet()

  // Mock data - akan diganti dengan real data dari API
  const stats = {
    totalReports: 156,
    verifiedReports: 142,
    pendingReports: 8,
    rejectedReports: 6,
    reputation: 85,
    rewards: 125.5,
    activeUsers: 1240,
    totalReportsToday: 89
  }

  const recentReports = [
    {
      id: '1',
      type: 'illegal_parking',
      location: 'Jl. Sudirman No. 123',
      status: 'verified',
      timestamp: '2 hours ago',
      reward: 2.5
    },
    {
      id: '2',
      type: 'full_parking',
      location: 'Grand Indonesia Parking',
      status: 'pending',
      timestamp: '4 hours ago',
      reward: 1.5
    },
    {
      id: '3',
      type: 'normal_parking',
      location: 'Senayan City',
      status: 'verified',
      timestamp: '6 hours ago',
      reward: 1.0
    }
  ]

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'illegal_parking':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'full_parking':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  if (!wallet) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Wallet className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to DeParkAlert DApp
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect your TON wallet to start reporting traffic conditions and earning rewards.
            Help make our city's parking system more efficient and transparent.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Why Connect Your Wallet?
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Submit verified traffic reports</li>
              <li>• Earn TON tokens for valid reports</li>
              <li>• Build your reputation score</li>
              <li>• Access exclusive features</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-blue-100 mb-4">
          Your contributions are making parking better for everyone. Keep up the great work!
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/dapp/report">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              <Upload className="w-4 h-4 mr-2" />
              Submit New Report
            </Button>
          </Link>
          <Link href="/dapp/map">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Map className="w-4 h-4 mr-2" />
              View Map
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reputation}</div>
            <Progress value={stats.reputation} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rewards} TON</div>
            <p className="text-xs text-muted-foreground">
              Earned from verified reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.verifiedReports / stats.totalReports) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.verifiedReports} of {stats.totalReports} verified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Reports
            </CardTitle>
            <CardDescription>
              Your latest traffic condition reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getReportIcon(report.type)}
                    <div>
                      <div className="font-medium">{report.location}</div>
                      <div className="text-sm text-gray-500">{report.timestamp}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-medium">{report.reward} TON</div>
                      {getStatusBadge(report.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link href="/dapp/profile">
                <Button variant="outline" className="w-full">
                  View All Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dapp/report">
              <Button className="w-full justify-start">
                <Camera className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </Link>
            <Link href="/dapp/map">
              <Button variant="outline" className="w-full justify-start">
                <Map className="w-4 h-4 mr-2" />
                Live Map
              </Button>
            </Link>
            <Link href="/dapp/leaderboard">
              <Button variant="outline" className="w-full justify-start">
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </Link>
            <Link href="/dapp/profile">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                My Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Community Impact</CardTitle>
          <CardDescription>
            Real-time statistics from all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.activeUsers}</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.totalReportsToday}</div>
              <div className="text-sm text-gray-500">Reports Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-500">Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}