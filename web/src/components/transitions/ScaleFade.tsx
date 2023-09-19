import { AnimatePresence, motion } from "framer-motion"

const ScaleFade: React.FC<{
  from?: "left" | "right"
  visible: boolean
  children: React.ReactNode
  onExitComplete?: () => void
}> = ({ visible, children, onExitComplete, from }) => {
  let initialX = 0
  if (from) {
    initialX = from === "right" ? 300 : -300
  }

  return (
    <>
      <AnimatePresence onExitComplete={onExitComplete}>
        {visible && (
          <motion.div
            initial={{ x: initialX, opacity: 0, scale: 0.95 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              transition: { duration: 0.1, ease: [0, 0, 0.1, 1] },
            }}
            exit={{
              x: initialX,
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.1, ease: [0.4, 0, 1, 1] },
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ScaleFade
