import React from 'react'
import { motion } from 'framer-motion'

export default function SectionReveal({children, className=''}){
  return (
    <motion.section className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.section>
  )
}
