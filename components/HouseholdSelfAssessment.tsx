"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  Heart,
  Home,
  Users,
  Droplets,
  Utensils,
  Award,
  CheckCircle,
  TrendingUp,
  Brain,
  Star,
  Gift,
} from "lucide-react"

interface AssessmentSection {
  id: string
  title: string
  icon: any
  questions: AssessmentQuestion[]
  completed: boolean
  score?: number
}

interface AssessmentQuestion {
  id: string
  question: string
  type: "scale" | "boolean" | "text" | "multiple"
  options?: string[]
  value?: any
  required: boolean
}

export default function HouseholdSelfAssessment() {
  const [currentSection, setCurrentSection] = useState(0)
  const [assessmentData, setAssessmentData] = useState<any>({})
  const [overallScore, setOverallScore] = useState(0)
  const [completedSections, setCompletedSections] = useState<string[]>([])

  const assessmentSections: AssessmentSection[] = [
    {
      id: "basic_info",
      title: "Basic Information",
      icon: Users,
      completed: false,
      questions: [
        {
          id: "household_size",
          question: "How many people live in your household?",
          type: "scale",
          value: [2],
          required: true,
        },
        {
          id: "primary_language",
          question: "What is your primary language?",
          type: "text",
          value: "",
          required: true,
        },
        {
          id: "contact_preference",
          question: "How would you prefer to be contacted?",
          type: "multiple",
          options: ["Phone", "Text", "Email", "In-person"],
          value: [],
          required: true,
        },
      ],
    },
    {
      id: "health_wellness",
      title: "Health & Wellness",
      icon: Heart,
      completed: false,
      questions: [
        {
          id: "health_conditions",
          question: "Do you or anyone in your household have chronic health conditions?",
          type: "boolean",
          value: false,
          required: true,
        },
        {
          id: "medication_access",
          question: "How confident are you in accessing medications during an emergency? (1-10)",
          type: "scale",
          value: [7],
          required: true,
        },
        {
          id: "healthcare_access",
          question: "Rate your access to healthcare services (1-10)",
          type: "scale",
          value: [6],
          required: true,
        },
        {
          id: "mobility_needs",
          question: "Does anyone in your household have mobility or accessibility needs?",
          type: "boolean",
          value: false,
          required: true,
        },
      ],
    },
    {
      id: "food_security",
      title: "Food Security",
      icon: Utensils,
      completed: false,
      questions: [
        {
          id: "food_supply",
          question: "How many days of food do you typically have stored? (1-14 days)",
          type: "scale",
          value: [3],
          required: true,
        },
        {
          id: "cooking_ability",
          question: "Can you prepare meals without electricity?",
          type: "boolean",
          value: false,
          required: true,
        },
        {
          id: "dietary_restrictions",
          question: "Does anyone in your household have dietary restrictions or allergies?",
          type: "text",
          value: "",
          required: false,
        },
        {
          id: "food_assistance",
          question: "Are you currently receiving food assistance?",
          type: "boolean",
          value: false,
          required: true,
        },
      ],
    },
    {
      id: "housing_safety",
      title: "Housing & Safety",
      icon: Home,
      completed: false,
      questions: [
        {
          id: "housing_stability",
          question: "How stable is your current housing situation? (1-10)",
          type: "scale",
          value: [8],
          required: true,
        },
        {
          id: "emergency_supplies",
          question: "Do you have emergency supplies (flashlight, batteries, first aid)?",
          type: "boolean",
          value: true,
          required: true,
        },
        {
          id: "backup_power",
          question: "Do you have backup power sources?",
          type: "boolean",
          value: false,
          required: true,
        },
        {
          id: "safe_space",
          question: "Do you have a safe space to shelter during emergencies?",
          type: "boolean",
          value: true,
          required: true,
        },
      ],
    },
    {
      id: "water_utilities",
      title: "Water & Utilities",
      icon: Droplets,
      completed: false,
      questions: [
        {
          id: "water_storage",
          question: "How many days of water do you have stored? (1-7 days)",
          type: "scale",
          value: [1],
          required: true,
        },
        {
          id: "water_purification",
          question: "Do you have water purification methods?",
          type: "boolean",
          value: false,
          required: true,
        },
        {
          id: "utility_backup",
          question: "Rate your preparedness for utility outages (1-10)",
          type: "scale",
          value: [4],
          required: true,
        },
      ],
    },
    {
      id: "social_support",
      title: "Social Support",
      icon: Users,
      completed: false,
      questions: [
        {
          id: "emergency_contacts",
          question: "How many people could you contact in an emergency?",
          type: "scale",
          value: [3],
          required: true,
        },
        {
          id: "neighbor_connections",
          question: "How well do you know your neighbors? (1-10)",
          type: "scale",
          value: [5],
          required: true,
        },
        {
          id: "community_involvement",
          question: "Are you involved in community organizations?",
          type: "boolean",
          value: false,
          required: true,
        },
        {
          id: "volunteer_interest",
          question: "Would you be interested in volunteering to help neighbors?",
          type: "boolean",
          value: true,
          required: false,
        },
      ],
    },
  ]

  const updateQuestionValue = (sectionId: string, questionId: string, value: any) => {
    setAssessmentData((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [questionId]: value,
      },
    }))
  }

  const calculateSectionScore = (section: AssessmentSection): number => {
    const sectionData = assessmentData[section.id] || {}
    let totalScore = 0
    let maxScore = 0

    section.questions.forEach((question) => {
      const value = sectionData[question.id] || question.value
      maxScore += 10

      if (question.type === "scale") {
        totalScore += Array.isArray(value) ? value[0] : value
      } else if (question.type === "boolean") {
        totalScore += value ? 10 : 5
      } else if (question.type === "text" || question.type === "multiple") {
        totalScore += value && value.length > 0 ? 8 : 3
      }
    })

    return Math.round((totalScore / maxScore) * 100)
  }

  const isCurrentSectionComplete = (): boolean => {
    const section = assessmentSections[currentSection]
    const sectionData = assessmentData[section.id] || {}

    return section.questions.every((question) => {
      if (!question.required) return true
      const value = sectionData[question.id] || question.value

      if (question.type === "scale") {
        return Array.isArray(value) ? value[0] > 0 : value > 0
      } else if (question.type === "boolean") {
        return value !== undefined
      } else if (question.type === "text") {
        return value && value.trim().length > 0
      } else if (question.type === "multiple") {
        return Array.isArray(value) && value.length > 0
      }
      return false
    })
  }

  const nextSection = () => {
    const section = assessmentSections[currentSection]
    const score = calculateSectionScore(section)

    if (!completedSections.includes(section.id)) {
      setCompletedSections((prev) => [...prev, section.id])
    }

    if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const calculateOverallScore = (): number => {
    let totalScore = 0
    let completedCount = 0

    assessmentSections.forEach((section) => {
      if (completedSections.includes(section.id)) {
        totalScore += calculateSectionScore(section)
        completedCount++
      }
    })

    return completedCount > 0 ? Math.round(totalScore / completedCount) : 0
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "bg-green-500" }
    if (score >= 60) return { text: "Good", color: "bg-yellow-500" }
    if (score >= 40) return { text: "Fair", color: "bg-orange-500" }
    return { text: "Needs Improvement", color: "bg-red-500" }
  }

  const currentSectionData = assessmentSections[currentSection]
  const currentScore = calculateOverallScore()
  const progressPercent = (completedSections.length / assessmentSections.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-6 h-6 mr-3 text-purple-400" />
              Household Self-Assessment Portal
            </div>
            <div className="flex items-center space-x-3">
              {currentScore > 0 && (
                <Badge className={`${getScoreBadge(currentScore).color} text-white`}>
                  <Star className="w-3 h-3 mr-1" />
                  {getScoreBadge(currentScore).text}
                </Badge>
              )}
              <Badge className="bg-blue-500 text-white">
                {completedSections.length}/{assessmentSections.length} Complete
              </Badge>
            </div>
          </CardTitle>
          <div className="text-sm text-gray-400">
            Help us understand your household's resilience needs and unlock personalized recommendations
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Overall Progress</span>
                <span className="text-gray-300">{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            {currentScore > 0 && (
              <div className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg border border-purple-700/50">
                <div className="flex items-center">
                  <Brain className="w-5 h-5 text-purple-400 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-purple-400">Current Resilience Score</div>
                    <div className="text-xs text-gray-300">Based on completed sections</div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(currentScore)}`}>{currentScore}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section Navigation */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {assessmentSections.map((section, index) => {
              const IconComponent = section.icon
              const isCompleted = completedSections.includes(section.id)
              const isCurrent = index === currentSection
              const sectionScore = isCompleted ? calculateSectionScore(section) : 0

              return (
                <Button
                  key={section.id}
                  variant={isCurrent ? "default" : "outline"}
                  onClick={() => setCurrentSection(index)}
                  className={`h-auto p-3 flex flex-col items-center space-y-2 ${isCompleted ? "border-green-500" : ""}`}
                >
                  <div className="flex items-center space-x-1">
                    <IconComponent className="w-4 h-4" />
                    {isCompleted && <CheckCircle className="w-3 h-3 text-green-400" />}
                  </div>
                  <div className="text-xs text-center">{section.title}</div>
                  {isCompleted && (
                    <div className={`text-xs font-bold ${getScoreColor(sectionScore)}`}>{sectionScore}</div>
                  )}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <currentSectionData.icon className="w-5 h-5 mr-2" />
            {currentSectionData.title}
            <Badge className="ml-3 bg-blue-500 text-white">
              Section {currentSection + 1} of {assessmentSections.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentSectionData.questions.map((question, qIndex) => {
            const sectionData = assessmentData[currentSectionData.id] || {}
            const currentValue = sectionData[question.id] || question.value

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: qIndex * 0.1 }}
                className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-medium flex-1">
                    {question.question}
                    {question.required && <span className="text-red-400 ml-1">*</span>}
                  </h4>
                </div>

                {question.type === "scale" && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>1 (Low)</span>
                      <span className="font-bold text-white">
                        {Array.isArray(currentValue) ? currentValue[0] : currentValue}
                      </span>
                      <span>10 (High)</span>
                    </div>
                    <Slider
                      value={Array.isArray(currentValue) ? currentValue : [currentValue]}
                      onValueChange={(value) => updateQuestionValue(currentSectionData.id, question.id, value)}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}

                {question.type === "boolean" && (
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={currentValue}
                      onCheckedChange={(value) => updateQuestionValue(currentSectionData.id, question.id, value)}
                    />
                    <span className="text-gray-300">{currentValue ? "Yes" : "No"}</span>
                  </div>
                )}

                {question.type === "text" && (
                  <Textarea
                    value={currentValue}
                    onChange={(e) => updateQuestionValue(currentSectionData.id, question.id, e.target.value)}
                    placeholder="Enter your response..."
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                )}

                {question.type === "multiple" && question.options && (
                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map((option) => {
                      const isSelected = Array.isArray(currentValue) && currentValue.includes(option)
                      return (
                        <Button
                          key={option}
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => {
                            const newValue = Array.isArray(currentValue) ? [...currentValue] : []
                            if (isSelected) {
                              const index = newValue.indexOf(option)
                              newValue.splice(index, 1)
                            } else {
                              newValue.push(option)
                            }
                            updateQuestionValue(currentSectionData.id, question.id, newValue)
                          }}
                          className="text-sm"
                        >
                          {option}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )
          })}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-slate-600">
            <Button
              onClick={previousSection}
              disabled={currentSection === 0}
              variant="outline"
              className="border-slate-600 bg-transparent"
            >
              Previous Section
            </Button>

            <div className="flex space-x-3">
              {currentSection === assessmentSections.length - 1 ? (
                <Button
                  onClick={() => {
                    // Complete assessment
                    const finalScore = calculateOverallScore()
                    alert(`Assessment completed! Your resilience score: ${finalScore}`)
                  }}
                  disabled={!isCurrentSectionComplete()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Complete Assessment
                </Button>
              ) : (
                <Button
                  onClick={nextSection}
                  disabled={!isCurrentSectionComplete()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Section
                  <TrendingUp className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Preview */}
      {currentScore > 0 && (
        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Gift className="w-5 h-5 mr-2 text-purple-400" />
              AMERESERVE Resilience Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-600/50">
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-white">Bronze Level</span>
                </div>
                <div className="text-xs text-gray-300">Score 60+: 5% discount on emergency supplies</div>
                <div className="text-xs text-purple-400 mt-1">
                  {currentScore >= 60 ? "✓ Unlocked!" : `${60 - currentScore} points needed`}
                </div>
              </div>

              <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-600/50">
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-white">Silver Level</span>
                </div>
                <div className="text-xs text-gray-300">Score 75+: Priority access to community resources</div>
                <div className="text-xs text-purple-400 mt-1">
                  {currentScore >= 75 ? "✓ Unlocked!" : `${75 - currentScore} points needed`}
                </div>
              </div>

              <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-600/50">
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-white">Gold Level</span>
                </div>
                <div className="text-xs text-gray-300">Score 90+: Free emergency kit + micro-grant eligibility</div>
                <div className="text-xs text-purple-400 mt-1">
                  {currentScore >= 90 ? "✓ Unlocked!" : `${90 - currentScore} points needed`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
