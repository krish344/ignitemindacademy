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
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">📚 Free Study Resources</h1>
          <p className="text-base sm:text-xl opacity-90 max-w-2xl mx-auto">
            Download free NAPLAN practice materials, study notes, and worksheets organized by Year level and Subject.
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-orange-100 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
          <div className="relative h-32 w-32 sm:h-48 sm:w-48">
            <Image src="/qr/ignitemind-qr.jpg" alt="QR Code" fill className="object-contain rounded-lg" />
          </div>
          <div>
            <p className="text-orange-600 font-bold text-lg sm:text-xl">@ignitemind27</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="space-y-10 sm:space-y-12">
          {resources.map((yearGroup) => (
            <div key={yearGroup.year} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 sm:px-6 py-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{yearGroup.year}</h2>
                <p className="text-white/80 text-sm sm:text-base">{yearGroup.description}</p>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                  {yearGroup.subjects.map((subject) => (
                    <div key={subject.name} className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-orange-300 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{subject.icon}</span>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{subject.name}</h3>
                      </div>
                      <ul className="space-y-3">
                        {subject.topics.map((topic) => (
                          <li key={topic.name}>
                            <a
                              href={`/pdfs/${topic.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 text-orange-600 hover:text-orange-700 hover:underline"
                            >
                              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                              <span className="text-sm">{topic.name}</span>
                              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full whitespace-nowrap">
                                📥 Download
                              </span>
                            </a>
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

        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Personalized Tutoring?</h2>
          <p className="text-base sm:text-lg opacity-90 mb-6">
            Get expert guidance from our certified NAPLAN tutors.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
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
    </div>
  );
}
