import React, { useState, useEffect } from 'react';
import { Download, Facebook, Twitter, Video, Instagram, Loader2, Info, Moon, Sun, Menu, X as XIcon } from 'lucide-react';

type Platform = 'tiktok' | 'facebook' | 'x' | 'instagram';

interface DownloadResponse {
  message: string;
  file_path: string;
  download_url: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDownload = async (platform: Platform) => {
    setLoading(true);
    setError('');
    setDownloadUrl('');

    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(
        `https://freevideo-production.up.railway.app/download/${platform}?url=${encodedUrl}`,
        {
          headers: {
            'accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download video');
      }

      const data: DownloadResponse = await response.json();
      
      // Extrair o nome do arquivo do caminho
      const filename = data.file_path.split('/').pop() || `${platform}_video.mp4`;
      
      // Usar a nova rota de download
      const downloadUrl = `https://freevideo-production.up.railway.app/download/${filename}`;
      
      // Iniciar o download diretamente
      window.location.href = downloadUrl;
      
      setDownloadUrl(downloadUrl);
    } catch (err) {
      setError('Failed to download video. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Função para detectar a plataforma baseada na URL
  const detectPlatform = (url: string): Platform | null => {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch')) {
      return 'facebook';
    }
    if (urlLower.includes('instagram.com')) {
      return 'instagram';
    }
    if (urlLower.includes('tiktok.com')) {
      return 'tiktok';
    }
    if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
      return 'x';
    }
    return null;
  };

  // Atualizar o handler do input para garantir que funcione
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    // Detectar a plataforma com um pequeno delay
    setTimeout(() => {
      setDetectedPlatform(detectPlatform(newUrl));
    }, 100);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setDetectedPlatform(detectPlatform(text));
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        {/* App Bar */}
        <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 dark:bg-black/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-white">Video Downloader</h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={() => scrollToSection('home')} className="text-white hover:text-purple-200 transition">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-white hover:text-purple-200 transition">About</button>
                <button onClick={() => scrollToSection('faq')} className="text-white hover:text-purple-200 transition">FAQ</button>
                <button onClick={() => scrollToSection('contact')} className="text-white hover:text-purple-200 transition">Contact</button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-white/10 transition mr-2"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  {mobileMenuOpen ? (
                    <XIcon className="w-6 h-6 text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-md border-b border-white/20 dark:bg-black/10">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition"
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 pt-24">
          {/* Home Section */}
          <section id="home" className="py-8">
            {/* Ad Space - Top */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-4 mb-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Advertisement</p>
              {/* Add your Google AdSense code here */}
            </div>

            {/* Main Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Download Videos for Free
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Download videos from TikTok, Instagram, Facebook, and X (Twitter) quickly and easily.
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Video URL
                </label>
                <div className="relative flex gap-2">
                  {/* Container com gradiente animado */}
                  <div className="relative flex-1 p-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-lg animate-gradient-xy overflow-hidden group">
                    {/* Efeito de brilho */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {/* Input com efeito de respiração */}
                    <input
                      type="text"
                      id="url"
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                               transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25"
                      placeholder="Paste or type video URL here..."
                      value={url}
                      onChange={handleUrlChange}
                      onPaste={(e) => {
                        const text = e.clipboardData.getData('text');
                        setUrl(text);
                        setDetectedPlatform(detectPlatform(text));
                      }}
                    />
                  </div>

                  {/* Botão de colar com efeito hover melhorado */}
                  <button
                    onClick={handlePaste}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg
                             hover:from-purple-700 hover:to-pink-600 transition-all duration-300
                             transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50
                             flex items-center gap-2 font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Paste
                  </button>
                </div>
              </div>

              {/* Substituir a grid de botões por um botão dinâmico */}
              {detectedPlatform && (
                <div className="mb-6">
                  {detectedPlatform === 'tiktok' && (
                    <button
                      onClick={() => handleDownload('tiktok')}
                      disabled={loading || !url}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Video className="w-5 h-5" />
                      Download from TikTok
                    </button>
                  )}

                  {detectedPlatform === 'instagram' && (
                    <button
                      onClick={() => handleDownload('instagram')}
                      disabled={loading || !url}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Instagram className="w-5 h-5" />
                      Download from Instagram
                    </button>
                  )}

                  {detectedPlatform === 'facebook' && (
                    <button
                      onClick={() => handleDownload('facebook')}
                      disabled={loading || !url}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Facebook className="w-5 h-5" />
                      Download from Facebook
                    </button>
                  )}

                  {detectedPlatform === 'x' && (
                    <button
                      onClick={() => handleDownload('x')}
                      disabled={loading || !url}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Twitter className="w-5 h-5" />
                      Download from X (Twitter)
                    </button>
                  )}
                </div>
              )}

              {!detectedPlatform && url && (
                <div className="bg-yellow-50 dark:bg-yellow-900/50 p-4 rounded-lg mb-6">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    Please enter a valid URL from TikTok, Instagram, Facebook, or X (Twitter)
                  </p>
                </div>
              )}

              {loading && (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Processing your download...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {downloadUrl && (
                <div className="bg-green-50 dark:bg-green-900/50 p-6 rounded-lg">
                  <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">Download Started!</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Se o download não começar automaticamente, 
                    <a
                      href={downloadUrl}
                      className="text-purple-600 dark:text-purple-400 underline ml-1"
                    >
                      clique aqui
                    </a>
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">About Our Service</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">
                  Our video downloader service provides a fast, reliable, and free way to download videos from your favorite social media platforms. We support multiple platforms including TikTok, Instagram, Facebook, and X (Twitter), making it easy to save and share content you love.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  We prioritize user privacy and security, ensuring that no personal information is stored or shared. Our service is completely web-based, requiring no software installation or registration.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">Is it free to download videos?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Yes, our service is completely free to use.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">What platforms are supported?</h3>
                  <p className="text-gray-600 dark:text-gray-300">We support TikTok, Instagram, Facebook, and X (Twitter).</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">Is it safe to use this service?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Yes, our service is secure and doesn't store any personal information.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Substituir a seção de contato por "Why Choose Our Service" */}
          <section id="features" className="py-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
                Why Choose Our Service
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Feature Card 1 */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 
                              p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Fast Downloads</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Download your favorite videos instantly with our high-speed servers
                  </p>
                </div>

                {/* Feature Card 2 */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 
                              p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Easy to Use</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Simply paste your video URL and click download - no registration required
                  </p>
                </div>

                {/* Feature Card 3 */}
                <div className="bg-gradient-to-br from-pink-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 
                              p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Multiple Platforms</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Support for all major social media platforms in one place
                  </p>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-gray-600">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 mt-1">Free Service</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 mt-1">Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                    4+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 mt-1">Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    Fast
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 mt-1">Processing</div>
                </div>
              </div>
            </div>
          </section>

          {/* Ad Space - Bottom */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-4 my-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Advertisement</p>
            {/* Add your Google AdSense code here */}
          </div>
        </main>

        <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-white/80">
              <p className="mb-2">© 2024 Video Downloader. All rights reserved.</p>
              <p className="text-sm">
                This service is for personal use only. Please respect copyright laws and terms of service.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;