'use client'

import { useState } from 'react'
import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'
import GitHubSvg from '@/assets/svg/github.svg'

export const Footer = () => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://stablepay.example.com'
  const shareText = 'Check out StablePay - The future of stable digital payments!'

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    }

    if (platform in urls) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
    setShowShareMenu(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowShareMenu(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-white/15">
      <div className="container px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-8 border-b border-gray-200 dark:border-white/15">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <img src="/favicon.ico" alt="StablePay Logo" className="h-8 w-8" />
              <div className="font-bold text-lg text-gray-900 dark:text-white">StablePay</div>
            </div>
            <p className="text-sm text-gray-600 dark:text-white/60 max-w-xs">
              An open-source SDK enabling merchants to accept payments in Djed stablecoins with ease.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 items-center pt-2">
              <a href="https://x.com/StabilityNexus" target="_blank" rel="noopener noreferrer" aria-label="Stability Nexus on X" className="hover:scale-110 transition-transform">
                <XSocial className="w-5 h-5 text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition" />
              </a>
              <a href="https://github.com/DjedAlliance/StablePay-LandingPage" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="hover:scale-110 transition-transform">
                <GitHubSvg className="w-5 h-5 text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition" />
              </a>
              <a href="https://www.youtube.com/@StabilityNexus" target="_blank" rel="noopener noreferrer" aria-label="Stability Nexus on YouTube" className="hover:scale-110 transition-transform">
                <YTSocial className="w-5 h-5 text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <a href="#features" className="text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition">
                Features
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition">
                Documentation
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition">
                Blog
              </a>
              <a href="https://github.com/DjedAlliance/StablePay-LandingPage" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition">
                GitHub
              </a>
            </nav>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Community</h3>
            <div className="space-y-3 mb-4">
              <a href="https://x.com/StabilityNexus" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition block">
                Twitter/X
              </a>
              <a href="https://www.youtube.com/@StabilityNexus" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition block">
                YouTube
              </a>
              <a href="https://github.com/DjedAlliance" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition block">
                Djed Alliance
              </a>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium transition shadow-md hover:shadow-lg flex items-center gap-2"
                aria-label="Share StablePay"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-10">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Share on X
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Share on Facebook
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-white/50 text-center sm:text-left">
              © {new Date().getFullYear()} StablePay. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs sm:text-sm text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
