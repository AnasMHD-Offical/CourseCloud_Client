import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
function CourseCard({title,rating,reviews,price,naviate,i}) {
  return (
    <>
      <Card className="overflow-hidden w-72 sm:min-w-80 transition-all duration-300 hover:shadow-lg group">
        <CardContent className="p-0">
          <div className="relative h-48 overflow-hidden">
            <img
              src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg"
              alt={`Course ${i}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2 bg-transparent rounded-full p-2">
              <Heart className="w-5 h-5 text-center text-white drop-shadow" />
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              Complete Life coach certification course 2024
            </h3>
            <div className="flex items-center text-sm text-yellow-500 mb-2">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span>4.5</span>
              <span className="text-gray-500 ml-1">(2.3k reviews)</span>
            </div>
            <div className="font-bold text-xl text-primary">Rs. 799</div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full rounded-full  text-white bg-gradient-to-r from-primary to-purple-600 hover:bg-primary-dark transition-colors duration-300">
            Enroll Now
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default CourseCard;
