import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Sparkles, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { LucideIcon } from "lucide-react"

type NavItem = {
  label: string
  to: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Predict", to: "/predict", icon: Sparkles },
  { label: "About", to: "/about", icon: Info },
]

const containerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/60"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <Link to="/" className="flex items-center gap-2">
            <motion.span
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            >
              🍎 Fruit Price AI
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          className="hidden items-center gap-1 md:flex"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.to
            return (
              <motion.div key={item.to} className="relative">
                <Button
                  asChild
                  variant="ghost"
                  className={`relative px-4 py-2 text-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Link to={item.to} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-rose-500" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute left-4 right-4 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            )
          })}
        </motion.div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="hover:bg-white/40 dark:hover:bg-slate-800/60"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-white/40 bg-white/80 backdrop-blur-md shadow-inner dark:border-slate-800/60 dark:bg-slate-900/80"
          >
            <div className="flex flex-col items-center gap-2 px-6 py-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = location.pathname === item.to
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3, ease: "easeOut" }}
                    className="w-full"
                  >
                    <Button
                      asChild
                      variant="ghost"
                      className={`w-full justify-center px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/60 dark:hover:bg-slate-800/60 ${
                        isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <Link to={item.to} className="flex items-center justify-center gap-2">
                        <Icon className="h-4 w-4 text-rose-500" />
                        <span>{item.label}</span>
                      </Link>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
