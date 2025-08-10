import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    blog: [
      { name: 'Recent Posts', href: '/blog' },
      { name: 'Categories', href: '/categories' },
    ],
    fitness: [
      { name: 'Workout Routines', href: '/categories/workout-routines' },
      { name: 'Nutrition', href: '/categories/nutrition' },
      { name: 'Mental Health', href: '/categories/mental-health' },
    ],
    company: [
      { name: 'About Us', href: 'https://streaknfit.com' },
      { name: 'Contact', href: 'https://streaknfit.com' },
      { name: 'Privacy Policy', href: 'https://streaknfit.com' },
      { name: 'Terms of Service', href: 'https://streaknfit.com' },
    ],
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="inline-block">
                <svg viewBox="0 0 100 100" className="h-10 w-10" preserveAspectRatio="xMidYMid meet">
                  <path d="M 17 95 Q 63 74 80 25 L 86 28 L 83 6 L 64 17 L 70 20 Q 54 69 17 95 Z" fill="#79fcb6" stroke="none"></path>
                  <path d="M 29 59 C 58 39 60 79 48 93 Q 66 78 62 59 Q 71 48 73 29 Q 65 48 57 50 Q 42 40 29 59 Z" fill="#42a7f5" stroke="none"></path>
                  <circle cx="52" cy="38" r="7" fill="#42a7f5"></circle>
                </svg>
              </span>
              <span className="font-bold text-xl">StreakNFit</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Your ultimate destination for fitness inspiration, workout routines, and healthy living tips.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.367-1.307-.92-.818-1.307-1.964-1.307-3.261 0-1.297.387-2.443 1.307-3.261.919-.818 2.07-1.307 3.367-1.307 1.297 0 2.448.49 3.367 1.307.92.818 1.307 1.964 1.307 3.261 0 1.297-.387 2.443-1.307 3.261-.919.818-2.07 1.307-3.367 1.307z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Blog</h3>
            <ul className="space-y-2">
              {footerLinks.blog.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Fitness</h3>
            <ul className="space-y-2">
              {footerLinks.fitness.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-400 bg-gray-800/60 border border-gray-700 rounded-md p-3">
              <span className="font-semibold text-secondary">Note:</span> Fitness pages are currently under construction.
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} StreakNFit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}