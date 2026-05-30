import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? 'info@pulsewavetech.io';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent('Pulse Wave Tech Inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    toast.success('Opening email client', {
      description: 'Your message will be sent via your default email application.',
    });

    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cardStyle = {
    border: '1px solid rgba(30,58,138,0.30)',
    background: 'rgba(14,28,55,0.55)',
  };

  const labelStyle = { color: '#3B82F6', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em' };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-display font-bold text-xs uppercase tracking-widest mb-3"
            style={{ color: '#3B82F6', letterSpacing: '0.12em' }}
          >
            Start a Conversation
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4 text-foreground">
            Get in Touch
          </h2>
          <p className="font-body text-lg" style={{ color: '#9CA3AF' }}>
            Ready to transform your data into actionable intelligence? Let's discuss your mission requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card className="backdrop-blur-sm" style={cardStyle}>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-3 text-foreground">
                <Mail className="w-6 h-6" style={{ color: '#3B82F6' }} />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { heading: 'Email', content: (
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-body transition-colors"
                      style={{ color: '#9CA3AF' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#3B82F6')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
                    >
                      {CONTACT_EMAIL}
                    </a>
                  )
                },
                { heading: 'Response Time', content: (
                    <p className="font-body" style={{ color: '#9CA3AF' }}>
                      We typically respond within 24 hours during business days.
                    </p>
                  )
                },
                { heading: 'Security Clearance', content: (
                    <p className="font-body" style={{ color: '#9CA3AF' }}>
                      Our team maintains appropriate clearances for classified discussions.
                    </p>
                  )
                },
              ].map(({ heading, content }) => (
                <div key={heading}>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wide mb-2" style={labelStyle}>
                    {heading}
                  </h4>
                  {content}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="backdrop-blur-sm" style={cardStyle}>
            <CardHeader>
              <CardTitle className="font-display text-foreground">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: 'name', label: 'Name', type: 'text' },
                  { id: 'email', label: 'Email', type: 'email' },
                ].map(({ id, label, type }) => (
                  <div key={id} className="space-y-1.5">
                    <Label htmlFor={id} style={labelStyle}>{label} *</Label>
                    <Input
                      id={id}
                      name={id}
                      type={type}
                      value={formData[id as 'name' | 'email']}
                      onChange={handleChange}
                      required
                      style={{
                        border: '1.5px solid rgba(107,114,128,0.5)',
                        background: 'rgba(13,27,42,0.5)',
                        color: '#E5E7EB',
                      }}
                    />
                  </div>
                ))}
                <div className="space-y-1.5">
                  <Label htmlFor="message" style={labelStyle}>Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{
                      border: '1.5px solid rgba(107,114,128,0.5)',
                      background: 'rgba(13,27,42,0.5)',
                      color: '#E5E7EB',
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-display font-bold text-sm uppercase tracking-widest"
                  style={{
                    background: 'linear-gradient(135deg, #1E3A8A, #2D5BE3)',
                    border: '1px solid rgba(59,130,246,0.40)',
                    boxShadow: '0 0 24px -8px rgba(30,58,138,0.60)',
                    letterSpacing: '0.1em',
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
