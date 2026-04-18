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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-t from-background to-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground">
            Ready to transform your data into actionable intelligence? Let's discuss your mission requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card className="border-primary/20 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-primary mb-2">Email</h4>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Response Time</h4>
                <p className="text-muted-foreground">
                  We typically respond to inquiries within 24 hours during business days.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Security Clearance</h4>
                <p className="text-muted-foreground">
                  Our team maintains appropriate security clearances for classified discussions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-primary/20 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="border-primary/20 focus:border-primary resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-pulse"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
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