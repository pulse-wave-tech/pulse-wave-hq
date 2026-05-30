import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Award, Zap } from 'lucide-react';

const differentiators = [
  {
    icon: Users,
    title: "Customer & Mission-Centric Approach",
    description: "Every solution is tailored to specific mission requirements and operational contexts."
  },
  {
    icon: Award,
    title: "Experienced Team",
    description: "Combined military and government contracting background with deep domain expertise."
  },
  {
    icon: CheckCircle,
    title: "Proven Track Record",
    description: "Program management on $2-3M/year firm-fixed-price contracts with consistent delivery."
  },
  {
    icon: Zap,
    title: "Technical Expertise",
    description: "Unique positioning at the intersection of intelligence analysis and automation technology."
  }
];

const DifferentiatorsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-display font-bold text-xs uppercase tracking-widest mb-3"
            style={{ color: '#3B82F6', letterSpacing: '0.12em' }}
          >
            Our Edge
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 text-foreground">
            What Sets Us Apart
          </h2>
          <p className="font-body text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#9CA3AF' }}>
            Our unique combination of technical expertise and mission understanding delivers
            results that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {differentiators.map((item, index) => (
            <Card
              key={index}
              className="group transition-all duration-300 backdrop-blur-sm"
              style={{
                border: '1px solid rgba(30,58,138,0.28)',
                background: 'rgba(14,28,55,0.50)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(59,130,246,0.50)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px -12px rgba(30,58,138,0.45)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(30,58,138,0.28)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              <CardContent className="p-6 flex gap-4">
                <div
                  className="flex-shrink-0 p-3 rounded-full h-fit"
                  style={{ background: 'rgba(30,58,138,0.20)' }}
                >
                  <item.icon className="w-7 h-7" style={{ color: '#3B82F6' }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-body leading-relaxed" style={{ color: '#9CA3AF' }}>
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;
