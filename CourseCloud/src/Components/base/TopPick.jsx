import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
function TopPick({topCoursePick}) {
  return (
    <>
      <section className="py-16 md:py-24 px-4 xl:px-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Our top pick for you
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardContent className="p-8 flex flex-col md:flex-row items-center">
                <div className="md:w-[38.2%] mb-6 md:mb-0">
                  <motion.div whileHover={{ scale: 1.05 }} className="relative">
                    <img
                      src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg"
                      alt="Training course"
                      width={400}
                      height={300}
                      className="rounded-2xl shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-lg shadow-lg">
                      <p className="text-lg font-bold">4.9</p>
                      <p className="text-sm">Rating</p>
                    </div>
                  </motion.div>
                </div>
                <div className="md:w-[61.8%] md:pl-12">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Complete Full-stack Development course 2024
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Master web development with our comprehensive course. Learn
                    front-end, back-end, and everything in between.
                  </p>
                  <div className="font-bold text-3xl mb-6 text-primary">
                    Rs. 7999
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-3 text-lg bg-primary hover:bg-primary-dark transition-colors duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default TopPick;
