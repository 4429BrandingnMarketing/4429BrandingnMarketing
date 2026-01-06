import React, { useState } from 'react'
import { Sparkles, Music, TrendingUp, ShoppingCart, Users, Brain, Mic, Eye, Zap, Download, Globe, Check, ArrowRight } from 'lucide-react'

export default function LandingPage({ onGetStarted }) {
  const [selectedPlan, setSelectedPlan] = useState('pro')

  const features = [
    {
      icon: Music,
      title: 'Music Production & Licensing',
      description: 'Manage your catalog, track royalties, and find licensing opportunities with AI-powered agents.'
    },
    {
      icon: TrendingUp,
      title: 'Marketing & Distribution',
      description: 'Multi-platform marketing automation, analytics, and campaign management for all your releases.'
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce & Merch',
      description: 'Complete storefront for merch, tickets, and digital products with inventory management.'
    },
    {
      icon: Users,
      title: 'Brand & Talent Management',
      description: 'Manage your brand identity, collaborations, and talent roster from one central hub.'
    },
    {
      icon: Brain,
      title: '15 AI Agents',
      description: 'Autonomous agents handle licensing, marketing, content creation, and business intelligence.'
    },
    {
      icon: Sparkles,
      title: 'Gemini 2.0 Assistant',
      description: 'Multimodal AI with voice, vision, and autonomous thinking - your 24/7 business co-pilot.'
    }
  ]

  const plans = [
    {
      id: 'web',
      name: 'Web Starter',
      price: 29,
      period: 'month',
      description: 'Perfect for solo artists and producers',
      features: [
        '4 Business Quadrants Dashboard',
        '3 AI Agents (limited)',
        'Gemini Assistant (100 queries/month)',
        'Web Access Only',
        'Email Support',
        'Auto-Updates'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      id: 'pro',
      name: 'Desktop Pro',
      price: 99,
      period: 'one-time',
      description: 'For record labels and agencies',
      features: [
        'Everything in Web Starter',
        '15 AI Agents (unlimited)',
        'Gemini Assistant (unlimited)',
        'Native Desktop App',
        'Offline Mode',
        'Auto-Claude Coding Agents',
        'Priority Support',
        'Lifetime Updates'
      ],
      cta: 'Download Now',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 499,
      period: 'month',
      description: 'For major labels and corporations',
      features: [
        'Everything in Desktop Pro',
        'Multi-User Support',
        'White-Label Options',
        'API Access',
        'Custom Integrations',
        'Dedicated Support',
        'SLA Guarantee',
        'Custom Training'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const capabilities = [
    {
      icon: Mic,
      title: 'Voice Control',
      description: 'Talk naturally to your AI assistant with real-time audio processing'
    },
    {
      icon: Eye,
      title: 'Vision Mode',
      description: 'Share your screen or camera - AI sees and understands your work'
    },
    {
      icon: Zap,
      title: 'Autonomous Thinking',
      description: 'Self-directed AI that proactively suggests improvements and insights'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Visionary OS</h1>
            </div>

            {/* Headline */}
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your Music Empire
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Operating System
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-powered platform for music production, licensing, marketing, and e-commerce.
              Everything you need to build and scale your music business.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-purple-500/50"
              >
                Launch App <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Desktop
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>15 AI Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Desktop + Web</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Complete Business Platform
          </h3>
          <p className="text-xl text-gray-400">
            Four interconnected quadrants covering every aspect of your music empire
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition group"
            >
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl w-fit mb-4 group-hover:scale-110 transition">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gemini AI Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl my-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 font-semibold mb-4">
            <Sparkles className="w-5 h-5" />
            Powered by Gemini 2.0
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Next-Generation AI Assistant
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            True multimodal intelligence with voice, vision, and autonomous thinking
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="text-center p-8"
            >
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
                <capability.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                {capability.title}
              </h4>
              <p className="text-gray-400">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h3>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your ambitions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-8 rounded-2xl border-2 transition ${
                plan.popular
                  ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-pink-900/20 scale-105'
                  : 'border-white/10 bg-white/5 hover:border-purple-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof / Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              15
            </div>
            <div className="text-gray-400">AI Agents</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              4
            </div>
            <div className="text-gray-400">Business Modules</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              24/7
            </div>
            <div className="text-gray-400">AI Assistance</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              100%
            </div>
            <div className="text-gray-400">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="p-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Empire?
          </h3>
          <p className="text-xl text-purple-100 mb-8">
            Join the next generation of music entrepreneurs powered by AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition flex items-center gap-2"
            >
              Launch App Now <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/30 transition flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Desktop
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Sparkles className="w-5 h-5" />
              <span>© 2024 Red Vision Music. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Support</a>
              <a href="https://redvisionmusic.com" className="hover:text-white transition">
                Red Vision Music
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
