import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Free Study Resources | IgniteMind Academy',
  description: 'Download free NAPLAN practice materials, study notes, worksheets, and practice tests organized by Year level and Subject.',
};

export default function ResourcesPage() {
  const resources = [
    {
      year: 'Year 3',
      description: 'NAPLAN Preparation for Year 3 Students',
      subjects: [
        {
          name: 'Language Conventions',
          icon: '📝',
          topics: [
            { name: 'Study Notes - Punctuation, Grammar & Spelling', file: 'year-3/year-3-language-conventions-notes.html', type: 'PDF' },
          ],
        },
        {
          name: 'Numeracy',
          icon: '🔢',
          topics: [
            { name: 'Number, Addition, Subtraction & Multiplication', file: 'year-3/year-3-numeracy-notes.html', type: 'PDF' },
          ],
        },
        {
          name: 'Reading',
          icon: '📖',
          topics: [
            { name: 'Comprehension Practice', file: 'year-3/year-3-reading-notes.html', type: 'PDF' },
          ],
        },
        {
          name: 'Writing',
          icon: '✍️',
          topics: [
            { name: 'Narrative Writing Guide', file: 'year-3/year-3-writing-notes.html', type: 'PDF' },
          ],
        },
      ],
    },
    {
      year: 'Year 5',
      description: 'NAPLAN Preparation for Year 5 Students',
      subjects: [
        {
          name: 'Language Conventions',
          icon: '📝',
          topics: [
            { name: 'Study Notes - Punctuation, Grammar & Spelling', file: 'year-5/year-5-language-conventions-notes.html', type: 'PDF' },
          ],
        },
        {
          name: 'Numeracy',
          icon: '🔢',
          topics: [
            { name: 'Number, Operations, Fractions & Patterns', file: 'year-5/year-5-numeracy-notes.html', type: 'PDF' },
          ],
        },
        {
          name: 'Reading',
          icon: '📖',
          topics: [
            { name: 'Comprehension Practice', file: 'year-5/year-5-reading-notes.html', type: 'PDF' },
          ],
        },
        {
          name: 'Writing',
          icon: '✍️',
          topics: [
            { name: 'Persuasive Writing Guide', file: 'year-5/year-5-writing-notes.html', type: 'PDF' },
          ],
        },
      ],
    },
    {
      year: 'Year 7',
      description: 'NAPLAN Preparation for Year 7 Students',
      subjects: [
        {
          name: 'Numeracy',
          icon: '🔢',
          topics: [
            { name: 'Integers, Fractions, Decimals & Algebra', file: 'year-7/year-7-numeracy-notes.html', type: 'PDF' },
          ],
        },
        {
          name: 'Reading',
          icon: '📖',
          topics: [
            { name: 'Comprehension Practice', file: 'year-7/year-7-reading-notes.html', type: 'PDF' },
          ],
        },
      ],
    },
    {
      year: 'Year 9',
      description: 'NAPLAN Preparation for Year 9 Students',
      subjects: [
        {
          name: 'Numeracy',
          icon: '🔢',
          topics: [
            { name: 'Equations, Rates, Probability & Data', file: 'year-9/year-9-numeracy-notes.html', type: 'PDF' },
          ],
        },
        {
          name: 'Reading',
          icon: '📖',
          topics: [
            { name: 'Comprehension Practice', file: 'year-9/year-9-reading-notes.html', type: 'PDF' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="/logo.png" alt="IgniteMind Academy" fill className="object-contain" />
            </div>
            <span className="font-bold text-xl text-gray-900">IgniteMind Academy</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/resources" className="text-orange-600 font-semibold">
              Resources
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-orange-600">
              Dashboard
            </Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Book Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">📚 Free Study Resources</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Download free NAPLAN practice materials, study notes, and worksheets organized by Year level and Subject.
          </p>
        </div>
      </div>

      {/* QR Code Banner */}
      <div className="bg-white border-b border-orange-100 py-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8">
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24">
              <Image src="/qr/ignitemind-qr.jpg" alt="QR Code" fill className="object-contain rounded-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">ignitemind.com</h3>
              <p className="text-gray-600">Scan for more study materials</p>
              <p className="text-orange-600 font-semibold">@ignitemind27</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {resources.map((yearGroup) => (
            <div key={yearGroup.year} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Year Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">{yearGroup.year}</h2>
                <p className="text-white/80">{yearGroup.description}</p>
              </div>

              {/* Subjects */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {yearGroup.subjects.map((subject) => (
                    <div key={subject.name} className="border border-gray-200 rounded-xl p-5 hover:border-orange-300 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{subject.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                      </div>
                      <ul className="space-y-3">
                        {subject.topics.map((topic) => (
                          <li key={topic.name}>
                            {topic.type === 'Coming Soon' ? (
                              <div className="flex items-center gap-2 text-gray-500">
                                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                {topic.name}
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Coming Soon</span>
                              </div>
                            ) : (
                              <a
                                href={`/pdfs/${topic.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 hover:underline"
                              >
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                {topic.name}
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                  📥 Download
                                </span>
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Tutoring?</h2>
          <p className="text-lg opacity-90 mb-6">
            Get expert guidance from our certified NAPLAN tutors.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              📅 Book Free Diagnostic
            </Link>
            <Link
              href="/quiz"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              ✨ Try Free Practice Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-2xl">🧠</span>
            <span className="font-bold text-xl">IgniteMind Academy</span>
          </div>
          <p className="text-gray-400 mb-4">Expert NAPLAN Tutoring for Years 3, 5, 7 & 9</p>
          <div className="flex justify-center gap-6 text-gray-400 text-sm">
            <a href="https://instagram.com/ignitemind27" target="_blank" className="hover:text-orange-400">
              📷 @ignitemind27
            </a>
            <span>📧 ignitemind60@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
