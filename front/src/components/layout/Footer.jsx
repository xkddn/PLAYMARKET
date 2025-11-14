import { Link } from 'react-router-dom'
import { Gamepad2, Github, Twitter, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gaming-dark border-t border-gaming-purple/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="w-8 h-8 text-gaming-purple" />
              <span className="text-xl font-gaming font-bold text-gradient">
                PLAYMARKET
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Votre marketplace gaming ultime. Trouvez, achetez et jouez aux meilleurs jeux.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gaming-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gaming-purple transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gaming-purple transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gaming-purple transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Tous les jeux
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Centre d&apos;aide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Remboursements
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gaming-purple/20 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 PLAYMARKET. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

