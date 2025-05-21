"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Save,
  Mail,
  Bell,
  Shield,
  Users,
  Globe,
  Settings,
  AlertCircle,
} from "lucide-react"

// Sample settings data
const initialSettings = {
  general: {
    siteName: "OMS System",
    siteDescription: "Organization Management System",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    maintenanceMode: false,
  },
  email: {
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "noreply@example.com",
    smtpPassword: "********",
    fromName: "OMS System",
    fromEmail: "noreply@example.com",
    enableNotifications: true,
  },
  security: {
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    passwordExpiry: "90",
    requireStrongPasswords: true,
    enable2FA: true,
    allowedFileTypes: ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png",
    maxFileSize: "10",
  },
  notifications: {
    enableEmailNotifications: true,
    enablePushNotifications: true,
    notifyOnNewTicket: true,
    notifyOnTicketUpdate: true,
    notifyOnTicketAssignment: true,
    notifyOnTicketResolution: true,
    notifyOnNewUser: true,
  },
  users: {
    allowUserRegistration: true,
    requireEmailVerification: true,
    defaultUserRole: "user",
    allowProfileUpdates: true,
    maxUsersPerDepartment: "50",
    enableUserGroups: true,
  },
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState(initialSettings)
  const [activeTab, setActiveTab] = useState("general")

  const handleSave = (section: string) => {
    // Here you would typically make an API call to save the settings
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    })
  }

  const handleChange = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button onClick={() => handleSave(activeTab)}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => handleChange("general", "siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={settings.general.siteDescription}
                    onChange={(e) => handleChange("general", "siteDescription", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => handleChange("general", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.general.dateFormat}
                    onValueChange={(value) => handleChange("general", "dateFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={(checked) =>
                    handleChange("general", "maintenanceMode", checked)
                  }
                />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.email.smtpHost}
                    onChange={(e) => handleChange("email", "smtpHost", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={settings.email.smtpPort}
                    onChange={(e) => handleChange("email", "smtpPort", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    value={settings.email.smtpUser}
                    onChange={(e) => handleChange("email", "smtpUser", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) => handleChange("email", "smtpPassword", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.email.fromName}
                    onChange={(e) => handleChange("email", "fromName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => handleChange("email", "fromEmail", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableNotifications"
                  checked={settings.email.enableNotifications}
                  onCheckedChange={(checked) =>
                    handleChange("email", "enableNotifications", checked)
                  }
                />
                <Label htmlFor="enableNotifications">Enable Email Notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleChange("security", "sessionTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => handleChange("security", "maxLoginAttempts", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) => handleChange("security", "passwordExpiry", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.security.maxFileSize}
                    onChange={(e) => handleChange("security", "maxFileSize", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                <Input
                  id="allowedFileTypes"
                  value={settings.security.allowedFileTypes}
                  onChange={(e) => handleChange("security", "allowedFileTypes", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Comma-separated list of allowed file extensions
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireStrongPasswords"
                    checked={settings.security.requireStrongPasswords}
                    onCheckedChange={(checked) =>
                      handleChange("security", "requireStrongPasswords", checked)
                    }
                  />
                  <Label htmlFor="requireStrongPasswords">Require Strong Passwords</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable2FA"
                    checked={settings.security.enable2FA}
                    onCheckedChange={(checked) =>
                      handleChange("security", "enable2FA", checked)
                    }
                  />
                  <Label htmlFor="enable2FA">Enable Two-Factor Authentication</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableEmailNotifications"
                    checked={settings.notifications.enableEmailNotifications}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", "enableEmailNotifications", checked)
                    }
                  />
                  <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enablePushNotifications"
                    checked={settings.notifications.enablePushNotifications}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", "enablePushNotifications", checked)
                    }
                  />
                  <Label htmlFor="enablePushNotifications">Enable Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifyOnNewTicket"
                    checked={settings.notifications.notifyOnNewTicket}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", "notifyOnNewTicket", checked)
                    }
                  />
                  <Label htmlFor="notifyOnNewTicket">Notify on New Ticket</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifyOnTicketUpdate"
                    checked={settings.notifications.notifyOnTicketUpdate}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", "notifyOnTicketUpdate", checked)
                    }
                  />
                  <Label htmlFor="notifyOnTicketUpdate">Notify on Ticket Update</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifyOnTicketAssignment"
                    checked={settings.notifications.notifyOnTicketAssignment}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", "notifyOnTicketAssignment", checked)
                    }
                  />
                  <Label htmlFor="notifyOnTicketAssignment">Notify on Ticket Assignment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifyOnTicketResolution"
                    checked={settings.notifications.notifyOnTicketResolution}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", "notifyOnTicketResolution", checked)
                    }
                  />
                  <Label htmlFor="notifyOnTicketResolution">Notify on Ticket Resolution</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifyOnNewUser"
                    checked={settings.notifications.notifyOnNewUser}
                    onCheckedChange={(checked) =>
                      handleChange("notifications", "notifyOnNewUser", checked)
                    }
                  />
                  <Label htmlFor="notifyOnNewUser">Notify on New User Registration</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="defaultUserRole">Default User Role</Label>
                  <Select
                    value={settings.users.defaultUserRole}
                    onValueChange={(value) => handleChange("users", "defaultUserRole", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select default role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUsersPerDepartment">Max Users per Department</Label>
                  <Input
                    id="maxUsersPerDepartment"
                    type="number"
                    value={settings.users.maxUsersPerDepartment}
                    onChange={(e) =>
                      handleChange("users", "maxUsersPerDepartment", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowUserRegistration"
                    checked={settings.users.allowUserRegistration}
                    onCheckedChange={(checked) =>
                      handleChange("users", "allowUserRegistration", checked)
                    }
                  />
                  <Label htmlFor="allowUserRegistration">Allow User Registration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireEmailVerification"
                    checked={settings.users.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      handleChange("users", "requireEmailVerification", checked)
                    }
                  />
                  <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowProfileUpdates"
                    checked={settings.users.allowProfileUpdates}
                    onCheckedChange={(checked) =>
                      handleChange("users", "allowProfileUpdates", checked)
                    }
                  />
                  <Label htmlFor="allowProfileUpdates">Allow Profile Updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableUserGroups"
                    checked={settings.users.enableUserGroups}
                    onCheckedChange={(checked) =>
                      handleChange("users", "enableUserGroups", checked)
                    }
                  />
                  <Label htmlFor="enableUserGroups">Enable User Groups</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 