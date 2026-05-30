import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Brain, Shield, Workflow } from 'lucide-react';

const competencies = [
  {
    icon: BarChart3,
    title: "Data Analysis & Manipulation",
    description: "Transform raw data into actionable insights with advanced analytics and visualization techniques."
  },
  {
    icon: Brain,
    title: "AI/ML Solutions",
    description: "Deploy cutting-edge machine learning models to automate analysis and enhance decision-making."
  },
  {
    icon: Shield,
    title: "Cyber & Network Technical Analysis",
    description: "Specialized CNO/SIGDEV capabilities for comprehensive network and cyber intelligence."
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline operations with intelligent automation that reduces manual overhead and increases efficiency."
  }
];

const benefits = [
  "Faster decision cycles",
  "Reduced analyst fatigue",
  "Scalable automated workflows",
  "Trusted federal mission support"
];

const CompetenciesSection = () => {
  return (
    <section id="competencies" className="py-20 px-6" style={{ background: 'rgba(13,27,42,0.6)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="font-display font-bold text-xs uppercase tracking-widest mb-3"
            style={{ color: '#3B82F6', letterSpacing: '0.12em' }}
          >
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4 text-foreground">
            Core Competencies
          </h2>
          <div className="mx-auto h-0.5 w-16 mt-2" style={{ background: '#1E3A8A' }} />
        </div>

        {/* Competency cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {competencies.map((item, index) => (
            <Card
              key={index}
              className="group transition-all duration-300 backdrop-blur-sm"
              style={{
                border: '1px solid rgba(30,58,138,0.30)',
                background: 'rgba(14,28,55,0.50)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(59,130,246,0.55)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px -12px rgba(30,58,138,0.50)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(30,58,138,0.30)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              <CardHeader className="text-center">
                <div
                  className="mx-auto mb-4 p-3 rounded-full w-fit transition-colors"
                  style={{ background: 'rgba(30,58,138,0.20)' }}
                >
                  <item.icon className="w-8 h-8" style={{ color: '#3B82F6' }} />
                </div>
                <CardTitle className="font-display text-xl font-bold text-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-body text-center leading-relaxed" style={{ color: '#9CA3AF' }}>
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div
          className="rounded-lg p-8 backdrop-blur-sm"
          style={{
            border: '1px solid rgba(30,58,138,0.35)',
            background: 'rgba(14,28,55,0.45)',
          }}
        >
          <h3
            className="font-display text-center text-xl font-bold mb-6 uppercase tracking-widest"
            style={{ color: '#3B82F6', letterSpacing: '0.1em' }}
          >
            Key Benefits
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {benefits.map((benefit) => (
              <span
                key={benefit}
                className="font-body px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(30,58,138,0.20)',
                  border: '1px solid rgba(59,130,246,0.35)',
                  color: '#93C5FD',
                }}
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetenciesSection;
