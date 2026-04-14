import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationProcess = () => {
  const [activeStep, setActiveStep] = useState(1);

  const processSteps = [
    {
      id: 1,
      title: "Application Submission",
      duration: "5 minutes",
      description: "Submit your application with portfolio, resume, and a brief cover letter explaining why you're excited about FlowTech Studio.",
      details: [
        "Complete online application form",
        "Upload your resume and portfolio",
        "Write a brief cover letter (max 300 words)",
        "Answer 2-3 role-specific questions"
      ],
      icon: "Send",
      color: "text-primary"
    },
    {
      id: 2,
      title: "Initial Review",
      duration: "3-5 days",
      description: "Our team reviews your application and portfolio. We look for technical skills, creativity, and cultural alignment.",
      details: [
        "Portfolio and resume review",
        "Technical skills assessment",
        "Cultural fit evaluation",
        "Initial screening call (30 minutes)"
      ],
      icon: "Search",
      color: "text-accent"
    },
    {
      id: 3,
      title: "Technical Interview",
      duration: "1-2 hours",
      description: "Deep dive into your technical expertise through practical exercises and discussions about your approach to problem-solving.",
      details: [
        "Technical skills demonstration",
        "Code review and discussion",
        "Problem-solving exercises",
        "Architecture and design questions"
      ],
      icon: "Code",
      color: "text-trust"
    },
    {
      id: 4,
      title: "Team Collaboration",
      duration: "2-3 hours",
      description: "Work on a small project with our team to experience our collaborative process and see how we work together.",
      details: [
        "Mini project collaboration",
        "Team interaction assessment",
        "Communication style evaluation",
        "Creative process participation"
      ],
      icon: "Users",
      color: "text-primary"
    },
    {
      id: 5,
      title: "Final Decision",
      duration: "2-3 days",
      description: "We make our final decision and extend an offer. If successful, we'll discuss compensation, start date, and next steps.",
      details: [
        "Team feedback compilation",
        "Final decision making",
        "Offer preparation and extension",
        "Onboarding process initiation"
      ],
      icon: "CheckCircle",
      color: "text-accent"
    }
  ];

  const tips = [
    {
      id: 1,
      icon: "Lightbulb",
      title: "Show Your Process",
      description: "We care more about how you think and approach problems than perfect solutions."
    },
    {
      id: 2,
      icon: "Heart",
      title: "Be Authentic",
      description: "Let your personality shine through. We value genuine passion and curiosity."
    },
    {
      id: 3,
      icon: "Palette",
      title: "Demonstrate Creativity",
      description: "Show us projects that highlight your creative problem-solving abilities."
    },
    {
      id: 4,
      icon: "MessageCircle",
      title: "Ask Questions",
      description: "Engage with us during the process. Great questions show thoughtful engagement."
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How long does the entire process take?",
      answer: "Typically 2-3 weeks from application to final decision. We move quickly while ensuring thorough evaluation."
    },
    {
      id: 2,
      question: "Do you provide feedback if I'm not selected?",
      answer: "Yes, we provide constructive feedback to all candidates who complete the technical interview stage."
    },
    {
      id: 3,
      question: "Can I apply for multiple positions?",
      answer: "Absolutely! We encourage you to apply for all positions that match your interests and skills."
    },
    {
      id: 4,
      question: "What if I don't have all the required skills?",
      answer: "We value potential and learning ability. If you're passionate and have most of the skills, we encourage you to apply."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Application Process
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our hiring process is designed to be transparent, fair, and collaborative. 
            Here's what you can expect when you apply to join our team.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-border hidden md:block"></div>
            
            <div className="space-y-8">
              {processSteps?.map((step, index) => (
                <motion.div
                  key={step?.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`
                    relative cursor-pointer transition-all duration-300
                    ${activeStep === step?.id ? 'scale-105' : 'hover:scale-102'}
                  `}
                  onClick={() => setActiveStep(step?.id)}
                >
                  <div className="flex items-start space-x-6">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`
                        relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                        ${activeStep === step?.id 
                          ? 'bg-primary text-white shadow-lg scale-110' 
                          : 'bg-card border-2 border-border text-text-secondary hover:border-primary/50'
                        }
                      `}>
                        <Icon name={step?.icon} size={24} />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {step?.id}
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className={`
                      flex-1 card-elevated p-6 transition-all duration-300
                      ${activeStep === step?.id ? 'shadow-strong border-primary/20' : 'hover:shadow-medium'}
                    `}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`
                            text-xl font-semibold mb-2 transition-colors duration-300
                            ${activeStep === step?.id ? 'text-primary' : 'text-text-primary'}
                          `}>
                            {step?.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-text-secondary">
                            <Icon name="Clock" size={14} />
                            <span>{step?.duration}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-text-secondary mb-4 leading-relaxed">
                        {step?.description}
                      </p>

                      {/* Step Details */}
                      <motion.div
                        initial={false}
                        animate={{ 
                          height: activeStep === step?.id ? 'auto' : 0,
                          opacity: activeStep === step?.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border pt-4">
                          <h4 className="font-medium text-text-primary mb-3">What to expect:</h4>
                          <ul className="space-y-2">
                            {step?.details?.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start space-x-2 text-sm text-text-secondary">
                                <Icon name="ArrowRight" size={12} className="text-primary mt-1 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Tips for Success
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips?.map((tip, index) => (
              <motion.div
                key={tip?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={tip?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                  {tip?.title}
                </h4>
                <p className="text-text-secondary text-sm">
                  {tip?.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs?.map((faq, index) => (
              <motion.div
                key={faq?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-elevated p-6"
              >
                <h4 className="font-semibold text-text-primary mb-3 flex items-start">
                  <Icon name="HelpCircle" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
                  {faq?.question}
                </h4>
                <p className="text-text-secondary ml-8 leading-relaxed">
                  {faq?.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join our team of creative technologists and help us build the future of digital experiences. 
            We can't wait to see what you'll create with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="btn-magnetic animate-breathe"
              iconName="Send"
              iconPosition="right"
            >
              Start Your Application
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-magnetic"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Ask a Question
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationProcess;