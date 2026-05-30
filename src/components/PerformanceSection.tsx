import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, Target, Shield } from 'lucide-react';

const metrics = [
  {
    icon: Clock,
    metric: "100%",
    label: "On-Time Delivery",
    description: "Consistent project completion within agreed timelines"
  },
  {
    icon: Target,
    metric: "$2-3M",
    label: "Annual Contract Value",
    description: "Successfully managed firm-fixed-price contracts"
  },
  {
    icon: TrendingUp,
    metric: "50%",
    label: "Efficiency Improvement",
    description: "Average reduction in manual analysis time"
  },
  {
    icon: Shield,
    metric: "Zero",
    label: "Security Incidents",
    description: "Maintained perfect security compliance record"
  }
];

const caseStudy = {
  title: "CNO/SIGDEV Analysis Acceleration",
  challenge: "Defense customer needed to process 10x more signal intelligence data with existing analyst capacity.",
  solution: "Deployed automated ML pipeline with human-in-the-loop validation, reducing manual processing by 60%.",
  outcome: "Enabled real-time threat identification and reduced analyst workload while maintaining 99.5% accuracy."
};

const PerformanceSection = () => {
  return (
    <section
      id="performance"
      className="py-20 px-6"
      style={{ background: 'rgba(13,27,42,0.55)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-display font-bold text-xs uppercase tracking-widest mb-3"
            style={{ color: '#3B82F6', letterSpacing: '0.12em' }}
          >
            Results That Matter
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4 text-foreground">
            Proven Performance
          </h2>
          <p className="font-body text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#9CA3AF' }}>
            Our track record speaks to our commitment to excellence and mission success.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((item, index) => (
            <Card
              key={index}
              className="text-center backdrop-blur-sm transition-all duration-300"
              style={{
                border: '1px solid rgba(30,58,138,0.30)',
                background: 'rgba(14,28,55,0.60)',
                boxShadow: '0 0 28px -10px rgba(30,58,138,0.35)',
              }}
            >
              <CardContent className="p-6">
                <div
                  className="mb-4 p-3 rounded-full w-fit mx-auto"
                  style={{ background: 'rgba(30,58,138,0.20)' }}
                >
                  <item.icon className="w-6 h-6" style={{ color: '#3B82F6' }} />
                </div>
                <div
                  className="font-display text-3xl font-black mb-2"
                  style={{ color: '#3B82F6' }}
                >
                  {item.metric}
                </div>
                <div className="font-display font-bold text-sm text-foreground mb-2">
                  {item.label}
                </div>
                <p className="font-body text-sm" style={{ color: '#6B7280' }}>
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Study */}
        <Card
          className="backdrop-blur-sm"
          style={{
            border: '1px solid rgba(30,58,138,0.40)',
            background: 'linear-gradient(135deg, rgba(14,28,55,0.75), rgba(13,27,42,0.60))',
          }}
        >
          <CardContent className="p-8 md:p-12">
            <div className="mb-4">
              <span
                className="font-display font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(30,58,138,0.25)',
                  color: '#3B82F6',
                  border: '1px solid rgba(59,130,246,0.30)',
                }}
              >
                Case Study
              </span>
            </div>
            <h3 className="font-display text-2xl font-black mb-8 text-foreground">
              {caseStudy.title}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: 'Challenge', text: caseStudy.challenge, color: '#EF4444' },
                { label: 'Solution', text: caseStudy.solution, color: '#3B82F6' },
                { label: 'Outcome', text: caseStudy.outcome, color: '#10B981' },
              ].map(({ label, text, color }) => (
                <div key={label}>
                  <h4
                    className="font-display font-bold text-xs uppercase tracking-widest mb-3"
                    style={{ color, letterSpacing: '0.1em' }}
                  >
                    {label}
                  </h4>
                  <p className="font-body leading-relaxed" style={{ color: '#9CA3AF' }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PerformanceSection;
