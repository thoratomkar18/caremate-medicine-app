import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Plus,
  Trash2,
  Check,
  X,
  Package,
  ShoppingBag,
  HelpCircle
} from 'lucide-react'
import { apiClient } from '../services/api'
import Button from '../components/Button'
import Input from '../components/Input'
import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })

  const { data: addresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => apiClient.getAddresses(),
  })

  const handleProfileEdit = () => {
    setEditingProfile(true)
  }

  const handleProfileSave = () => {
    updateUser({ ...user, ...profileData })
    setEditingProfile(false)
  }

  const handleProfileCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    })
    setEditingProfile(false)
  }

  const handleAddressEdit = (address) => {
    setEditingAddress(address)
  }

  const handleAddressSave = () => {
    // Save address logic would go here
    setEditingAddress(null)
  }

  const handleAddressCancel = () => {
    setEditingAddress(null)
  }

  const handleDeleteAddress = (addressId) => {
    // Delete address logic would go here
    console.log('Delete address:', addressId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-muted-900 mb-2">Profile</h1>
        <p className="text-muted-600">Manage your account information and addresses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-muted-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-muted-900">Personal Information</h2>
              {!editingProfile && (
                <Button
                  onClick={handleProfileEdit}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            {editingProfile ? (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
                <Input
                  label="Phone Number"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
                <div className="flex space-x-3">
                  <Button onClick={handleProfileSave}>
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleProfileCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-muted-500" />
                  <div>
                    <p className="text-sm text-muted-500">Full Name</p>
                    <p className="font-medium text-muted-900">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-500" />
                  <div>
                    <p className="text-sm text-muted-500">Email</p>
                    <p className="font-medium text-muted-900">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-muted-500" />
                  <div>
                    <p className="text-sm text-muted-500">Phone</p>
                    <p className="font-medium text-muted-900">{user?.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Saved Addresses */}
          <div className="bg-white rounded-xl border border-muted-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-muted-900">Saved Addresses</h2>
              <Button
                onClick={() => setShowAddAddress(true)}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </div>

            {showAddAddress && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border border-muted-200 rounded-lg p-4 mb-4"
              >
                <h3 className="font-medium text-muted-900 mb-4">Add New Address</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Address Type"
                      placeholder="e.g., Home, Office"
                    />
                    <Input
                      label="Full Address"
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      placeholder="Enter city"
                    />
                    <Input
                      label="State"
                      placeholder="Enter state"
                    />
                    <Input
                      label="Pincode"
                      placeholder="Enter pincode"
                    />
                  </div>
                  <Input
                    label="Phone Number"
                    placeholder="Enter phone number"
                  />
                  <div className="flex space-x-3">
                    <Button size="sm">
                      <Check className="w-4 h-4 mr-2" />
                      Save Address
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAddAddress(false)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="border border-muted-200 rounded-lg p-4">
                  {editingAddress?.id === address.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Address Type"
                          defaultValue={address.type}
                        />
                        <Input
                          label="Full Address"
                          defaultValue={`${address.street}, ${address.area}`}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          defaultValue={address.city}
                        />
                        <Input
                          label="State"
                          defaultValue={address.state}
                        />
                        <Input
                          label="Pincode"
                          defaultValue={address.pincode}
                        />
                      </div>
                      <Input
                        label="Phone Number"
                        defaultValue={address.phone}
                      />
                      <div className="flex space-x-3">
                        <Button 
                          size="sm"
                          onClick={() => handleAddressSave(address.id)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleAddressCancel}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-muted-500 mt-1" />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-muted-900">
                              {address.type}
                            </span>
                            {address.isDefault && (
                              <span className="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-600">
                            {address.street}, {address.area}<br />
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-sm text-muted-500 mt-1">
                            Phone: {address.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddressEdit(address)}
                          className="p-2 hover:bg-muted-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-muted-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-2 hover:bg-error-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-error-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-muted-200 p-6">
            <h3 className="font-semibold text-muted-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.location.href = '/orders'}
              >
                <Package className="w-4 h-4 mr-2" />
                View Orders
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.location.href = '/products'}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.location.href = '/help'}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Get Help
              </Button>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl border border-muted-200 p-6">
            <h3 className="font-semibold text-muted-900 mb-4">Account Settings</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-muted-50 rounded-lg transition-colors">
                <span className="text-sm font-medium text-muted-900">Change Password</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-muted-50 rounded-lg transition-colors">
                <span className="text-sm font-medium text-muted-900">Notification Settings</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-muted-50 rounded-lg transition-colors">
                <span className="text-sm font-medium text-muted-900">Privacy Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
