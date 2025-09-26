import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  ArrowRight,
  Heart,
  Share2,
  BookOpen
} from 'lucide-react'
import { apiClient } from '../services/api'
import Button from '../components/Button'

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => apiClient.getArticles(),
  })

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'Nutrition', name: 'Nutrition' },
    { id: 'Health Tips', name: 'Health Tips' },
    { id: 'Medicines', name: 'Medicines' },
    { id: 'Wellness', name: 'Wellness' }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date)
      case 'oldest':
        return new Date(a.date) - new Date(b.date)
      case 'popular':
        return b.readTime - a.readTime // Assuming readTime represents popularity
      default:
        return 0
    }
  })

  const handleArticleClick = (articleId) => {
    window.location.href = `/articles/${articleId}`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-muted-900 mb-4">Health Articles</h1>
        <p className="text-lg text-muted-600 mb-8">
          Stay informed with expert health tips and wellness advice
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-muted-200 p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-muted-100 text-muted-700 hover:bg-muted-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-muted-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : sortedArticles.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-900 mb-2">No articles found</h3>
          <p className="text-muted-600 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => {
            setSearchQuery('')
            setSelectedCategory('all')
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-muted-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleArticleClick(article.id)}
            >
              {/* Article Image */}
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-primary-600" />
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-muted-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-muted-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-sm text-muted-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <span>{formatDate(article.date)}</span>
                </div>

                {/* Article Actions */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-muted-100 rounded-lg transition-colors">
                      <Heart className="w-4 h-4 text-muted-500" />
                    </button>
                    <button className="p-2 hover:bg-muted-100 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-muted-500" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Featured Article */}
      {articles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-4 inline-block">
                Featured Article
              </span>
              <h2 className="text-2xl font-bold mb-4">
                {articles[0]?.title || '10 Essential Vitamins for Daily Health'}
              </h2>
              <p className="text-lg opacity-90 mb-6">
                {articles[0]?.excerpt || 'Discover the most important vitamins your body needs every day for optimal health and wellness.'}
              </p>
              <Button
                variant="outline"
                className="bg-white text-primary-600 hover:bg-muted-50"
                onClick={() => handleArticleClick(articles[0]?.id || 1)}
              >
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-24 h-24 opacity-50" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Articles
