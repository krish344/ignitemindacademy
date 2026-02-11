import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";
import { InstagramIconFilled } from "@/components/ui/InstagramIcon";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/logo.png"
                  alt={site.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-gray-900">{site.name}</span>
            </div>
            <p className="text-sm text-slate-600">
              {site.audience} • {site.location}
            </p>
            <p className="text-sm text-slate-600">
              Email: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              Phone: <a className="underline" href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2 text-sm">
              <div className="font-semibold text-slate-900">Explore</div>
              <Link className="block text-slate-600 hover:text-slate-900" href="/naplan">
                NAPLAN
              </Link>
              <Link className="block text-slate-600 hover:text-slate-900" href="/pricing">
                Pricing
              </Link>
              <Link className="block text-slate-600 hover:text-slate-900" href="/resources">
                Resources
              </Link>
              <Link className="block text-slate-600 hover:text-slate-900" href="/quiz">
                Maths Quiz
              </Link>
            </div>
            <div className="space-y-2 text-sm">
              <div className="font-semibold text-slate-900">Company</div>
              <Link className="block text-slate-600 hover:text-slate-900" href="/about">
                About
              </Link>
              <Link className="block text-slate-600 hover:text-slate-900" href="/contact">
                Contact
              </Link>
              <Link className="block text-slate-600 hover:text-slate-900" href="/#faq">
                FAQ
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-900">Parents love clarity.</div>
            <p className="text-sm text-slate-600">
              Book a free diagnostic and get a clear plan: strengths, gaps, and a week-by-week path to NAPLAN confidence.
            </p>
            <Link
              href="/#contact"
              className="inline-flex text-sm font-semibold text-slate-900 underline"
            >
              Book a free diagnostic
            </Link>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-900">Follow Us</div>
            <p className="text-sm text-slate-600">
              Stay updated with our latest tips and news.
            </p>
            <div className="flex gap-3">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-sm hover:shadow-md transition-shadow"
                aria-label="Follow us on Instagram"
              >
                <InstagramIconFilled className="w-5 h-5" />
              </a>
              <a
                href={site.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm hover:shadow-md transition-shadow"
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6 text-xs text-slate-500">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>
              NAPLAN is a trademark owned by ACARA. This site is not affiliated with ACARA.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
