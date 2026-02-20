import { Container } from "@/components/Container";

export const metadata = {
  title: "NAPLAN Mock Test | IgniteMind Academy",
  description: "Take a full-length NAPLAN mock test to assess your skills. Practice with timed tests for realistic exam preparation.",
};

export default function MockTestPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            📝 NAPLAN Mock Test
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Take a full-length mock test to assess your NAPLAN readiness.
          </p>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <a
              href="/test"
              className="block w-full py-4 px-8 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              🎯 Start Mock Test
            </a>
            
            <p className="text-sm text-gray-500">
              You will be redirected to our practice test page.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
