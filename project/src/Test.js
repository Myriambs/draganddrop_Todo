import React from 'react'
import { motion } from "framer-motion";

const Test = () => {
  return (
<motion.div 
  className="task"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Task 1
</motion.div>  )
}

export default Test