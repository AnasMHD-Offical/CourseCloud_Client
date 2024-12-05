import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Star, ChevronRight, Home } from "lucide-react";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import ContainerSkelton from "@/Components/fallback/ContainerSkeleton";
import Quiz from "./Quiz_UI/QuizMain";

const quizzes = [
  {
    id: 1,
    title: "10 Easy HTML Questions",
    time: "12:45",
    score: 10,
    description: "This is only for increasing your knowledge limits.",
    difficulty: "easy",
  },
  {
    id: 2,
    title: "10 Intermediate CSS Questions",
    time: "12:45",
    score: 10,
    description: "Challenge yourself with more advanced concepts.",
    difficulty: "medium",
  },
  {
    id: 3,
    title: "10 Hard JS Questions",
    time: "12:45",
    score: 10,
    description: "Test your expertise with complex problems.",
    difficulty: "hard",
  },
  // Add more quizzes as needed
];

const difficulty = ["easy", "medium", "hard"];

export default function QuizConponentOverview({ topic, title, For }) {
  const [easyQuiz, setEasyQuiz] = useState([]);
  const [intermediateQuiz, setIntermediateQuiz] = useState([]);
  const [hardQuiz, setHardQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const get_quizes = async () => {
    try {
      const response = await axios_instance.get("api/create_quizess", {
        params: {
          topic: topic,
        },
      });

      const { success, quizzes } = response?.data;
      if (success) {
        const quiz = JSON.parse(quizzes);
        console.log(quiz);
        setEasyQuiz(quiz.easy);
        setIntermediateQuiz(quiz.medium);
        setHardQuiz(quiz.hard);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleQuizCompletion = (val) => {
    setQuizCompleted(val === false ? true : false);
  };

  useEffect(() => {
    setIsLoading(true)
    get_quizes();
  }, [quizCompleted]);

  return (
    <motion.div>
      <Tabs defaultValue="easy" className="mb-6">
        <TabsList className="flex justify-between text-white mb-4 w-64 h-9 rounded-lg bg-gradient-to-r from-purple-900 to-purple-600">
          {difficulty.map((val, index) => (
            <TabsTrigger className="px-2 rounded-md" value={val}>
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="easy">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {quizzes
              .filter((quiz) => quiz.difficulty === "easy")
              .map((quiz) => (
                <Card
                  key={quiz.id}
                  className="border flex flex-col md:flex-row md:justify-between md:items-start rounded-lg shadow-sm shadow-purple-100 bg-gradient-to-r to-blue-50 from-purple-50"
                >
                  <CardContent className="p-4">
                    <h3 className="text-xl lg:text-2xl font-bold bg-clip-text bg-gradient-to-r from-primary to-purple-800 text-transparent">
                      {`${
                        easyQuiz?.length || 10
                      }  Easy Questions from ${title}`}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.time}</span>
                      <Star className="h-4 w-4" />
                      <span>Total score: {quiz.score}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {quiz.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4">
                    {isLoading ? (
                      "Ai is createing quiz for you wait for it....."
                    ) : (
                      <Quiz
                        questions={easyQuiz}
                        difficulty={"easy"}
                        title={title}
                        handleQuizCompletion={handleQuizCompletion}
                      />
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="medium">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {quizzes
              .filter((quiz) => quiz.difficulty === "medium")
              .map((quiz) => (
                <Card
                  key={quiz.id}
                  className="border flex flex-col md:flex-row md:justify-between md:items-start rounded-lg shadow-sm shadow-purple-100 bg-gradient-to-r to-blue-50 from-purple-50"
                >
                  <CardContent className="p-4">
                    <h3 className="text-xl lg:text-2xl font-bold bg-clip-text bg-gradient-to-r from-primary to-purple-800 text-transparent">
                      {`${intermediateQuiz?.length} Medium Questions from ${title}`}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.time}</span>
                      <Star className="h-4 w-4" />
                      <span>Total score: {quiz.score}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {quiz.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4">
                    {isLoading ? (
                      "Ai is createing quiz for you wait for it....."
                    ) : (
                      <Quiz
                        questions={intermediateQuiz}
                        difficulty={"medium"}
                        title={title}
                        handleQuizCompletion={handleQuizCompletion}
                      />
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="hard">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {quizzes
              .filter((quiz) => quiz.difficulty === "hard")
              .map((quiz) => (
                <Card
                  key={quiz.id}
                  className="border flex flex-col md:flex-row md:justify-between md:items-start rounded-lg shadow-sm shadow-purple-100 bg-gradient-to-r to-blue-50 from-purple-50"
                >
                  <CardContent className="p-4">
                    <h3 className="text-xl lg:text-2xl font-bold bg-clip-text bg-gradient-to-r from-primary to-purple-800 text-transparent">
                      {`${hardQuiz.length} Hard Questions from ${title}`}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.time}</span>
                      <Star className="h-4 w-4" />
                      <span>Total score: {quiz.score}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {quiz.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4">
                    {isLoading ? (
                      "Ai is createing quiz for you wait for it....."
                    ) : (
                      <Quiz
                        questions={hardQuiz}
                        difficulty={"hard"}
                        title={title}
                        handleQuizCompletion={handleQuizCompletion}
                      />
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
