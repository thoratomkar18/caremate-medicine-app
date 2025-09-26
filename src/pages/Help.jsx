import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  FileText,
  CreditCard,
  Truck,
  Package,
  User,
  Shield
} from 'lucide-react'
import Button from '../components/Button'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqCategories = [
    {
      id: 'orders',
      name: 'Orders & Delivery',
      icon: <Package className="w-5 h-5" />,
      faqs: [
        {
          question: 'How can I track my order?',
          answer: 'You can track your order by going to the Orders section in your profile. Click on "Track Order" for the specific order you want to track.'
        },
        {
          question: 'What are the delivery charges?',
          answer: 'Delivery is free for orders above ₹500. For orders below ₹500, a delivery charge of ₹50 applies.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Standard delivery takes 2-3 business days. Express delivery is available for urgent orders within 24 hours.'
        }
      ]
    },
    {
      id: 'payments',
      name: 'Payments & Billing',
      icon: <CreditCard className="w-5 h-5" />,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.'
        },
        {
          question: 'Is it safe to pay online?',
          answer: 'Yes, all payments are processed through secure, encrypted gateways. We do not store your payment information.'
        },
        {
          question: 'Can I get a refund?',
          answer: 'Yes, we offer refunds for unopened products within 7 days of delivery. Contact our support team for assistance.'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Profile',
      icon: <User className="w-5 h-5" />,
      faqs: [
        {
          question: 'How do I update my profile information?',
          answer: 'Go to your Profile section and click on "Edit" next to Personal Information. Make your changes and save.'
        },
        {
          question: 'How do I change my password?',
          answer: 'Go to Profile > Account Settings > Change Password. Enter your current password and new password.'
        },
        {
          question: 'Can I have multiple addresses?',
          answer: 'Yes, you can add multiple addresses for home, office, etc. Set one as default for quick checkout.'
        }
      ]
    },
    {
      id: 'products',
      name: 'Products & Medicines',
      icon: <Shield className="w-5 h-5" />,
      faqs: [
        {
          question: 'Are all medicines genuine?',
          answer: 'Yes, we only sell 100% genuine medicines from verified manufacturers and licensed pharmacies.'
        },
        {
          question: 'Do you require a prescription?',
          answer: 'Prescription medicines require a valid prescription. Over-the-counter medicines can be ordered without a prescription.'
        },
        {
          question: 'What if a product is out of stock?',
          answer: 'We will notify you if a product is out of stock and suggest similar alternatives. You can also set up notifications for restocking.'
        }
      ]
    }
  ]

  const contactMethods = [
    {
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: <Phone className="w-6 h-6" />,
      contact: '+91 77158 15914',
      availability: '24/7 Available',
      color: 'text-primary-600 bg-primary-100'
    },
    {
      title: 'Email Support',
      description: 'Send us an email with your query',
      icon: <Mail className="w-6 h-6" />,
      contact: 'support@caremate.com',
      availability: 'Response within 2 hours',
      color: 'text-success-600 bg-success-100'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: <MessageCircle className="w-6 h-6" />,
      contact: 'Start Chat',
      availability: '9 AM - 9 PM',
      color: 'text-accent-600 bg-accent-100'
    }
  ]

  const filteredFaqs = faqCategories.filter(category => 
    selectedCategory === 'all' || category.id === selectedCategory
  )

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-muted-900 mb-4">How can we help you?</h1>
        <p className="text-lg text-muted-600 mb-8">
          Find answers to common questions or get in touch with our support team
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* FAQ Categories */}
        <div className="lg:col-span-3">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-muted-100 text-muted-700 hover:bg-muted-200'
                }`}
              >
                All Categories
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-muted-100 text-muted-700 hover:bg-muted-200'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {filteredFaqs.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-muted-200 p-6"
              >
                <h2 className="text-lg font-semibold text-muted-900 mb-4 flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </h2>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <div key={index} className="border border-muted-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(`${category.id}-${index}`)}
                        className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-muted-50 transition-colors"
                      >
                        <span className="font-medium text-muted-900">{faq.question}</span>
                        {expandedFaq === `${category.id}-${index}` ? (
                          <ChevronDown className="w-5 h-5 text-muted-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-500" />
                        )}
                      </button>
                      
                      {expandedFaq === `${category.id}-${index}` && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-muted-600">{faq.answer}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-muted-200 p-6">
            <h3 className="text-lg font-semibold text-muted-900 mb-4">Contact Support</h3>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-muted-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${method.color}`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-muted-900 mb-1">{method.title}</h4>
                      <p className="text-sm text-muted-600 mb-2">{method.description}</p>
                      <p className="text-sm font-medium text-primary-600 mb-1">{method.contact}</p>
                      <p className="text-xs text-muted-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {method.availability}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-muted-200 p-6">
            <h3 className="text-lg font-semibold text-muted-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-muted-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-muted-500" />
                  <span className="text-sm font-medium text-muted-900">Terms & Conditions</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-muted-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-muted-500" />
                  <span className="text-sm font-medium text-muted-900">Privacy Policy</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-muted-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-4 h-4 text-muted-500" />
                  <span className="text-sm font-medium text-muted-900">About Us</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
