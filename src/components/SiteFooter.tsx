import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";
import { InstagramIconFilled } from "@/components/ui/InstagramIcon";

const locations = [
  { city: "Melbourne", country: "Australia", flag: "🇦🇺", primary: true },
  { city: "Sydney", country: "Australia", flag: "🇦🇺", primary: false },
  { city: "Zurich", country: "Switzerland", flag: "🇨🇭", primary: false },
  { city: "Pune", country: "India", flag: "🇮🇳", primary: false },
];

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <Container>
        <div className="py-12">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Brand & Contact */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 bg-white rounded-xl overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt={site.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold">{site.name}</span>
                  <p className="text-xs text-slate-400">Expert NAPLAN Tutoring</p>
                </div>
              </div>
              
              <p className="text-slate-400 max-w-sm">
                Helping students excel in NAPLAN through personalized learning, 
                expert tutors, and proven strategies. Join 500+ students who've achieved their goals.
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <a 
                  href={`mailto:${site.email}`} 
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">📧</span>
                  {site.email}
                </a>
                <a 
                  href={`tel:${site.phoneE164}`} 
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">📞</span>
                  {site.phoneDisplay}
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                  aria-label="Follow us on Instagram"
                >
                  <InstagramIconFilled className="w-5 h-5" />
                </a>
                <a
                  href={site.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                  aria-label="Chat on WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/naplan" className="text-slate-400 hover:text-white transition-colors"> NAPLAN Overview</Link></li>
                <li><Link href="/test" className="text-slate-400 hover:text-white transition-colors"> Practice Tests</Link></li>
                <li><Link href="/pricing" className="text-slate-400 hover:text-white transition-colors"> Pricing</Link></li>
                <li><Link href="/resources" className="text-slate-400 hover:text-white transition-colors"> Resources</Link></li>
                <li><Link href="/book" className="text-slate-400 hover:text-white transition-colors"> Book Diagnostic</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors"> About Us</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors"> Contact</Link></li>
                <li><Link href="/#faq" className="text-slate-400 hover:text-white transition-colors"> FAQ</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors"> Privacy Policy</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors"> Terms of Service</Link></li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h3 className="font-bold text-white mb-4">Our Locations 🇦🇺</h3>
              <ul className="space-y-3">
                {locations.map((loc) => (
                  <li key={loc.city} className="flex items-center gap-3">
                    <span className="text-xl">{loc.flag}</span>
                    <div>
                      <span className={`font-medium ${loc.primary ? 'text-orange-400' : 'text-slate-300'}`}>
                        {loc.city}
                      </span>
                      <span className="text-slate-500 text-sm">, {loc.country}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs">
              NAPLAN is a trademark owned by ACARA. This site is not affiliated with ACARA.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
