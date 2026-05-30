import { Card, CardContent } from '@/components/ui/card';

const MissionSection = () => {
  return (
    <section id="mission" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="font-display font-bold text-xs uppercase tracking-widest mb-3"
          style={{ color: '#3B82F6', letterSpacing: '0.12em' }}
        >
          Why We Exist
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-black mb-10 text-foreground">
          Our Mission
        </h2>
        <Card
          className="backdrop-blur-sm"
          style={{
            border: '1px solid rgba(30,58,138,0.35)',
            background: 'rgba(14,28,55,0.55)',
            boxShadow: '0 0 48px -12px rgba(30,58,138,0.35)',
          }}
        >
          <CardContent className="p-8 md:p-12">
            <p className="text-xl md:text-2xl leading-relaxed text-foreground font-body">
              Pulse Wave Tech empowers government and defense customers with cutting-edge AI/ML solutions and automation technologies that transform complex data into actionable intelligence — delivered in real time.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MissionSection;
