import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import CourseCard from './CourseCard'

function CourseContainer({title,cards_data}) {
  return (
    <>
    <section className="py-16 md:py-24 px-2 sm:px-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              {title}
            </h2>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
          <div 
          // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          className="flex overflow-x-scroll h-full pb-8 hide-scroll-bar gap-6"
          
          >
            {[1, 2, 3, 4,5,6,7,8,9].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-nowrap "
              >
                <CourseCard i={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default CourseContainer