
export interface Choice {
  id: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  question: string;
  choices: Choice[];
  nextQuestionMap: Record<string, string | null>;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  features?: string[];
  ctaText: string;
  ctaLink: string;
}

export const questions: Question[] = [
  {
    id: "coaching-type",
    question: "Are you interested in individual coaching or group learning?",
    choices: [
      {
        id: "individual",
        label: "Individual",
        description: "One-on-one personalized coaching tailored to your specific needs"
      },
      {
        id: "group",
        label: "Group",
        description: "Learn alongside peers in a collaborative environment"
      }
    ],
    nextQuestionMap: {
      "individual": "individual-preference",
      "group": "group-focus"
    }
  },
  {
    id: "individual-preference",
    question: "Do you prefer long-term comprehensive coaching (6 months) or a one-time session?",
    choices: [
      {
        id: "long-term",
        label: "Long-term comprehensive coaching",
        description: "Deep transformation over 6 months with ongoing support"
      },
      {
        id: "one-time",
        label: "One-time session",
        description: "Focused 90-minute session to address a specific challenge"
      }
    ],
    nextQuestionMap: {
      "long-term": "confirm-long-term",
      "one-time": "confirm-one-time"
    }
  },
  {
    id: "group-focus",
    question: "Would you like to focus on Leadership skills or Sales performance?",
    choices: [
      {
        id: "leadership",
        label: "Leadership skills",
        description: "Develop essential leadership capabilities for career advancement"
      },
      {
        id: "sales",
        label: "Sales performance",
        description: "Enhance your sales techniques and grow your business"
      }
    ],
    nextQuestionMap: {
      "leadership": "confirm-leadership",
      "sales": "confirm-sales"
    }
  },
  {
    id: "confirm-long-term",
    question: "Are you comfortable with a USD 7,000 investment and committing for 6 months?",
    choices: [
      {
        id: "yes",
        label: "Yes",
        description: "I'm ready to invest in my long-term growth"
      },
      {
        id: "no",
        label: "No",
        description: "I'd like to explore other options"
      }
    ],
    nextQuestionMap: {
      "yes": "result-elite",
      "no": "coaching-type"
    }
  },
  {
    id: "confirm-one-time",
    question: "Would you like a focused 90-minute session for USD 500 with a 100% money-back guarantee?",
    choices: [
      {
        id: "yes",
        label: "Yes",
        description: "This sounds perfect for my needs"
      },
      {
        id: "no",
        label: "No",
        description: "I'd like to explore other options"
      }
    ],
    nextQuestionMap: {
      "yes": "result-one-off",
      "no": "coaching-type"
    }
  },
  {
    id: "confirm-leadership",
    question: "Can you commit to a 12-week program to enhance your leadership capabilities?",
    choices: [
      {
        id: "yes",
        label: "Yes",
        description: "I'm ready to develop my leadership skills"
      },
      {
        id: "no",
        label: "No",
        description: "I'd like to explore other options"
      }
    ],
    nextQuestionMap: {
      "yes": "result-leadership",
      "no": "coaching-type"
    }
  },
  {
    id: "confirm-sales",
    question: "Do you have 3+ years of business experience and want a 14-week program for sales growth (USD 1,500 or USD 960 for Sri Lankans)?",
    choices: [
      {
        id: "yes",
        label: "Yes",
        description: "I'm ready to grow my sales performance"
      },
      {
        id: "no",
        label: "No",
        description: "I'd like to explore other options"
      }
    ],
    nextQuestionMap: {
      "yes": "result-sales",
      "no": "coaching-type"
    }
  }
];

export const recommendations: Record<string, Recommendation> = {
  "result-elite": {
    id: "result-elite",
    title: "1-1 Elite Coaching",
    description: "Our premium 6-month personalized coaching program designed for deep transformation and sustained results.",
    price: "USD 7,000",
    duration: "6 months",
    features: [
      "Weekly 1-on-1 coaching sessions",
      "Personalized growth strategy",
      "Unlimited email support",
      "Access to exclusive resources",
      "Quarterly progress reviews"
    ],
    ctaText: "Learn More",
    ctaLink: "https://ramindurandeni.com/contact-us"
  },
  "result-one-off": {
    id: "result-one-off",
    title: "Focused One-Off Session",
    description: "A concentrated 90-minute session to address a specific challenge or goal with actionable takeaways.",
    price: "USD 500",
    duration: "90 minutes",
    features: [
      "Pre-session questionnaire",
      "90-minute focused coaching",
      "Actionable strategy document",
      "100% money-back guarantee",
      "Follow-up email support (7 days)"
    ],
    ctaText: "Book Now",
    ctaLink: "https://ramindurandeni.com/contact-us"
  },
  "result-leadership": {
    id: "result-leadership",
    title: "Leadership Mastery Group Coaching",
    description: "A comprehensive 12-week program designed to develop essential leadership capabilities in a collaborative environment.",
    price: "Contact for pricing",
    duration: "12 weeks",
    features: [
      "Weekly group sessions",
      "Practical leadership frameworks",
      "Peer accountability",
      "Leadership assessment tools",
      "Certificate of completion"
    ],
    ctaText: "Enroll Now",
    ctaLink: "https://ramindurandeni.com/contact-us"
  },
  "result-sales": {
    id: "result-sales",
    title: "Sales Excellence Group Coaching",
    description: "An intensive 14-week program for experienced professionals looking to dramatically improve sales performance.",
    price: "USD 1,500 (USD 960 for Sri Lankans)",
    duration: "14 weeks",
    features: [
      "Bi-weekly group sessions",
      "Sales strategy development",
      "Advanced negotiation techniques",
      "Client acquisition frameworks",
      "Sales performance tracking"
    ],
    ctaText: "Boost Your Sales",
    ctaLink: "https://ramindurandeni.com/contact-us"
  }
};

export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id);
};

export const getRecommendationById = (id: string): Recommendation | undefined => {
  return recommendations[id];
};
